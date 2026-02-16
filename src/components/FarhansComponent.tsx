import { contentType, Infer } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';

/**
 * FarhansComponent - Test component to verify CLI push
 */
export const FarhansComponentContentType = contentType({
  key: 'FarhansComponent',
  displayName: 'Farhans Component',
  baseType: '_component',
  properties: {
    testTitle: {
      type: 'string',
      displayName: 'Test Title',
    },
    testDescription: {
      type: 'string',
      displayName: 'Test Description',
    },
    customField: {
      type: 'string',
      displayName: 'Custom Field',
    },
  },
});

type FarhansComponentProps = {
  opti: Infer<typeof FarhansComponentContentType>;
};

export default function FarhansComponent({ opti }: FarhansComponentProps) {
  const { pa } = getPreviewUtils(opti);

  return (
    <div className="p-8 bg-blue-100 border-2 border-blue-500 rounded-lg">
      <h2 {...pa('testTitle')} className="text-2xl font-bold text-blue-900 mb-4">
        {opti.testTitle || 'Farhan\'s Test Component'}
      </h2>
      <p {...pa('testDescription')} className="text-blue-800 mb-2">
        {opti.testDescription || 'This is a test component to verify CLI push works'}
      </p>
      <p {...pa('customField')} className="text-blue-700 text-sm">
        {opti.customField || 'Custom field value'}
      </p>
    </div>
  );
}
