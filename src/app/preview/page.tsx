import { GraphClient, type PreviewParams } from '@optimizely/cms-sdk';
import { OptimizelyComponent } from '@optimizely/cms-sdk/react/server';
import { PreviewComponent } from '@optimizely/cms-sdk/react/client';
import Script from 'next/script';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 * Preview route for live editing in Optimizely CMS
 * This route enables real-time preview of content changes in the Visual Builder
 */
export default async function PreviewPage({ searchParams }: Props) {
  // Check if CMS is configured
  if (!process.env.OPTIMIZELY_GRAPH_SINGLE_KEY) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">CMS Not Configured</h1>
          <p className="text-gray-700 mb-4">
            The preview route requires Optimizely CMS configuration.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
            <li>Copy <code className="bg-gray-100 px-1">.env.in</code> to <code className="bg-gray-100 px-1">.env.local</code></li>
            <li>Add your Optimizely CMS credentials</li>
            <li>Restart the development server</li>
          </ol>
          <p className="text-sm text-gray-500 mt-4">
            See <a href="https://github.com/episerver/content-js-sdk" className="text-blue-600 underline">documentation</a> for setup instructions.
          </p>
        </div>
      </div>
    );
  }

  try {
    // Initialize GraphClient
    const client = new GraphClient(process.env.OPTIMIZELY_GRAPH_SINGLE_KEY, {
      graphUrl: process.env.OPTIMIZELY_GRAPH_GATEWAY,
    });

    // Intercept the request method to log the actual query
    const originalRequest = (client as any).request.bind(client);
    (client as any).request = async (query: string, variables: any, previewToken?: string) => {
      console.log('[Preview] GraphQL Query:', query);
      console.log('[Preview] Variables:', JSON.stringify(variables, null, 2));
      console.log('[Preview] Preview Token:', previewToken ? 'Present' : 'Not present');
      return originalRequest(query, variables, previewToken);
    };

    // Log preview parameters for debugging
    const params = await searchParams;
    console.log('[Preview] Request params:', params);
    console.log('[Preview] Graph Gateway:', process.env.OPTIMIZELY_GRAPH_GATEWAY);

    // Fetch preview content
    const response = await client.getPreviewContent(params as PreviewParams);
    console.log('[Preview] Response received:', response ? 'Success' : 'Empty');

    return (
      <>
        {/* Communication injector script for Visual Builder integration */}
        <Script
          src={`${process.env.OPTIMIZELY_CMS_URL}/util/javascript/communicationinjector.js`}
        />

        {/* Preview component handles real-time updates */}
        <PreviewComponent />

        {/* Render the content */}
        <OptimizelyComponent opti={response} />
      </>
    );
  } catch (error) {
    // Log full error details to server console
    console.error('[Preview] Error occurred:', error);

    // Log GraphQL errors if present
    if (error && typeof error === 'object' && 'errors' in error) {
      console.error('[Preview] GraphQL errors:', JSON.stringify((error as any).errors, null, 2));
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Preview Error</h1>
          <p className="text-gray-700 mb-4">
            Unable to load preview content from CMS.
          </p>
          <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
            <p className="text-sm font-mono text-red-800">
              {error instanceof Error ? error.message : 'Unknown error'}
            </p>
            {error instanceof Error && error.stack && (
              <details className="mt-2">
                <summary className="cursor-pointer text-xs text-red-600">Stack trace</summary>
                <pre className="text-xs mt-2 overflow-auto text-gray-800">{error.stack}</pre>
              </details>
            )}
          </div>
          <div className="text-sm text-gray-600 space-y-2">
            <p className="font-semibold">Common causes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Invalid CMS credentials in .env.local</li>
              <li>CMS instance is not accessible</li>
              <li>Content does not exist in CMS</li>
              <li>Missing preview parameters (access via Visual Builder)</li>
            </ul>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            This route should be accessed through the Optimizely Visual Builder, not directly.
          </p>
        </div>
      </div>
    );
  }
}
