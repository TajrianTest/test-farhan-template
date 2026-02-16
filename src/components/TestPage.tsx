import { contentType, Infer, damAssets } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import Header from './Header';
import Footer from './Footer';

/**
 * TestPage - Simple custom page type for testing
 * Now includes a contentReference field to USE the DAM fragments (workaround for SDK bug)
 */
export const TestPageContentType = contentType({
  key: 'TestPage',
  displayName: 'Test Page',
  baseType: '_page',
  properties: {
    pageTitle: {
      type: 'string',
      displayName: 'Page Title',
    },
    pageDescription: {
      type: 'string',
      displayName: 'Page Description',
    },
    heroImage: {
      type: 'contentReference',
      displayName: 'Hero Image (Optional)',
      allowedTypes: ['_image'],
    },
    mainContent: {
      type: 'richText',
      displayName: 'Main Content',
    },
  },
});

type TestPageProps = {
  opti: Infer<typeof TestPageContentType>;
};

export default function TestPage({ opti }: TestPageProps) {
  const { pa, src } = getPreviewUtils(opti);
  const { getSrcset, getAlt } = damAssets(opti);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 {...pa('pageTitle')} className="text-4xl font-bold mb-8 text-gray-900">
            {opti.pageTitle || 'Test Page'}
          </h1>

          {opti.pageDescription && (
            <p {...pa('pageDescription')} className="text-xl text-gray-600 mb-8">
              {opti.pageDescription}
            </p>
          )}

          {opti.heroImage && (
            <div {...pa('heroImage')} className="mb-8">
              <img
                src={src(opti.heroImage)}
                srcSet={getSrcset(opti.heroImage)}
                alt={getAlt(opti.heroImage, 'Hero image')}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}

          {opti.mainContent && (
            <div {...pa('mainContent')} className="prose max-w-none">
              {/* Rich text content will render here */}
              <div dangerouslySetInnerHTML={{ __html: opti.mainContent as any }} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
