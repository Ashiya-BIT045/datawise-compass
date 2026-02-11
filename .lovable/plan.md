

# B2B Data Intelligence Marketplace – Phase 1

**Vision**: "The Tesla of Data Platforms" — A futuristic, elegant, enterprise-grade data discovery ecosystem built with React. Frontend-only with dummy JSON data, localStorage-based auth simulation.

---

## 🎨 Design System
- **Two theme options** you can toggle between: Deep Navy + White (corporate-modern) and Dark Mode Primary (sleek, futuristic)
- Glassmorphism card effects, gradient highlights, premium spacing
- Smooth animations using CSS/Tailwind (fade-ins, hover elevations, animated counters)
- Responsive mobile-first design

---

## 📄 Pages in Phase 1

### 1. Homepage – "Data Intelligence Reimagined"
- **Hero section** with animated typing search bar and motion gradient background
- **8 Category Grid** (Postal, Tele, Email, Healthcare, New Business, SOHO, POI, Enrichment) with animated hover cards and volume indicators
- **Use Case Navigator** preview section
- **Featured Data Products** carousel
- **Trust & Compliance** badges section
- **CTA** and elegant footer

### 2. AI Search + Results Page
- Simulated AI-powered search with filters (industry, geography, product type, compliance)
- **Multi-stage visualization**: search results → drill-down charts → volume preview → sample modal
- Animated filter transitions and result cards
- Guest users see limited/blurred results with upgrade prompts

### 3. Product Catalog Page
- Filterable grid of all data products across 8 categories
- Category filtering, sorting, confidence scoring indicators
- Card-based layout with key metrics preview

### 4. Product Detail Page (5 Tabs)
- **Overview**: KPI cards, animated confidence score circle, industry breakdown pie chart
- **Volumes & Samples**: Bar charts, growth trend line charts (Recharts)
- **Sample Data**: Elegant data table with partial blur for guests
- **Data Dictionary**: Interactive expandable field definitions
- **Related Products**: Smart recommendation cards

### 5. Login & Signup Pages
- Glassmorphism card with animated gradient background
- "Continue as Guest", "Start Free Trial", role selection
- Trial badge highlight

---

## 🔐 Auth & Feature Gating (localStorage Simulation)
- **Guest**: Can explore homepage and search; downloads, full analytics, comparison, and data dictionary are blurred with lock icons and upgrade prompts
- **Free Trial (7-day)**: Full access with countdown banner and subtle premium UI glow
- **Paid User**: No restrictions, clean experience
- Role state persisted in localStorage with simulated trial timer

---

## 📊 Data & Visualizations
- Dummy JSON datasets for all 8 product categories
- Recharts for: circular confidence scores, bar charts (volume), pie charts (industry split), line charts (growth trends)
- Animated number counters for key metrics

---

## 💎 Premium Touches
- Dark mode toggle
- AI typing animation effect in search
- Loading skeleton shimmers
- Hover micro-interactions on cards
- Elegant toast notifications (Sonner)
- Smooth page/tab transitions

---

## 🚫 Deferred to Phase 2
- Product Comparison Page (up to 3 products, sticky bar)
- Use Case Navigator (full page with filtered results)
- Compliance & Trust Center (dedicated page)
- First-time onboarding walkthrough (spotlight tutorial)
- Floating chatbot UI
- Parallax effects

