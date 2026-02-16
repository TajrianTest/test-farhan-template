import { contentType, Infer, damAssets } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import Link from 'next/link';

/**
 * BrandPortalPage - Homepage for brand portal with hero, featured sections, and assets
 */
export const BrandPortalPageContentType = contentType({
  key: 'BrandPortalPage',
  displayName: 'Brand Portal Page',
  baseType: '_page',
  properties: {
    // Hero Section
    heroTitle: {
      type: 'string',
      displayName: 'Hero Title',
    },
    heroSubtitle: {
      type: 'string',
      displayName: 'Hero Subtitle',
    },
    heroImage: {
      type: 'contentReference',
      displayName: 'Hero Background Image',
      allowedTypes: ['_image'],
    },

    // Quick Links Section
    quickLinksTitle: {
      type: 'string',
      displayName: 'Quick Links Section Title',
    },
    quickLink1Title: {
      type: 'string',
      displayName: 'Quick Link 1 Title',
    },
    quickLink1Url: {
      type: 'string',
      displayName: 'Quick Link 1 URL',
    },
    quickLink1Icon: {
      type: 'contentReference',
      displayName: 'Quick Link 1 Icon',
      allowedTypes: ['_image'],
    },
    quickLink2Title: {
      type: 'string',
      displayName: 'Quick Link 2 Title',
    },
    quickLink2Url: {
      type: 'string',
      displayName: 'Quick Link 2 URL',
    },
    quickLink2Icon: {
      type: 'contentReference',
      displayName: 'Quick Link 2 Icon',
      allowedTypes: ['_image'],
    },
    quickLink3Title: {
      type: 'string',
      displayName: 'Quick Link 3 Title',
    },
    quickLink3Url: {
      type: 'string',
      displayName: 'Quick Link 3 URL',
    },
    quickLink3Icon: {
      type: 'contentReference',
      displayName: 'Quick Link 3 Icon',
      allowedTypes: ['_image'],
    },

    // Featured Assets Section
    featuredAssetsTitle: {
      type: 'string',
      displayName: 'Featured Assets Section Title',
    },
    asset1Title: {
      type: 'string',
      displayName: 'Asset 1 Title',
    },
    asset1Description: {
      type: 'string',
      displayName: 'Asset 1 Description',
    },
    asset1Image: {
      type: 'contentReference',
      displayName: 'Asset 1 Preview Image',
      allowedTypes: ['_image'],
    },
    asset2Title: {
      type: 'string',
      displayName: 'Asset 2 Title',
    },
    asset2Description: {
      type: 'string',
      displayName: 'Asset 2 Description',
    },
    asset2Image: {
      type: 'contentReference',
      displayName: 'Asset 2 Preview Image',
      allowedTypes: ['_image'],
    },
    asset3Title: {
      type: 'string',
      displayName: 'Asset 3 Title',
    },
    asset3Description: {
      type: 'string',
      displayName: 'Asset 3 Description',
    },
    asset3Image: {
      type: 'contentReference',
      displayName: 'Asset 3 Preview Image',
      allowedTypes: ['_image'],
    },

    // About Section
    aboutTitle: {
      type: 'string',
      displayName: 'About Section Title',
    },
    aboutContent: {
      type: 'richText',
      displayName: 'About Content',
    },
  },
});

type BrandPortalPageProps = {
  opti: Infer<typeof BrandPortalPageContentType>;
};

