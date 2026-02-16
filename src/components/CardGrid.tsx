import { contentType, Infer, damAssets } from '@optimizely/cms-sdk';
import { getPreviewUtils, OptimizelyComponent } from '@optimizely/cms-sdk/react/server';

/**
 * Card content type for use within CardGrid
 */
export const CardContentType = contentType({
  key: 'Card',
  displayName: 'Card',
  baseType: '_component',
  properties: {
    title: {
      type: 'string',
      displayName: 'Title',
    },
    description: {
      type: 'string',
      displayName: 'Description',
    },
    image: {
      type: 'contentReference',
      displayName: 'Image',
      allowedTypes: ['_image'],
    },
    link: {
      type: 'string',
      displayName: 'Link URL',
    },
    linkText: {
      type: 'string',
      displayName: 'Link Text',
    },
  },
});

/**
 * CardGrid content type definition
 * A grid of cards with images and text
 */
export const CardGridContentType = contentType({
  key: 'CardGrid',
  displayName: 'Card Grid',
  baseType: '_component',
  properties: {
    heading: {
      type: 'string',
      displayName: 'Section Heading',
    },
    cards: {
      type: 'array',
      displayName: 'Cards',
      items: {
        type: 'content',
        allowedTypes: [CardContentType],
      },
    },
    columns: {
      type: 'string',
      displayName: 'Number of Columns',
      enum: [
        { value: '2', displayName: '2 Columns' },
        { value: '3', displayName: '3 Columns' },
        { value: '4', displayName: '4 Columns' },
      ],
    },
  },
  compositionBehaviors: ['sectionEnabled'],
});

type CardGridProps = {
  opti: Infer<typeof CardGridContentType>;
};

type CardProps = {
  opti: Infer<typeof CardContentType>;
};

/**
 * Individual Card component
 */
function Card({ opti }: CardProps) {
  const { pa, src } = getPreviewUtils(opti);
  const { getSrcset, getAlt } = damAssets(opti);

  const content = (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {opti.image && (
        <div className="aspect-video relative overflow-hidden">
          <img
            {...pa('image')}
            src={src(opti.image)}
            srcSet={getSrcset(opti.image)}
            alt={getAlt(opti.image, opti.title || 'Card image')}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {opti.title && (
          <h3
            {...pa('title')}
            className="text-xl font-semibold mb-2"
          >
            {opti.title}
          </h3>
        )}

        {opti.description && (
          <p
            {...pa('description')}
            className="text-gray-600 mb-4"
          >
            {opti.description}
          </p>
        )}

        {opti.link && opti.linkText && (
          <span
            {...pa('linkText')}
            className="text-primary font-medium hover:underline inline-flex items-center"
          >
            {opti.linkText}
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </span>
        )}
      </div>
    </div>
  );

  if (opti.link) {
    return (
      <a {...pa('link')} href={opti.link} className="block">
        {content}
      </a>
    );
  }

  return content;
}

/**
 * CardGrid component
 * Renders a responsive grid of cards
 */
export default function CardGrid({ opti }: CardGridProps) {
  const { pa } = getPreviewUtils(opti);

  // Determine grid columns class
  const getColumnsClass = () => {
    switch (opti.columns) {
      case '2':
        return 'md:grid-cols-2';
      case '4':
        return 'md:grid-cols-2 lg:grid-cols-4';
      case '3':
      default:
        return 'md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {opti.heading && (
          <h2
            {...pa('heading')}
            className="text-3xl font-bold mb-8 text-center"
          >
            {opti.heading}
          </h2>
        )}

        <div
          {...pa('cards')}
          className={`grid grid-cols-1 ${getColumnsClass()} gap-6`}
        >
          {(opti.cards ?? []).map((card, index) => (
            <OptimizelyComponent opti={card} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
