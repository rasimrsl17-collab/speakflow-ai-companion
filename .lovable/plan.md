

## Plan: Add New Sections to Landing Page

### Changes — all in `src/pages/Landing.tsx`

**1. Announcement Bar** (top of page, above nav)
- Dismissible banner with `useState` for visibility
- Gradient purple-to-transparent background, centered text with party emoji, X close button
- When dismissed, navbar stays at `top-0`; when visible, push nav down with `top-10` or similar

**2. Logos Bar** (after hero section, before "How it works")
- "Trusted by learners from" centered text
- Row of grey placeholder text logos: Harvard, Google, ASAN, Türk Telekom in muted grey, evenly spaced

**3. Comparison Section** (after features grid, before social proof)
- Title "Not Another Duolingo Clone"
- Responsive table with 6 feature rows and 3 columns (SpeakFlow AI, Traditional Apps, Human Tutors)
- Green `Check` icons for SpeakFlow (all 6), red `X` icons for Traditional Apps (mostly X, 1-2 checks), mixed for Human Tutors
- Human Tutors column header includes "$30-50/hour" note

**4. FAQ Section** (after pricing, before CTA/footer)
- Uses existing `Accordion` component from `src/components/ui/accordion.tsx`
- 6 FAQ items with the specified Q&A content

**5. CTA Banner** (between FAQ and footer)
- Full-width glassmorphism card with gradient purple background
- "Ready to Start Speaking?" headline, subtitle, white CTA button

**6. Updated Footer**
- Replace simple footer with 4-column grid: Product, Company, Legal, Connect
- Keep logo + language switcher
- Add "Built with ❤️ in Baku" centered bottom text

### New imports needed
- `X` from lucide-react (for close button and comparison X marks)
- `Accordion, AccordionItem, AccordionTrigger, AccordionContent` from UI components

### No other files need changes.

