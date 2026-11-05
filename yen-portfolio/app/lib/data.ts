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

export interface ExperienceImage {
  src: string;
  width: number;
  height: number;
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
  imageWidth: number | null;
  imageHeight: number | null;
  extraImages: ExperienceImage[];
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
  {
    slug: "road-ready-bundle",
    number: "06",
    title: "Road-Ready Bundle",
    tagline: "Go-to-market strategy for CarMax's bundled car ownership product.",
    tags: ["Strategy", "Marketing", "Financial Analysis", "Consumer Research"],
    color: "#8C8690",
    preview: null,
    context:
      "Gen Z car buyers face stress and decision fatigue at every stage of the purchase journey. CarMax's ancillary products — financing, warranty, insurance, maintenance — were sold separately, leaving customers overwhelmed and conversion rates below potential.",
    question:
      "How can CarMax simplify post-purchase decisions for Gen Z buyers to increase ancillary product adoption and strengthen long-term customer relationships?",
    approach:
      "Designed the Road-Ready Bundle: a modular offering combining CarMax Auto Finance, MaxCare warranty, GEICO insurance, and RepairPal prepaid maintenance. Built a full go-to-market plan including a 5% bundle discount, AI-powered personalization quiz, phased campaign roadmap (Drive Easy → Drive Confident → Drive Covered), and an alpha/beta testing framework.",
    analysis:
      "Primary research validated demand: 81% of Gen Z want insurance at point of sale, 65% would buy prepaid maintenance, 71% trust AI for their shopping experience. Competitive perceptual mapping across CarMax, Carvana, AutoNation, Honda, and Toyota identified whitespace in convenience × comprehensiveness. Financial modeling produced NPV of $537M and IRR of 2,138% on Year 1 testing cost of ~$1M.",
    output:
      "Full go-to-market recommendation presented to CarMax executives and McIntire faculty. Three-phase campaign strategy with $114M total budget and 248% projected ROI.",
  },
  {
    slug: "ebay-entrupy",
    number: "08",
    title: "eBay × Entrupy",
    tagline: "M&A recommendation to internalize AI authentication and strengthen platform trust.",
    tags: ["Strategy", "M&A", "Financial Analysis", "Competitive Analysis"],
    color: "#C4849D",
    preview: null,
    context:
      "eBay's highest-volume categories — fashion, footwear, jewelry, electronics, and collectibles — are among the most counterfeited product classes globally. As the recommerce market grows at 7.48% CAGR toward $50B by 2030, specialized competitors (StockX, The RealReal, GOAT) are differentiating through in-house authentication. eBay's reliance on third-party authenticators limits platform control, speed, and buyer trust.",
    question:
      "How can eBay close the trust gap with specialized resale platforms and defend its position in high-value categories — where authenticity is a prerequisite for continued growth?",
    approach:
      "Recommended that eBay acquire Entrupy, an AI-powered authentication platform, to internalize verification across its highest-risk categories. Analyzed strategic fit across brand values, technology integration, and category coverage. Built a full valuation model covering acquisition cost, cost savings from eliminating third-party authentication fees at scale, revenue uplift from improved buyer trust, and synergy quantification with scenario analysis.",
    analysis:
      "Competitive landscape analysis across Amazon, StockX, The RealReal, GOAT, and Vestiaire Collective benchmarked authentication models and cost structures. Financial model quantified cost savings from in-house verification, incremental GMV from trust improvements, and integration costs. Scenario and sensitivity analysis tested return across GMV growth and cost savings assumptions.",
    output:
      "M&A recommendation delivered to simulated eBay Board of Directors. Entrupy acquisition generates NPV of $289M at IRR of 32%, shifting eBay from a listing platform to a trust-driven marketplace with proprietary AI authentication capability.",
  },
  {
    slug: "michelin-strategy",
    number: "09",
    title: "Michelin Restaurant Strategy",
    tagline: "Strategic recommendation for a Michelin-starred restaurant.",
    tags: ["Strategy", "Financial Analysis"],
    color: "#8C8690",
    preview: null,
    context: "[Add context]",
    question: "[Add question]",
    approach: "[Add approach]",
    analysis: "[Add analysis]",
    output: "[Add output]",
  },
  {
    slug: "student-club-db",
    number: "07",
    title: "Student Club Database",
    tagline: "Relational database design and analysis for student organization management.",
    tags: ["SQL", "Database Design", "Tableau", "Analytics"],
    color: "#6B4866",
    preview: null,
    context:
      "Student organizations manage membership, events, finances, and participation across multiple channels with no unified data structure — leading to fragmented records and limited visibility into club operations.",
    question:
      "How do you design a relational database that accurately models student club operations and enables meaningful analysis of membership and activity patterns?",
    approach:
      "Designed a normalized relational schema covering members, events, roles, attendance, and finances. Translated real-world entities and relationships into an ER diagram, implemented in SQL, and connected to Tableau for analytical views.",
    analysis:
      "Built and queried the database to surface membership trends, event participation rates, and financial summaries. Validated referential integrity and tested edge cases across the schema.",
    output:
      "Fully functional student club database with SQL implementation and Tableau dashboards providing operational visibility across membership, events, and finances.",
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
      "Investment analysis and automated reporting for a Vietnam-focused fund. Financial and operational data were fragmented across systems with no unified management view. Built workflows connecting data sources into automated reporting, produced investment memoranda, and conducted company analysis across multiple sectors.",
    highlights: [
      "Investment analysis and company research across sectors",
      "AI-assisted workflows for investment memoranda",
      "Reporting tools integrating operating and transaction-level data",
      "Worked primarily with businesses and investments in Vietnam",
    ],
    image: "/20in20.jpg",
    imageWidth: 4713,
    imageHeight: 3535,
    extraImages: [],
  },
  {
    id: "seo-vietnam",
    company: "SEO-Vietnam",
    role: "Fellow",
    period: "2026",
    location: "Vietnam",
    description:
      "More than a professional network, SEO-Vietnam brings together mentorship, community, and service. Through one-on-one mentorship, career development, and community initiatives, I've found a space to learn from people ahead of me, grow alongside my peers, and give back along the way.",
    highlights: [
      "One-on-one mentorship and career development",
      "Community initiatives and peer learning",
      "Mentorship, community, and service across the network",
    ],
    image: "/seov.jpg",
    imageWidth: 1640,
    imageHeight: 924,
    extraImages: [{ src: "/seov2.jpg", width: 1462, height: 1132 }],
  },
  {
    id: "asia-business-builder",
    company: "Asia Business Builder",
    role: "Private Equity Intern",
    period: "2025",
    location: "Vietnam",
    description:
      "Private equity research on mid-market businesses in Vietnam, where limited public information made bottom-up analysis essential. Built financial models and investment frameworks from scratch — market research, competitive analysis, distributor interviews, and comprehensive memoranda used in active deal evaluation.",
    highlights: [
      "~40-page investment and company information memorandum",
      "Five-year financial models with scenario analysis",
      "Commercial due diligence and distributor research",
    ],
    image: "/logo-abb.png",
    imageWidth: 670,
    imageHeight: 298,
    extraImages: [],
  },
  {
    id: "mb-securities",
    company: "MB Securities",
    role: "Analyst Intern",
    period: "Summer 2024",
    location: "Vietnam",
    description:
      "Equity research across publicly listed Vietnamese companies at one of Vietnam's leading securities firms. Financial analysis, valuation, and sector coverage across Vietnamese public markets.",
    highlights: [
      "Equity research across publicly listed Vietnamese companies",
      "Financial analysis and valuation",
    ],
    image: "/logo-mbs.png",
    imageWidth: 1200,
    imageHeight: 379,
    extraImages: [],
  },
  {
    id: "kpim-retail",
    company: "KPIM Retail",
    role: "Data Analytics Intern",
    period: "2024",
    location: "Vietnam",
    description:
      "Retail performance data was spread across systems with no unified management view. Built Power BI dashboards designed backward from the decisions management needed to make — tracking KPIs, trends, and variance across product categories and time periods.",
    highlights: [
      "Power BI dashboards tracking retail performance metrics",
      "Visual reporting for management decision-making",
    ],
    image: "/logo-kpim.png",
    imageWidth: 1495,
    imageHeight: 570,
    extraImages: [],
  },
];

export const uvaOrgs: UVAOrg[] = [
  {
    id: "portico",
    name: "Portico Impact Fund",
    role: "Healthcare Coverage Director",
    description:
      "Student-run investment fund. Led healthcare sector coverage including equity research, company analysis, and investment recommendations presented to the fund committee.",
    image: "/logo-portico-2.png",
  },
  {
    id: "jcc",
    name: "Jefferson Consulting Collective",
    role: "MD of Projects",
    description: "Manage project delivery and client relationships for UVA's student-run consulting organization.",
    image: "/logo-jcc.png",
  },
  {
    id: "biokind",
    name: "BioKind Analytics",
    role: "Analyst",
    description: "Data analysis and research supporting BioKind's work connecting analytical resources with mission-driven organizations.",
    image: "/logo-biokind.png",
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
  email: "haiyen.tran1612@gmail.com",
  linkedin: "https://www.linkedin.com/in/yentran162/",
  resume: "https://drive.google.com/file/d/1h_6iL8S71ZqmhM1nyv-Sza-TPDiDxpE5/view?usp=sharing",
};
