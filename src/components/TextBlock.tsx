import { contentType, Infer } from '@optimizely/cms-sdk';
import { RichText } from '@optimizely/cms-sdk/react/richText';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';

/**
 * TextBlock content type definition
 * A flexible text content block with heading and rich text body
 */
export const TextBlockContentType = contentType({
  key: 'TextBlock',
  displayName: 'Text Block',
  baseType: '_component',
  properties: {
    heading: {
      type: 'string',
      displayName: 'Heading',
    },
    body: {
      type: 'richText',
      displayName: 'Body Text',
    },
    alignment: {
      type: 'string',
      displayName: 'Text Alignment',
      enum: [
        { value: 'left', displayName: 'Left' },
        { value: 'center', displayName: 'Center' },
        { value: 'right', displayName: 'Right' },
      ],
    },
    containerWidth: {
      type: 'string',
      displayName: 'Container Width',
      enum: [
        { value: 'narrow', displayName: 'Narrow (prose width)' },
        { value: 'medium', displayName: 'Medium (default)' },
        { value: 'wide', displayName: 'Wide (full width)' },
      ],
    },
  },
  compositionBehaviors: ['sectionEnabled'],
});

type TextBlockProps = {
  opti: Infer<typeof TextBlockContentType>;
};

/**
 * TextBlock component
 * Renders a text section with optional heading and rich text content
 */
export default function TextBlock({ opti }: TextBlockProps) {
  const { pa } = getPreviewUtils(opti);

  // Determine container width class
  const getWidthClass = () => {
    switch (opti.containerWidth) {
      case 'narrow':
        return 'max-w-2xl';
      case 'wide':
        return 'max-w-7xl';
      case 'medium':
      default:
        return 'max-w-4xl';
    }
  };

  // Determine alignment class
  const getAlignmentClass = () => {
    switch (opti.alignment) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      case 'left':
      default:
        return 'text-left';
    }
  };

  return (
    <section className="py-12">
      <div className={`container mx-auto px-4`}>
        <div className={`${getWidthClass()} mx-auto ${getAlignmentClass()}`}>
          {opti.heading && (
            <h2
              {...pa('heading')}
              className="text-3xl font-bold mb-6"
            >
              {opti.heading}
            </h2>
          )}

          {opti.body && (
            <div
              {...pa('body')}
              className="prose prose-lg max-w-none"
            >
              <RichText content={opti.body?.json} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
