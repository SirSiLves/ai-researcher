/**
 * Slug → display label.
 * Three layers, applied in order:
 *   1. KNOWN_BRANDS — exact slug match for CamelCase or all-caps brand names.
 *   2. ACRONYMS     — uppercase any token that's a known acronym.
 *   3. Title-case   — default fallback.
 *
 * Add new brand names to KNOWN_BRANDS as they appear; the data side uses
 * lowercase kebab slugs, so adding here is the only display-side change needed.
 */
const KNOWN_BRANDS: Record<string, string> = {
  'openai':       'OpenAI',
  'deepmind':     'DeepMind',
  'deepseek':     'DeepSeek',
  'github':       'GitHub',
  'gitlab':       'GitLab',
  'linkedin':     'LinkedIn',
  'minimax':      'MiniMax',
  'langchain':    'LangChain',
  'langgraph':    'LangGraph',
  'langsmith':    'LangSmith',
  'opencv':       'OpenCV',
  'opencode':     'OpenCode',
  'opendatalab':  'OpenDataLab',
  'opensource':   'Open Source',
  'autogen':      'AutoGen',
  'crewai':       'CrewAI',
  'llamaindex':   'LlamaIndex',
  'huggingface':  'Hugging Face',
  'alphasense':   'AlphaSense',
  'servicenow':   'ServiceNow',
  'salesforce':   'Salesforce',
  'snowflake':    'Snowflake',
  'cloudflare':   'Cloudflare',
  'pwc':          'PwC',
  'jpmorgan':     'JPMorgan',
  'bnp-paribas':  'BNP Paribas',
  'softbank':     'SoftBank',
  'mckinsey':     'McKinsey',
  'cerebras':     'Cerebras',
  'nvidia':       'NVIDIA',
  'amd':          'AMD',
  'ibm':          'IBM',
  'aws':          'AWS',
  'gcp':          'GCP',
  'sap':          'SAP',
  'ey':           'EY',
  'kpmg':         'KPMG',
  'arxiv':        'arXiv',
  'mit':          'MIT',
  'eth':          'ETH',
  'epfl':         'EPFL',
  'ubs':          'UBS',
  'aig':          'AIG',
  'bny':          'BNY',
  'fis':          'FIS',
  'hai':          'HAI',
  'aisi-uk':      'AISI UK',
  'caisi':        'CAISI',
  'aisi':         'AISI',
  'x-ai':         'xAI',
  'xai':          'xAI',
  'z-ai':         'Z.ai',
  '01-ai':        '01.AI',
  'ai-office':    'AI Office',
  'us-gov':       'US Gov',
  'uk-gov':       'UK Gov',
  'eu-commission':'EU Commission'
};

const ACRONYMS = new Set([
  'ai','ml','ipo','ceo','cto','cfo','vc','ux','ui','llm','mcp','a2a',
  'gpu','cpu','tpu','npu','kpi','eu','us','uk','ch','de','fr','cn','jp',
  'iso','nist','rmf','rag','arr','b2b','b2c','sla','sso','tls','sdk',
  'cli','api','ide','vcs','ci','cd','ml','rl','nlp','cv','llmops','aiops',
  'ftc','sec','cisa','nsa','dod','irs','fda'
]);

export function humanizeSlug(slug: string): string {
  if (!slug) return '';
  const key = slug.toLowerCase();
  if (KNOWN_BRANDS[key]) return KNOWN_BRANDS[key];
  return slug.split('-').map(part => {
    if (!part) return '';
    if (ACRONYMS.has(part.toLowerCase())) return part.toUpperCase();
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join(' ');
}
