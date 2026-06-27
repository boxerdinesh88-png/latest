# Setup Instructions

## Getting Started

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages:
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

### Step 2: Start Development Server

```bash
npm run dev
```

Your portfolio will open at `http://localhost:3000`

### Step 3: Customize Your Content

Edit `src/data/portfolio.json` and replace the placeholder data with your information.

### Step 4: Customize Design (Optional)

#### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: '#0F172A',      // Main background
  secondary: '#1E293B',    // Secondary background
  accent: '#8B5CF6',       // Primary accent (purple)
  'accent-light': '#A78BFA', // Light accent
}
```

#### Change Fonts

Edit `tailwind.config.ts`:

```typescript
fontFamily: {
  display: ['Your Font', 'fallback'],
  sans: ['Your Font', 'fallback'],
  mono: ['Your Font', 'fallback'],
}
```

Then add the font import to `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;600;700&display=swap');
```

### Step 5: Test Dark Mode

Click the moon/sun icon in the top-right corner to toggle dark mode.

### Step 6: Mobile Testing

Open DevTools (F12) and toggle device toolbar to test on mobile sizes.

### Step 7: Build for Production

```bash
npm run build
```

This creates optimized files in the `dist/` folder.

## Customization Checklist

### Profile Section
- [ ] Update name and shortName
- [ ] Change tagline
- [ ] Update job title and specialization
- [ ] Update bio
- [ ] Update social links (GitHub, LinkedIn, email, phone)

### Skills Section
- [ ] Review skill categories
- [ ] Update skills with your proficiencies
- [ ] Set correct levels (Expert, Advanced, etc.)
- [ ] Add/remove categories as needed

### Experience Section
- [ ] Add your work experience
- [ ] Update company names and roles
- [ ] Set correct dates
- [ ] Add quantified achievements
- [ ] Update locations

### Projects Section
- [ ] Add your best 4-6 projects
- [ ] Include project links and GitHub URLs
- [ ] Set accurate technology stacks
- [ ] Write compelling descriptions
- [ ] Add project highlights
- [ ] Mark featured projects

### Education Section
- [ ] Update institutions
- [ ] Add degrees and fields
- [ ] Include GPA if 3.5+
- [ ] Add relevant details

### Certifications Section
- [ ] Add your certifications
- [ ] Include issuer and date
- [ ] Add credential links if available

### Achievements Section
- [ ] List awards and recognitions
- [ ] Add dates
- [ ] Include descriptions

### Contact Section
- [ ] Verify email address
- [ ] Add phone number
- [ ] Confirm all links work

## Environment Setup

### Node.js Version

Requires Node.js 16 or higher:

```bash
node --version  # Check your version
```

### Optional: Environment Variables

Create `.env` file for any API keys or configuration:

```
VITE_API_URL=https://api.example.com
VITE_GA_ID=google-analytics-id
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## Common Issues

### Port 3000 Already in Use

```bash
npm run dev -- --port 3001
```

### Module Not Found

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Fails

```bash
npm run build
```

Check for TypeScript errors in console.

## Deployment Setup

### Vercel (Recommended)

1. Push to GitHub
2. Go to vercel.com
3. Import project
4. Deploy

### Netlify

1. Push to GitHub
2. Go to netlify.com
3. Connect GitHub
4. Deploy

### GitHub Pages

Add to `package.json`:
```json
"homepage": "https://username.github.io/portfolio"
```

Then run:
```bash
npm run build
npm run deploy
```

## Performance Optimization

### Image Optimization

```bash
# Install sharp for image processing
npm install --save-dev sharp
```

### Bundle Analysis

```bash
# Check bundle size
npm run build

# Use source-map-explorer
npm install --save-dev source-map-explorer
```

## Monitoring & Analytics

### Add Google Analytics (Optional)

1. Get GA ID from Google Analytics
2. Add to `.env`: `VITE_GA_ID=G-XXXXXXXXXX`
3. Add GA script to `index.html`

### Monitor Performance

Use Lighthouse:
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Run audit
4. Target: >90 on all metrics

## Backup & Version Control

### Initialize Git

```bash
git init
git add .
git commit -m "Initial commit: Portfolio setup"
```

### Push to GitHub

```bash
git remote add origin https://github.com/username/portfolio
git branch -M main
git push -u origin main
```

## Maintenance

### Regular Updates

- Update content quarterly
- Keep dependencies up to date: `npm update`
- Monitor performance metrics
- Test regularly

### Dependency Updates

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Major version updates
npm install react@latest
```

## Support Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)
- [Framer Motion](https://www.framer.com/motion)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

**Questions?** Check the README.md and CUSTOMIZATION.md files for more details.
