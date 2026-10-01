export interface Project {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  tags: string[];
  color: string;
  preview: string | null;
  context: string;
  question: string;
  approach: string;
  analysis: string;
  output: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  image: string | null;
}

export interface UVAOrg {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string | null;
}

export interface Photo {
  id: string;
  src: string | null;
  caption: string | null;
  location: string | null;
  rotation: number;
}

export const projects: Project[] = [
  {
    slug: "ai-investment-analysis",
    number: "01",
    title: "AI × Investment Analysis",
    tagline: "AI workflows for investment analysis and memorandum preparation.",
    tags: ["AI", "Investing", "Analytics", "Data Visualization"],
    color: "#6B4866",
    preview: null,
    context:
      "Investment memoranda require synthesizing large volumes of company, market, and financial data into a coherent investment thesis — a process that is time-intensive and difficult to scale.",
    question:
      "How can AI tools meaningfully accelerate and improve the quality of investment analysis and documentation without sacrificing judgment?",
    approach:
      "Built structured workflows using LLM-based tools to process company information, structure analysis, and generate first-pass research. Combined with custom visualization to make findings immediately legible for decision-making.",
    analysis:
      "Developed a repeatable process for using AI in company research, document analysis, and visualization. Identified where AI added genuine value versus where human judgment remained essential.",
    output:
      "Delivered investment memoranda and analysis documents with significantly reduced manual effort, allowing more time for judgment and insight rather than formatting and data collection.",
  },
  {
    slug: "operating-intelligence",
    number: "02",
    title: "Operating Intelligence",
    tagline: "Reporting workflows combining operating and transaction-level data.",
    tags: ["Analytics", "Automation", "Finance", "Data Visualization"],
    color: "#C4849D",
    preview: null,
    context:
      "Management reporting was fragmented across multiple data sources, requiring significant manual effort each reporting cycle with limited ability to go deeper on variance or cash flow drivers.",
    question:
      "How can operating and transaction-level data be combined into a clear, automated reporting system that management actually uses?",
    approach:
      "Designed an integrated data model pulling from operating and transaction-level sources. Built automated variance and cash flow views with visual outputs calibrated to management decisions rather than data completeness.",
    analysis:
      "Mapped data relationships across sources, identified key performance drivers, and built automated pipelines to calculate and visualize performance against targets across business units.",
    output:
      "Replaced a largely manual reporting process. Reduced reporting time while improving the analytical depth available to management each cycle.",
  },
  {
    slug: "investment-research",
    number: "03",
    title: "Investment Research",
    tagline: "Investment memoranda and briefs across businesses in Vietnam.",
    tags: ["Private Equity", "Due Diligence", "Valuation"],
    color: "#8C8690",
    preview: null,
    context:
      "Target companies operated in unfamiliar industries with limited public information, requiring bottom-up research to form a credible view on the business, market, and investment opportunity.",
    question:
      "What makes this business work — and does it represent a compelling investment opportunity at the proposed terms?",
    approach:
      "Conducted market, competitor, and distributor research. Built structured investment frameworks and wrote comprehensive memoranda presenting the business, market, financial analysis, and investment rationale.",
    analysis:
      "Industry analysis, competitive positioning, financial model review, management assessment, and risk identification across several Vietnamese businesses across different sectors.",
    output:
      "Delivered investment memorandum used in active deal evaluation process. Prepared preliminary investment briefs for screening additional opportunities.",
  },
  {
    slug: "financial-modeling",
    number: "04",
    title: "Financial Modeling",
    tagline: "Operating models, forecasts, and return analyses for PE due diligence.",
    tags: ["Financial Modeling", "Strategy", "Investing"],
    color: "#6B4866",
    preview: null,
    context:
      "Evaluating PE investment opportunities requires rigorous financial models that can test assumptions and generate credible return scenarios across different operating outcomes.",
    question:
      "What does the return profile look like under different growth and margin scenarios — and which assumptions drive the outcome most?",
    approach:
      "Built integrated operating and financial models from the ground up. Linked revenue drivers, cost structure, working capital, and debt schedules with connected scenario analysis.",
    analysis:
      "Developed five-year projections with granular operating assumptions. Sensitivity analysis around key variables. Calculated IRR, MOIC, and cash-on-cash return scenarios.",
    output:
      "Models used directly in investment committee presentations and deal evaluation. Five-year model adopted as the base for ongoing deal diligence.",
  },
  {
    slug: "data-visualization",
    number: "05",
    title: "Data Visualization",
    tagline: "Dashboards translating business data into clear management views.",
    tags: ["Power BI", "Analytics", "Business Intelligence"],
    color: "#C4849D",
    preview: null,
    context:
      "Raw operational data was not structured in a way that was useful for management decision-making. Reports were tables; dashboards were not designed around the decisions they were meant to inform.",
    question:
      "How do you design a reporting system that management actually uses — and that makes the right comparisons obvious?",
    approach:
      "Designed Power BI dashboards working backward from management decisions to identify the metrics and comparisons that mattered most. Simplified visual language to reduce cognitive load.",
    analysis:
      "KPIs, trends, and variance across business units. Designed for weekly management review rather than analyst exploration.",
    output:
      "Adopted as the standard management reporting format. Reduced time spent in weekly reporting meetings.",
  },
];

