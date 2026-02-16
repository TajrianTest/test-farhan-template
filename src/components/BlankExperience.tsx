import { contentType, Infer } from '@optimizely/cms-sdk';
import { OptimizelyComponent } from '@optimizely/cms-sdk/react/server';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import Header from './Header';
import Footer from './Footer';

/**
 * BlankExperience content type definition
 * Default blank page type from Optimizely CMS
 */
export const BlankExperienceContentType = contentType({
  key: 'BlankExperience',
  displayName: 'Blank Experience',
  baseType: '_page',
  properties: {
    composition: {
      type: 'array',
      displayName: 'Composition',
      items: {
        type: 'content',
        allowedTypes: [], // Allow any content type
      },
    },
  },
});

type BlankExperienceProps = {
  opti: Infer<typeof BlankExperienceContentType>;
};

/**
 * BlankExperience component
 * Renders a blank page with optional composition
 */
export default function BlankExperience({ opti }: BlankExperienceProps) {
  const { pa } = getPreviewUtils(opti);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {opti.composition && opti.composition.length > 0 && (
          <div {...pa('composition')}>
            {opti.composition.map((item, index) => (
              <OptimizelyComponent key={index} opti={item} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
