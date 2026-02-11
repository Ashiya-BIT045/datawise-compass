export interface DataProduct {
  id: string;
  name: string;
  category: Category;
  description: string;
  shortDescription: string;
  volume: number;
  confidenceScore: number;
  industries: { name: string; percentage: number }[];
  geography: string[];
  compliance: string[];
  priceRange: string;
  growthTrend: { month: string; volume: number }[];
  volumeByRegion: { region: string; volume: number }[];
  sampleFields: string[];
  dataDictionary: { field: string; type: string; description: string; example: string }[];
  lastUpdated: string;
  matchRate: number;
  tags: string[];
}

export type Category = "postal" | "tele" | "email" | "healthcare" | "new-business" | "soho" | "poi" | "enrichment";

export interface CategoryInfo {
  id: Category;
  name: string;
  icon: string;
  description: string;
  volume: string;
  color: string;
}

export const categories: CategoryInfo[] = [
  { id: "postal", name: "Postal Data", icon: "Mail", description: "High-quality direct mail data with verified addresses", volume: "42M+", color: "hsl(221, 83%, 53%)" },
  { id: "tele", name: "Telemarketing", icon: "Phone", description: "TPS-screened B2B telephone data for outreach", volume: "28M+", color: "hsl(262, 83%, 58%)" },
  { id: "email", name: "Email Data", icon: "AtSign", description: "Verified B2B email contacts for campaigns", volume: "35M+", color: "hsl(160, 84%, 39%)" },
  { id: "healthcare", name: "Healthcare", icon: "Heart", description: "HCP & pharma professional data", volume: "8M+", color: "hsl(0, 84%, 60%)" },
  { id: "new-business", name: "New Business", icon: "Rocket", description: "Newly registered company data", volume: "1.2M+", color: "hsl(43, 96%, 56%)" },
  { id: "soho", name: "SOHO", icon: "Home", description: "Micro-business and sole trader data", volume: "5.5M+", color: "hsl(200, 80%, 50%)" },
  { id: "poi", name: "POI & Analytics", icon: "MapPin", description: "Points of interest and location analytics", volume: "12M+", color: "hsl(280, 60%, 50%)" },
  { id: "enrichment", name: "Enrichment", icon: "Layers", description: "Data enhancement and append services", volume: "100M+", color: "hsl(170, 60%, 45%)" },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const makeTrend = (base: number, growth: number) =>
  months.map((m, i) => ({ month: m, volume: Math.round(base + growth * i + Math.random() * base * 0.1) }));

export const products: DataProduct[] = [
  {
    id: "postal-uk-business",
    name: "UK Business Postal Database",
    category: "postal",
    description: "Comprehensive UK business postal data with PAF-verified addresses, covering all industries and company sizes. Ideal for direct mail campaigns targeting decision-makers.",
    shortDescription: "PAF-verified UK business addresses for direct mail",
    volume: 4200000,
    confidenceScore: 94,
    industries: [
      { name: "Finance", percentage: 22 },
      { name: "Technology", percentage: 18 },
      { name: "Healthcare", percentage: 15 },
      { name: "Retail", percentage: 14 },
      { name: "Manufacturing", percentage: 12 },
      { name: "Other", percentage: 19 },
    ],
    geography: ["England", "Scotland", "Wales", "N. Ireland"],
    compliance: ["GDPR", "PAF Licensed", "MPS Screened"],
    priceRange: "£0.02 - £0.08 per record",
    growthTrend: makeTrend(3800000, 35000),
    volumeByRegion: [
      { region: "London", volume: 980000 },
      { region: "South East", volume: 620000 },
      { region: "North West", volume: 510000 },
      { region: "West Midlands", volume: 440000 },
      { region: "Yorkshire", volume: 390000 },
      { region: "Other", volume: 1260000 },
    ],
    sampleFields: ["Company Name", "Address Line 1", "Postcode", "SIC Code", "Employee Count"],
    dataDictionary: [
      { field: "company_name", type: "string", description: "Registered company name", example: "Acme Ltd" },
      { field: "address_line_1", type: "string", description: "Primary address line", example: "123 High Street" },
      { field: "postcode", type: "string", description: "UK postcode", example: "EC1A 1BB" },
      { field: "sic_code", type: "string", description: "Standard Industrial Classification", example: "62012" },
      { field: "employee_count", type: "integer", description: "Number of employees", example: "50" },
      { field: "turnover_band", type: "string", description: "Revenue band", example: "£1M-£5M" },
    ],
    lastUpdated: "2026-02-01",
    matchRate: 96,
    tags: ["direct mail", "B2B", "verified addresses"],
  },
  {
    id: "tele-uk-decision-makers",
    name: "UK Decision Maker Tele Data",
    category: "tele",
    description: "TPS-screened telemarketing data targeting C-suite and senior decision makers across UK businesses. Updated monthly with consent verification.",
    shortDescription: "TPS-screened C-suite telephone contacts",
    volume: 2800000,
    confidenceScore: 91,
    industries: [
      { name: "Technology", percentage: 25 },
      { name: "Finance", percentage: 20 },
      { name: "Professional Services", percentage: 18 },
      { name: "Manufacturing", percentage: 15 },
      { name: "Other", percentage: 22 },
    ],
    geography: ["UK Wide"],
    compliance: ["TPS Screened", "GDPR", "CTPS Screened"],
    priceRange: "£0.05 - £0.15 per record",
    growthTrend: makeTrend(2500000, 25000),
    volumeByRegion: [
      { region: "London", volume: 720000 },
      { region: "South East", volume: 450000 },
      { region: "North West", volume: 380000 },
      { region: "Midlands", volume: 350000 },
      { region: "Other", volume: 900000 },
    ],
    sampleFields: ["Contact Name", "Job Title", "Phone Number", "Company", "Industry"],
    dataDictionary: [
      { field: "contact_name", type: "string", description: "Full contact name", example: "John Smith" },
      { field: "job_title", type: "string", description: "Current job title", example: "Managing Director" },
      { field: "phone", type: "string", description: "Direct phone number", example: "020 7XXX XXXX" },
      { field: "company_name", type: "string", description: "Employer company", example: "Tech Corp Ltd" },
      { field: "sic_code", type: "string", description: "Industry classification", example: "62020" },
    ],
    lastUpdated: "2026-01-28",
    matchRate: 89,
    tags: ["telemarketing", "decision makers", "TPS screened"],
  },
  {
    id: "email-b2b-verified",
    name: "B2B Verified Email Database",
    category: "email",
    description: "Triple-verified B2B email database with real-time bounce protection. Covers all UK industries with role-based and named contact emails.",
    shortDescription: "Triple-verified B2B email contacts",
    volume: 3500000,
    confidenceScore: 97,
    industries: [
      { name: "Technology", percentage: 28 },
      { name: "Finance", percentage: 19 },
      { name: "Marketing", percentage: 16 },
      { name: "Healthcare", percentage: 12 },
      { name: "Other", percentage: 25 },
    ],
    geography: ["UK", "Europe"],
    compliance: ["GDPR", "CAN-SPAM", "PECR"],
    priceRange: "£0.03 - £0.10 per record",
    growthTrend: makeTrend(3000000, 45000),
    volumeByRegion: [
      { region: "UK", volume: 2100000 },
      { region: "Germany", volume: 450000 },
      { region: "France", volume: 380000 },
      { region: "Netherlands", volume: 280000 },
      { region: "Other EU", volume: 290000 },
    ],
    sampleFields: ["Email", "First Name", "Last Name", "Company", "Job Function"],
    dataDictionary: [
      { field: "email", type: "string", description: "Verified email address", example: "j.smith@company.com" },
      { field: "first_name", type: "string", description: "Contact first name", example: "Jane" },
      { field: "last_name", type: "string", description: "Contact last name", example: "Smith" },
      { field: "company", type: "string", description: "Company name", example: "Digital Agency Ltd" },
      { field: "job_function", type: "string", description: "Functional role", example: "Marketing" },
    ],
    lastUpdated: "2026-02-05",
    matchRate: 97,
    tags: ["email marketing", "verified", "B2B"],
  },
  {
    id: "healthcare-hcp",
    name: "Healthcare Professional Database",
    category: "healthcare",
    description: "Comprehensive HCP database covering GPs, specialists, pharmacists, and allied health professionals across the UK NHS and private sector.",
    shortDescription: "UK healthcare professional contacts",
    volume: 820000,
    confidenceScore: 93,
    industries: [
      { name: "NHS", percentage: 55 },
      { name: "Private Healthcare", percentage: 25 },
      { name: "Pharma", percentage: 12 },
      { name: "Other", percentage: 8 },
    ],
    geography: ["UK Wide"],
    compliance: ["GDPR", "NHS DSP", "ICO Registered"],
    priceRange: "£0.10 - £0.30 per record",
    growthTrend: makeTrend(750000, 6000),
    volumeByRegion: [
      { region: "England", volume: 620000 },
      { region: "Scotland", volume: 95000 },
      { region: "Wales", volume: 60000 },
      { region: "N. Ireland", volume: 45000 },
    ],
    sampleFields: ["HCP Name", "Specialty", "Practice", "GMC Number", "Region"],
    dataDictionary: [
      { field: "hcp_name", type: "string", description: "Healthcare professional name", example: "Dr. Sarah Jones" },
      { field: "specialty", type: "string", description: "Medical specialty", example: "Cardiology" },
      { field: "practice_name", type: "string", description: "Practice or hospital", example: "St. Mary's Hospital" },
      { field: "gmc_number", type: "string", description: "GMC registration", example: "1234567" },
    ],
    lastUpdated: "2026-01-15",
    matchRate: 92,
    tags: ["healthcare", "HCP", "pharma", "NHS"],
  },
  {
    id: "new-business-registrations",
    name: "New Business Registrations",
    category: "new-business",
    description: "Daily updated feed of newly registered companies from Companies House. Capture new business opportunities within 24 hours of registration.",
    shortDescription: "Daily new company registration data",
    volume: 85000,
    confidenceScore: 99,
    industries: [
      { name: "Professional Services", percentage: 30 },
      { name: "Technology", percentage: 22 },
      { name: "Retail", percentage: 18 },
      { name: "Construction", percentage: 15 },
      { name: "Other", percentage: 15 },
    ],
    geography: ["UK Wide"],
    compliance: ["Companies House", "GDPR"],
    priceRange: "£0.01 - £0.05 per record",
    growthTrend: makeTrend(70000, 1200),
    volumeByRegion: [
      { region: "London", volume: 28000 },
      { region: "South East", volume: 14000 },
      { region: "North West", volume: 11000 },
      { region: "Other", volume: 32000 },
    ],
    sampleFields: ["Company Name", "Registration Date", "SIC Code", "Director Name", "Registered Address"],
    dataDictionary: [
      { field: "company_name", type: "string", description: "Registered company name", example: "NewTech Solutions Ltd" },
      { field: "registration_date", type: "date", description: "Date of incorporation", example: "2026-02-10" },
      { field: "sic_code", type: "string", description: "Industry classification", example: "62012" },
      { field: "director_name", type: "string", description: "Primary director", example: "Alex Johnson" },
    ],
    lastUpdated: "2026-02-11",
    matchRate: 100,
    tags: ["new business", "startups", "Companies House"],
  },
  {
    id: "soho-micro-business",
    name: "SOHO & Micro-Business Data",
    category: "soho",
    description: "Specialized dataset targeting sole traders, freelancers, and micro-businesses (1-9 employees). Ideal for products and services targeting small business owners.",
    shortDescription: "Sole trader and micro-business contacts",
    volume: 5500000,
    confidenceScore: 86,
    industries: [
      { name: "Professional Services", percentage: 32 },
      { name: "Construction", percentage: 20 },
      { name: "Creative", percentage: 16 },
      { name: "Technology", percentage: 14 },
      { name: "Other", percentage: 18 },
    ],
    geography: ["UK Wide"],
    compliance: ["GDPR", "ICO Registered"],
    priceRange: "£0.01 - £0.04 per record",
    growthTrend: makeTrend(5000000, 42000),
    volumeByRegion: [
      { region: "London", volume: 1200000 },
      { region: "South East", volume: 850000 },
      { region: "North West", volume: 680000 },
      { region: "Other", volume: 2770000 },
    ],
    sampleFields: ["Business Name", "Owner Name", "Phone", "Postcode", "Trade"],
    dataDictionary: [
      { field: "business_name", type: "string", description: "Trading name", example: "Smith Plumbing" },
      { field: "owner_name", type: "string", description: "Owner/proprietor name", example: "Mike Smith" },
      { field: "phone", type: "string", description: "Contact number", example: "07XXX XXXXXX" },
      { field: "trade", type: "string", description: "Business trade/type", example: "Plumber" },
    ],
    lastUpdated: "2026-01-20",
    matchRate: 82,
    tags: ["SOHO", "micro-business", "sole traders"],
  },
  {
    id: "poi-locations",
    name: "UK Points of Interest",
    category: "poi",
    description: "Comprehensive POI database with 12M+ locations including retail outlets, restaurants, offices, and public facilities with geocoded coordinates.",
    shortDescription: "Geocoded UK location and POI data",
    volume: 12000000,
    confidenceScore: 90,
    industries: [
      { name: "Retail", percentage: 35 },
      { name: "Hospitality", percentage: 22 },
      { name: "Office", percentage: 18 },
      { name: "Public", percentage: 15 },
      { name: "Other", percentage: 10 },
    ],
    geography: ["UK Wide"],
    compliance: ["GDPR", "OS Licensed"],
    priceRange: "£0.005 - £0.02 per record",
    growthTrend: makeTrend(11000000, 85000),
    volumeByRegion: [
      { region: "London", volume: 3200000 },
      { region: "South East", volume: 1800000 },
      { region: "North West", volume: 1400000 },
      { region: "Other", volume: 5600000 },
    ],
    sampleFields: ["POI Name", "Category", "Latitude", "Longitude", "Address"],
    dataDictionary: [
      { field: "poi_name", type: "string", description: "Point of interest name", example: "Costa Coffee" },
      { field: "category", type: "string", description: "POI category", example: "Coffee Shop" },
      { field: "latitude", type: "float", description: "Latitude coordinate", example: "51.5074" },
      { field: "longitude", type: "float", description: "Longitude coordinate", example: "-0.1278" },
    ],
    lastUpdated: "2026-02-08",
    matchRate: 94,
    tags: ["POI", "locations", "geocoded", "retail"],
  },
  {
    id: "enrichment-company",
    name: "Company Data Enrichment",
    category: "enrichment",
    description: "Enrich your existing database with 50+ additional data points including financials, technographics, firmographics, and social profiles.",
    shortDescription: "50+ data point company enrichment service",
    volume: 100000000,
    confidenceScore: 88,
    industries: [
      { name: "Cross-Industry", percentage: 100 },
    ],
    geography: ["UK", "Europe", "Global"],
    compliance: ["GDPR", "ISO 27001"],
    priceRange: "£0.01 - £0.10 per match",
    growthTrend: makeTrend(90000000, 850000),
    volumeByRegion: [
      { region: "UK", volume: 35000000 },
      { region: "Europe", volume: 30000000 },
      { region: "North America", volume: 20000000 },
      { region: "Other", volume: 15000000 },
    ],
    sampleFields: ["Company Name", "Revenue", "Tech Stack", "Social URLs", "Headcount"],
    dataDictionary: [
      { field: "company_name", type: "string", description: "Company name to match", example: "Acme Corp" },
      { field: "revenue", type: "string", description: "Estimated revenue", example: "£10M-£50M" },
      { field: "tech_stack", type: "array", description: "Technologies used", example: "Salesforce, HubSpot" },
      { field: "linkedin_url", type: "string", description: "Company LinkedIn", example: "linkedin.com/company/acme" },
    ],
    lastUpdated: "2026-02-10",
    matchRate: 78,
    tags: ["enrichment", "append", "firmographics"],
  },
];

export const useCases = [
  { id: "lead-gen", name: "Lead Generation", icon: "Target", description: "Find and qualify new B2B leads", categories: ["postal", "tele", "email"] as Category[] },
  { id: "market-expansion", name: "Market Expansion", icon: "Globe", description: "Discover new markets and segments", categories: ["poi", "new-business", "enrichment"] as Category[] },
  { id: "healthcare-targeting", name: "Healthcare Targeting", icon: "Heart", description: "Reach HCPs and pharma professionals", categories: ["healthcare", "email"] as Category[] },
  { id: "direct-mail", name: "Direct Mail Campaigns", icon: "Mail", description: "Launch targeted postal campaigns", categories: ["postal", "enrichment"] as Category[] },
  { id: "new-biz-outreach", name: "New Business Outreach", icon: "Rocket", description: "Target freshly registered companies", categories: ["new-business", "tele", "email"] as Category[] },
  { id: "local-marketing", name: "Local Marketing", icon: "MapPin", description: "Geo-targeted campaigns with POI data", categories: ["poi", "soho", "postal"] as Category[] },
];
