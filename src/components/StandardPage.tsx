import { contentType, Infer } from '@optimizely/cms-sdk';
import { OptimizelyComponent } from '@optimizely/cms-sdk/react/server';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import Header from './Header';
import Footer from './Footer';
import { HeroContentType } from './Hero';
import { TextBlockContentType } from './TextBlock';
import { ImageBlockContentType } from './ImageBlock';
import { CardGridContentType } from './CardGrid';

/**
 * StandardPage content type definition
 * A standard page that can contain multiple content blocks
 */
export const StandardPageContentType = contentType({
  key: 'StandardPage',
  displayName: 'Standard Page',
  baseType: '_page',
  properties: {
    title: {
      type: 'string',
      displayName: 'Page Title',
    },
    subtitle: {
      type: 'string',
      displayName: 'Subtitle',
    },
    contentArea: {
      type: 'array',
      displayName: 'Content Area',
      items: {
        type: 'content',
        allowedTypes: [HeroContentType, TextBlockContentType, ImageBlockContentType, CardGridContentType],
      },
    },
    showHeader: {
      type: 'boolean',
      displayName: 'Show Header',
    },
    showFooter: {
      type: 'boolean',
      displayName: 'Show Footer',
    },
    metaTitle: {
      type: 'string',
      displayName: 'Meta Title',
    },
    metaDescription: {
      type: 'string',
      displayName: 'Meta Description',
    },
  },
});

type StandardPageProps = {
  opti: Infer<typeof StandardPageContentType>;
};

/**
 * StandardPage component
 * Renders a standard page with header, footer, and content area
 */
export default function StandardPage({ opti }: StandardPageProps) {
  const { pa } = getPreviewUtils(opti);

  // Default to showing header and footer if not specified
  const showHeader = opti.showHeader ?? true;
  const showFooter = opti.showFooter ?? true;

  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && <Header />}

      <main className="flex-grow">
        {/* Page Title Section */}
        {(opti.title || opti.subtitle) && (
          <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-4 text-center">
              {opti.title && (
                <h1
                  {...pa('title')}
                  className="text-4xl md:text-5xl font-bold mb-4"
                >
                  {opti.title}
                </h1>
              )}
              {opti.subtitle && (
                <p
                  {...pa('subtitle')}
                  className="text-xl text-gray-600 max-w-2xl mx-auto"
                >
                  {opti.subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Content Area */}
        {opti.contentArea && opti.contentArea.length > 0 && (
          <div {...pa('contentArea')}>
            {opti.contentArea.map((item, index) => (
              <OptimizelyComponent key={index} opti={item} />
            ))}
          </div>
        )}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}
