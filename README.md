# Corporate Portal Template

A Next.js 15-based brand portal template integrated with Optimizely CMS and DAM.

## Features

- ✅ Next.js 15 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Optimizely CMS SDK integration
- ✅ Live preview support
- ✅ DAM asset integration
- ✅ Brand customization system
- ✅ Responsive design

## Getting Started

### Prerequisites

- Node.js 20+
- PNPM 10+
- Optimizely CMS instance
- Optimizely DAM instance

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Create environment files:

**`.env.local`** (for Next.js):
```env
OPTIMIZELY_GRAPH_SINGLE_KEY=your_key_here
OPTIMIZELY_GRAPH_GATEWAY=https://cg.optimizely.com/content/v2
OPTIMIZELY_CMS_URL=https://your-instance.cms.optimizely.com
OPTIMIZELY_CMS_CLIENT_ID=your_client_id
OPTIMIZELY_CMS_CLIENT_SECRET=your_client_secret
APPLICATION_HOST=http://localhost:22222
PORT=22222
NEXT_PUBLIC_SITE_NAME=Brand Portal
```

**`.env`** (for Optimizely CLI - CLI can't read .env.local):
```env
OPTIMIZELY_CMS_CLIENT_ID=your_client_id
OPTIMIZELY_CMS_CLIENT_SECRET=your_client_secret
OPTIMIZELY_CMS_URL=https://your-instance.cms.optimizely.com
OPTIMIZELY_GRAPH_SINGLE_KEY=your_key_here
OPTIMIZELY_GRAPH_GATEWAY=https://cg.optimizely.com/content/v2
APPLICATION_HOST=http://localhost:22222
```

### Development

Start the development server:
```bash
pnpm dev
```

Open [http://localhost:22222](http://localhost:22222) in your browser.

**Note**: The dev server runs on port 22222 by default (configured in `package.json` and `APPLICATION_HOST`).

### Pushing Content Types to CMS

Deploy content types to your Optimizely CMS instance:
```bash
pnpm opti-push
```

This command reads `optimizely.config.mjs` and pushes all content type definitions to the CMS.

## Brand Customization

Edit `brand.config.ts` to customize your portal:

```typescript
export const brandConfig: BrandConfig = {
  branding: {
    name: 'Your Company Name',
    logo: '/branding/logo.svg',
    colors: {
      primary: '#0066cc',    // Change to your brand color
      secondary: '#333333',
      accent: '#ff6600',
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
    },
  },
  layout: {
    headerStyle: 'modern',  // 'classic' | 'modern' | 'minimal'
    footerStyle: 'detailed', // 'simple' | 'detailed'
  },
};
```

Replace brand assets:
- Logo: `public/branding/logo.svg`
- Favicon: `public/branding/favicon.ico`

## Creating Components

Components with Optimizely CMS content types:

1. Create a component file in `src/components/`:
```typescript
// src/components/MyComponent.tsx
import { contentType, Infer } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';

export const MyComponentContentType = contentType({
  key: 'MyComponent',
  displayName: 'My Component',
  baseType: '_component',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
  },
});

type Props = {
  opti: Infer<typeof MyComponentContentType>;
};

export default function MyComponent({ opti }: Props) {
  const { pa } = getPreviewUtils(opti);

  return (
    <div>
      <h2 {...pa('title')}>{opti.title}</h2>
      <p {...pa('description')}>{opti.description}</p>
    </div>
  );
}
```

2. Register in `src/app/layout.tsx`:
```typescript
import MyComponent, { MyComponentContentType } from '@/components/MyComponent';

initContentTypeRegistry([
  MyComponentContentType,
  // ...
]);

initReactComponentRegistry({
  resolver: {
    MyComponent,
    // ...
  },
});
```

3. Update `optimizely.config.mjs` if needed

4. Push to CMS:
```bash
pnpm opti-push
```

## DAM Integration

Use DAM assets in components:

```typescript
import { damAssets } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';

export default function ImageComponent({ opti }: Props) {
  const { pa, src } = getPreviewUtils(opti);
  const { getSrcset, getAlt } = damAssets(opti);

  return (
    <img
      {...pa('image')}
      src={src(opti.image)}
      srcSet={getSrcset(opti.image)}
      alt={getAlt(opti.image, 'Fallback alt text')}
    />
  );
}
```

### ⚠️ SDK Bug Workaround (v0.1.0-alpha.16)

**Issue**: When DAM is enabled in Content Graph, the SDK automatically adds DAM asset fragments to ALL queries, even when content types don't use them. Content Graph's strict fragment validation rejects queries with unused fragments, causing preview and content fetching to fail with "Unknown type" errors.

**Workaround**: Ensure every `_page` content type includes at least one `contentReference` field. This makes the DAM fragments "used" instead of "unused", satisfying Content Graph's validation.

**Example**:
```typescript
export const MyPageContentType = contentType({
  key: 'MyPage',
  baseType: '_page',
  properties: {
    title: { type: 'string' },
    // ⚠️ REQUIRED: Add at least one contentReference to avoid SDK bug
    heroImage: {
      type: 'contentReference',
      displayName: 'Hero Image (Optional)',
      allowedTypes: ['_image'],
    },
    content: { type: 'richText' },
  },
});
```

See `/tmp/SDK_BUG_ISSUE.md` for detailed bug report and reproduction steps.

## Live Preview

The preview route at `/preview` enables live editing in Optimizely Visual Builder.

Configure in CMS:
1. Go to Settings → Websites
2. Add hostname: `http://localhost:22222`
3. Set preview URL with template variables:
   ```
   {host}/preview?key={key}&ver={version}&loc={locale}&ctx={context}
   ```
   The CMS replaces these placeholders when launching preview
4. Enable "Use Preview Tokens"

**Note**: We use HTTP (not HTTPS) for local development to avoid self-signed certificate issues.

## Building for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout + CMS registries
│   ├── page.tsx                # Home page (static, not CMS-connected)
│   ├── [...slug]/page.tsx      # Dynamic CMS pages
│   ├── preview/page.tsx        # Preview mode for Visual Builder
│   └── globals.css             # Global styles
├── components/
│   ├── Header.tsx              # Site header
│   ├── Footer.tsx              # Site footer
│   ├── Navigation.tsx          # Navigation component
│   ├── TestPage.tsx            # Example page component
│   ├── BrandPortalPage.tsx     # Brand portal homepage component
│   └── FarhansComponent.tsx    # Example block component
└── lib/                        # Utilities and helpers

brand.config.ts                 # Brand customization
optimizely.config.mjs           # CMS CLI configuration
.env.local                      # Next.js environment variables
.env                            # CLI environment variables
```

## Known Issues

### SDK v0.1.0-alpha.16 DAM Fragment Bug

When DAM is enabled in Content Graph, the SDK adds DAM fragments to all queries even when not needed, causing validation errors. **Workaround**: Include at least one `contentReference` field in every `_page` content type.

See the "DAM Integration" section above for details and `/tmp/SDK_BUG_ISSUE.md` for the full bug report.

## Components

### Current Components

- **TestPage** - Simple page for testing (includes `heroImage` contentReference as SDK bug workaround)
- **BrandPortalPage** - Brand portal homepage with hero, quick links, featured assets, and about sections
- **FarhansComponent** - Example block component
- **Header** - Site navigation header
- **Footer** - Site footer
- **Navigation** - Navigation menu component

All page components include at least one `contentReference` field to work around the SDK bug.

## Learn More

- [Optimizely CMS SDK Documentation](https://github.com/episerver/content-js-sdk)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [SDK Bug Report](/tmp/SDK_BUG_ISSUE.md)