export default function BrandPortalPage({ opti }: BrandPortalPageProps) {
  const { pa, src } = getPreviewUtils(opti);
  const { getSrcset, getAlt } = damAssets(opti);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-blue-900 to-blue-700">
        {opti.heroImage && (
          <div className="absolute inset-0 opacity-30">
            <img
              {...pa('heroImage')}
              src={src(opti.heroImage)}
              srcSet={getSrcset(opti.heroImage)}
              alt={getAlt(opti.heroImage, 'Hero background')}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1
            {...pa('heroTitle')}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            {opti.heroTitle || 'Brand Portal'}
          </h1>
          <p
            {...pa('heroSubtitle')}
            className="text-xl md:text-2xl text-white/90 max-w-2xl"
          >
            {opti.heroSubtitle || 'Access brand guidelines, assets, and resources'}
          </p>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2
            {...pa('quickLinksTitle')}
            className="text-3xl font-bold text-gray-900 mb-10 text-center"
          >
            {opti.quickLinksTitle || 'Quick Links'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Link 1 */}
            {opti.quickLink1Title && (
              <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                {opti.quickLink1Icon && (
                  <div {...pa('quickLink1Icon')} className="mb-4">
                    <img
                      src={src(opti.quickLink1Icon)}
                      alt={getAlt(opti.quickLink1Icon, 'Icon')}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                )}
                <h3 {...pa('quickLink1Title')} className="text-xl font-bold text-gray-900 mb-2">
                  {opti.quickLink1Title}
                </h3>
                {opti.quickLink1Url && (
                  <Link
                    href={opti.quickLink1Url}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Learn more →
                  </Link>
                )}
              </div>
            )}

            {/* Quick Link 2 */}
            {opti.quickLink2Title && (
              <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                {opti.quickLink2Icon && (
                  <div {...pa('quickLink2Icon')} className="mb-4">
                    <img
                      src={src(opti.quickLink2Icon)}
                      alt={getAlt(opti.quickLink2Icon, 'Icon')}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                )}
                <h3 {...pa('quickLink2Title')} className="text-xl font-bold text-gray-900 mb-2">
                  {opti.quickLink2Title}
                </h3>
                {opti.quickLink2Url && (
                  <Link
                    href={opti.quickLink2Url}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Learn more →
                  </Link>
                )}
              </div>
            )}

            {/* Quick Link 3 */}
            {opti.quickLink3Title && (
              <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                {opti.quickLink3Icon && (
                  <div {...pa('quickLink3Icon')} className="mb-4">
                    <img
                      src={src(opti.quickLink3Icon)}
                      alt={getAlt(opti.quickLink3Icon, 'Icon')}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                )}
                <h3 {...pa('quickLink3Title')} className="text-xl font-bold text-gray-900 mb-2">
                  {opti.quickLink3Title}
                </h3>
                {opti.quickLink3Url && (
                  <Link
                    href={opti.quickLink3Url}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Learn more →
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Assets Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2
            {...pa('featuredAssetsTitle')}
            className="text-3xl font-bold text-gray-900 mb-10 text-center"
          >
            {opti.featuredAssetsTitle || 'Featured Assets'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Asset 1 */}
            {opti.asset1Title && (
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                {opti.asset1Image && (
                  <div {...pa('asset1Image')} className="h-48 bg-gray-200">
                    <img
                      src={src(opti.asset1Image)}
                      srcSet={getSrcset(opti.asset1Image)}
                      alt={getAlt(opti.asset1Image, opti.asset1Title)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 {...pa('asset1Title')} className="text-xl font-bold text-gray-900 mb-2">
                    {opti.asset1Title}
                  </h3>
                  <p {...pa('asset1Description')} className="text-gray-600 mb-4">
                    {opti.asset1Description}
                  </p>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Download →
                  </button>
                </div>
              </div>
            )}

            {/* Asset 2 */}
            {opti.asset2Title && (
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                {opti.asset2Image && (
                  <div {...pa('asset2Image')} className="h-48 bg-gray-200">
                    <img
                      src={src(opti.asset2Image)}
                      srcSet={getSrcset(opti.asset2Image)}
                      alt={getAlt(opti.asset2Image, opti.asset2Title)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 {...pa('asset2Title')} className="text-xl font-bold text-gray-900 mb-2">
                    {opti.asset2Title}
                  </h3>
                  <p {...pa('asset2Description')} className="text-gray-600 mb-4">
                    {opti.asset2Description}
                  </p>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Download →
                  </button>
                </div>
              </div>
            )}

            {/* Asset 3 */}
            {opti.asset3Title && (
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                {opti.asset3Image && (
                  <div {...pa('asset3Image')} className="h-48 bg-gray-200">
                    <img
                      src={src(opti.asset3Image)}
                      srcSet={getSrcset(opti.asset3Image)}
                      alt={getAlt(opti.asset3Image, opti.asset3Title)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 {...pa('asset3Title')} className="text-xl font-bold text-gray-900 mb-2">
                    {opti.asset3Title}
                  </h3>
                  <p {...pa('asset3Description')} className="text-gray-600 mb-4">
                    {opti.asset3Description}
                  </p>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Download →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      {opti.aboutTitle && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2
              {...pa('aboutTitle')}
              className="text-3xl font-bold text-gray-900 mb-6 text-center"
            >
              {opti.aboutTitle}
            </h2>
            {opti.aboutContent && (
              <div
                {...pa('aboutContent')}
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: opti.aboutContent as any }}
              />
            )}
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="py-12 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-white/90 mb-6">
            Contact our brand team for assistance with using our brand assets
          </p>
          <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}
