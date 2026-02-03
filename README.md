# Decimal Health Website

A modern, conversion-optimized website for Decimal Health - a physician-led digital health consultancy.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the website directory:
   ```bash
   cd "c:\Users\rehan\OneDrive\Desktop\Decimal Health\website"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
website/
├── public/
│   └── robots.txt           # SEO + LLM crawler rules
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles & brand tokens
│   │   ├── layout.tsx       # Root layout with metadata + JSON-LD
│   │   ├── page.tsx         # Homepage
│   │   └── sitemap.ts       # Dynamic sitemap generation
│   ├── components/
│   │   ├── Navigation.tsx   # Header with dropdown menus
│   │   ├── Hero.tsx         # Hero section with stats
│   │   ├── SocialProof.tsx  # Stats and trust indicators
│   │   ├── Solutions.tsx    # Persona-based solution cards
│   │   ├── Services.tsx     # Service methodology tabs
│   │   ├── Testimonials.tsx # Customer testimonials carousel
│   │   ├── Team.tsx         # Team members section
│   │   ├── CTA.tsx          # Call-to-action section
│   │   └── Footer.tsx       # Site footer
│   └── lib/
│       └── utils.ts         # Utility functions
├── tailwind.config.js       # Tailwind + brand colors
└── package.json
```

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Navy | `#3D3D6B` | Primary text, headers |
| Teal | `#2D9596` | CTAs, accents, links |
| Coral | `#F25C5C` | Highlights, emphasis |
| Gold | `#E8B474` | Accents |
| Cyan | `#7DD3D3` | Light accents |
| Cream | `#E8E4DF` | Background |

## Conversion Optimization Features

1. **Clear Value Proposition**: "From Bold Ideas to Impact" above the fold
2. **Social Proof**: Stats prominently displayed (100+ companies, 45+ products)
3. **Persona-Based Navigation**: Tailored paths for Startups, Health Systems, Pharma
4. **Differentiated CTAs**: "Book a Strategy Call" vs generic "Learn More"
5. **Trust Indicators**: Harvard, Mass General Brigham, Moffitt logos

## LLM/AI Indexing Optimization

- **JSON-LD Structured Data**: Organization schema in layout.tsx
- **robots.txt**: Explicitly allows GPTBot, Claude, and other AI crawlers
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Meta Description**: Keyword-rich descriptions for each page
- **Sitemap**: Auto-generated sitemap.xml

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Static Export

```bash
npm run build
```

The output will be in the `.next` folder.

## Customization

### Adding Team Member Photos

Replace the avatar placeholders in `Team.tsx` with actual images:

```tsx
<Image
  src="/team/kamal.jpg"
  alt="Kamal Jethwani"
  width={112}
  height={112}
  className="rounded-full"
/>
```

### Updating Testimonials

Edit the `testimonials` array in `Testimonials.tsx` to add new customer quotes.

### Adding New Pages

Create new files in `src/app/` following the Next.js App Router convention:
- `src/app/about/page.tsx` → `/about`
- `src/app/services/page.tsx` → `/services`

## Performance

- Lighthouse score target: 90+
- Core Web Vitals optimized
- Image optimization via Next.js Image component
- Font preloading for Plus Jakarta Sans
