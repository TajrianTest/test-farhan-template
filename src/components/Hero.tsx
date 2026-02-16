import { contentType, Infer, damAssets } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';

/**
 * Hero content type definition
 * A large banner component with heading, summary, background image, and theme
 */
export const HeroContentType = contentType({
  key: 'Hero',
  displayName: 'Hero Banner',
  baseType: '_component',
  properties: {
    heading: {
      type: 'string',
      displayName: 'Heading',
    },
    summary: {
      type: 'string',
      displayName: 'Summary',
    },
    background: {
      type: 'contentReference',
      displayName: 'Background Image',
      allowedTypes: ['_image'],
    },
    ctaText: {
      type: 'string',
      displayName: 'CTA Button Text',
    },
    ctaLink: {
      type: 'string',
      displayName: 'CTA Link',
    },
    theme: {
      type: 'string',
      displayName: 'Theme',
      enum: [
        { value: 'light', displayName: 'Light' },
        { value: 'dark', displayName: 'Dark' },
      ],
    },
  },
  compositionBehaviors: ['sectionEnabled'],
});

type HeroProps = {
  opti: Infer<typeof HeroContentType>;
};

/**
 * Hero component
 * Renders a full-width hero banner with background image and CTA
 */
export default function Hero({ opti }: HeroProps) {
  const { pa, src } = getPreviewUtils(opti);
  const { getSrcset, getAlt } = damAssets(opti);

  const isDark = opti.theme === 'dark';

  return (
    <section className={`relative min-h-[500px] flex items-center justify-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
      {/* Background Image */}
      {opti.background && (
        <div className="absolute inset-0 z-0">
          <img
            {...pa('background')}
            src={src(opti.background)}
            srcSet={getSrcset(opti.background)}
            alt={getAlt(opti.background, 'Hero background')}
            className="w-full h-full object-cover"
          />
          {/* Overlay for better text readability */}
          <div className={`absolute inset-0 ${isDark ? 'bg-black/50' : 'bg-white/30'}`} />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {opti.heading && (
          <h1
            {...pa('heading')}
            className="text-5xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto"
          >
            {opti.heading}
          </h1>
        )}

        {opti.summary && (
          <p
            {...pa('summary')}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90"
          >
            {opti.summary}
          </p>
        )}

        {opti.ctaText && opti.ctaLink && (
          <a
            {...pa('ctaLink')}
            href={opti.ctaLink}
            className={`inline-block px-8 py-4 text-lg font-semibold rounded-lg transition-all ${
              isDark
                ? 'bg-white text-gray-900 hover:bg-gray-100'
                : 'bg-primary text-white hover:bg-opacity-90'
            }`}
          >
            <span {...pa('ctaText')}>{opti.ctaText}</span>
          </a>
        )}
      </div>
    </section>
  );
}