export const experiences: Experience[] = [
  {
    id: "twenty-in-twenty",
    company: "20in20 Partners",
    role: "Investment & AI Automation Intern",
    period: "Summer 2026",
    location: "Vietnam",
    description:
      "Investment analysis and AI-assisted workflows for a fund focused on emerging business opportunities in Vietnam. Built reporting tools, memoranda, and automated analysis pipelines that reduced manual effort in the investment process.",
    highlights: [
      "Investment analysis and company research across sectors",
      "AI-assisted workflows for investment memoranda",
      "Reporting tools integrating operating and transaction-level data",
      "Worked primarily with businesses and investments in Vietnam",
    ],
    image: null,
  },
  {
    id: "asia-business-builder",
    company: "Asia Business Builder",
    role: "Private Equity Intern",
    period: "2025",
    location: "Vietnam",
    description:
      "Private equity investment analysis for mid-market businesses in Vietnam. Full investment memorandum preparation, financial modeling, and commercial due diligence.",
    highlights: [
      "~40-page investment and company information memorandum",
      "Five-year financial models with scenario analysis",
      "Commercial due diligence and distributor research",
    ],
    image: null,
  },
  {
    id: "mb-securities",
    company: "MB Securities",
    role: "Analyst Intern",
    period: "Summer 2024",
    location: "Vietnam",
    description:
      "Equity research and financial analysis at one of Vietnam's leading securities firms.",
    highlights: [
      "Equity research across publicly listed Vietnamese companies",
      "Financial analysis and valuation",
    ],
    image: null,
  },
  {
    id: "kpim-retail",
    company: "KPIM Retail",
    role: "Data Analytics Intern",
    period: "2024",
    location: "Vietnam",
    description:
      "Business intelligence and dashboard development for a retail business. Built visual reporting systems for management decision-making.",
    highlights: [
      "Power BI dashboards tracking retail performance metrics",
      "Visual reporting for management decision-making",
    ],
    image: null,
  },
];

export const uvaOrgs: UVAOrg[] = [
  {
    id: "portico",
    name: "Portico Impact Fund",
    role: "Investment Analyst · Healthcare Coverage Director",
    description:
      "Student-run investment fund. Led healthcare sector coverage including equity research, company analysis, and investment recommendations presented to the fund committee.",
    image: null,
  },
  {
    id: "jcc",
    name: "Jefferson Consulting Collective",
    role: "[Add your role]",
    description: "[Add description]",
    image: null,
  },
  {
    id: "biokind",
    name: "BioKind Analytics",
    role: "[Add your role]",
    description: "[Add description]",
    image: null,
  },
];

export const photos: Photo[] = [
  { id: "1", src: null, caption: "[Add caption]", location: null, rotation: -2.5 },
  { id: "2", src: null, caption: "[Add caption]", location: null, rotation: 1.8 },
  { id: "3", src: null, caption: "[Add caption]", location: null, rotation: -1.2 },
  { id: "4", src: null, caption: "[Add caption]", location: null, rotation: 3.1 },
  { id: "5", src: null, caption: "[Add caption]", location: null, rotation: -2.0 },
  { id: "6", src: null, caption: "[Add caption]", location: null, rotation: 1.4 },
];

export const contact = {
  email: "nbp4ps@virginia.edu",
  linkedin: "https://www.linkedin.com/in/yen-tran-2a8a89213/",
  resume: "/resume.pdf",
};
