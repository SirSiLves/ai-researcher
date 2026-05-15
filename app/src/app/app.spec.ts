import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('renders the four tabs', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const labels = Array.from(fixture.nativeElement.querySelectorAll('.tab span:not(.brand-name)'))
      .map((el: any) => el.textContent?.trim());
    expect(labels).toEqual(['Today', 'Trends', 'Firms', 'Reports']);
  });
});
