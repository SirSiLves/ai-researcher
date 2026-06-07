import json
import os
import subprocess
import time

# --- CONFIGURATION ---
DISK_IDENTIFIER = "disk7s2"
WORDLIST_FILE = "words_random.txt"
PROGRESS_FILE = "progress.json"
SAVE_EVERY = 100  # persist checkpoint at most every N attempts
APPEND_NUMBERS = True  # try word + 0..999; set False to try the bare word only
# ---------------------


def attempt_unlock(password):
    """Return one of: 'success', 'wrong', 'error'.

    'wrong' means diskutil rejected the passphrase (keep going).
    'error' means something else is broken (disk gone, bad identifier,
    not encrypted) — we should stop instead of hammering a dead target.
    """
    result = subprocess.run(
        ["diskutil", "apfs", "unlockVolume", DISK_IDENTIFIER, "-passphrase", password],
        capture_output=True,
        text=True,
    )
    if result.returncode == 0:
        return "success"

    msg = (result.stderr + result.stdout).lower()
    wrong_markers = ("incorrect", "passphrase", "authentication", "decrypt")
    if any(m in msg for m in wrong_markers):
        return "wrong"
    # Unknown failure mode — surface it so we don't loop forever on a broken setup.
    print(f"\n[!] diskutil returned an unexpected error (rc={result.returncode}):")
    print(f"    {result.stderr.strip() or result.stdout.strip()}")
    return "error"


def load_progress():
    """Return (line_index, number_index) of where to resume, or (0, 0) fresh."""
    if not os.path.exists(PROGRESS_FILE):
        return 0, 0
    try:
        with open(PROGRESS_FILE, "r", encoding="utf-8") as f:
            state = json.load(f)
        # We resume *after* the last successfully-tried position.
        return int(state.get("line_index", 0)), int(state.get("number_index", 0))
    except (json.JSONDecodeError, ValueError, OSError):
        print(f"Warning: could not read '{PROGRESS_FILE}', starting from the beginning.")
        return 0, 0


def save_progress(line_index, number_index, total_attempts):
    """Atomically write the current position so we can resume later."""
    state = {
        "line_index": line_index,
        "number_index": number_index,
        "total_attempts": total_attempts,
    }
    tmp = PROGRESS_FILE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(state, f)
    os.replace(tmp, PROGRESS_FILE)  # atomic on the same filesystem


def try_unlock():
    resume_line, resume_number = load_progress()
    total_attempts = 0

    try:
        with open(WORDLIST_FILE, "r", encoding="utf-8", errors="ignore") as file:
            print(f"Starting recovery process for {DISK_IDENTIFIER}...")
            if resume_line or resume_number:
                print(f"Resuming from line {resume_line}, number {resume_number}.")

            for line_index, line in enumerate(file):
                # Skip lines we already finished in a previous run.
                if line_index < resume_line:
                    continue

                word = line.strip()
                if not word:
                    continue

                # On the resume line, skip numbers we already tried; otherwise start at 0.
                start = resume_number if line_index == resume_line else 0

                # Inner loop: Add numbers 0-999 to the end of the word
                for i in range(start, 1000):
                    total_attempts += 1
                    password = f"{word}{i}"

                    if total_attempts % 100 == 0:
                        print(f"Attempt {total_attempts}: Currently trying variations of {word}...")

                    command = [
                        "diskutil", "apfs", "unlockVolume",
                        DISK_IDENTIFIER,
                        "-passphrase", password,
                    ]

                    result = subprocess.run(command, capture_output=True, text=True)

                    if result.returncode == 0:
                        print(f"\n\n[+] SUCCESS! Disk unlocked with password: {password}")
                        # Clean up so a future run doesn't try to resume a solved disk.
                        if os.path.exists(PROGRESS_FILE):
                            os.remove(PROGRESS_FILE)
                        return

                    # Checkpoint the *next* position to try, so a crash resumes cleanly.
                    if total_attempts % SAVE_EVERY == 0:
                        save_progress(line_index, i + 1, total_attempts)

                # Word fully exhausted: next run should start at the next line, number 0.
                save_progress(line_index + 1, 0, total_attempts)

            print(f"\n\n[-] Finished: Tried {total_attempts} passwords this run. No match found.")

    except KeyboardInterrupt:
        print(f"\n\n[!] Interrupted. Progress saved to '{PROGRESS_FILE}'. Re-run to continue.")
    except FileNotFoundError:
        print(f"Error: The file '{WORDLIST_FILE}' was not found.")
    except PermissionError:
        print("Error: Permission denied. Try running the script with sudo.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


if __name__ == "__main__":
    try_unlock()
