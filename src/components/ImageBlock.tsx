import { contentType, Infer, damAssets } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import Image from 'next/image';

/**
 * ImageBlock content type definition
 * An image block with caption, alt text, and layout options
 * Demonstrates DAM integration
 */
export const ImageBlockContentType = contentType({
  key: 'ImageBlock',
  displayName: 'Image Block',
  baseType: '_component',
  properties: {
    image: {
      type: 'contentReference',
      displayName: 'Image',
      allowedTypes: ['_image'],
    },
    caption: {
      type: 'string',
      displayName: 'Caption',
    },
    imageSize: {
      type: 'string',
      displayName: 'Image Size',
      enum: [
        { value: 'small', displayName: 'Small' },
        { value: 'medium', displayName: 'Medium' },
        { value: 'large', displayName: 'Large' },
        { value: 'full', displayName: 'Full Width' },
      ],
    },
    alignment: {
      type: 'string',
      displayName: 'Alignment',
      enum: [
        { value: 'left', displayName: 'Left' },
        { value: 'center', displayName: 'Center' },
        { value: 'right', displayName: 'Right' },
      ],
    },
    enableZoom: {
      type: 'boolean',
      displayName: 'Enable Zoom on Hover',
    },
  },
  compositionBehaviors: ['sectionEnabled'],
});

type ImageBlockProps = {
  opti: Infer<typeof ImageBlockContentType>;
};

/**
 * ImageBlock component
 * Renders an image from DAM with responsive sizing and optional caption
 */
export default function ImageBlock({ opti }: ImageBlockProps) {
  const { pa, src } = getPreviewUtils(opti);
  const { getSrcset, getAlt } = damAssets(opti);

  if (!opti.image) {
    return null;
  }

  // Determine container width based on size
  const getSizeClass = () => {
    switch (opti.imageSize) {
      case 'small':
        return 'max-w-md';
      case 'medium':
        return 'max-w-2xl';
      case 'large':
        return 'max-w-4xl';
      case 'full':
      default:
        return 'max-w-7xl';
    }
  };

  // Determine alignment class
  const getAlignmentClass = () => {
    switch (opti.alignment) {
      case 'center':
        return 'mx-auto';
      case 'right':
        return 'ml-auto';
      case 'left':
      default:
        return 'mr-auto';
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className={`${getSizeClass()} ${getAlignmentClass()}`}>
          <div
            className={`relative overflow-hidden rounded-lg ${
              opti.enableZoom ? 'group' : ''
            }`}
          >
            <img
              {...pa('image')}
              src={src(opti.image)}
              srcSet={getSrcset(opti.image)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              alt={getAlt(opti.image, opti.caption || 'Image')}
              className={`w-full h-auto ${
                opti.enableZoom
                  ? 'transition-transform duration-300 group-hover:scale-105'
                  : ''
              }`}
            />
          </div>

          {opti.caption && (
            <p
              {...pa('caption')}
              className="mt-4 text-sm text-gray-600 italic text-center"
            >
              {opti.caption}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
