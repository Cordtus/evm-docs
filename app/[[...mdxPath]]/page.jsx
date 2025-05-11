// app/[[...mdxPath]]/page.jsx
import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { useMDXComponents as getMDXComponents } from '../../mdx-components';

export const generateStaticParams = generateStaticParamsFor('mdxPath');

export async function generateMetadata(props) {
  try {
    const params = await props.params;
    if (!params?.mdxPath) {
      return { title: 'Page', description: '' };
    }
    
    const result = await importPage(params.mdxPath);
    const metadata = result?.metadata || {};
    
    return {
      title: metadata.title || 'Page',
      description: metadata.description || '',
      ...metadata
    };
  } catch (error) {
    console.warn('Error generating metadata:', error);
    return { title: 'Page', description: '' };
  }
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page(props) {
  try {
    const params = await props.params;
    
    if (!params?.mdxPath) {
      return <div>Page not found</div>;
    }
    
    const result = await importPage(params.mdxPath);
    
    if (!result) {
      return <div>Page content not found</div>;
    }
    
    const { default: MDXContent, toc, metadata: rawMetadata } = result;

    // Create a safe metadata object
    const safeMetadata = {
      title: rawMetadata?.title || '',
      description: rawMetadata?.description || '',
      data: (rawMetadata?.data && typeof rawMetadata.data === 'object') ? rawMetadata.data : {},
      endpoints: Array.isArray(rawMetadata?.endpoints) ? rawMetadata.endpoints : [],
      // Spread any other properties
      ...(rawMetadata || {})
    };

    // Ensure the metadata structure is consistent
    if (!safeMetadata.data) safeMetadata.data = {};
    if (!safeMetadata.endpoints) safeMetadata.endpoints = [];

    return (
      <Wrapper toc={toc} metadata={safeMetadata}>
        <MDXContent {...props} params={params} />
      </Wrapper>
    );
  } catch (error) {
    console.error('Error rendering page:', params, error);
    
    // Provide a more informative fallback
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h1 className="text-red-800 font-bold text-lg mb-2">Page Error</h1>
          <p className="text-red-700">
            There was an error loading this page. Please check the console for more details.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-3 text-xs text-red-600 overflow-auto">
              {error.toString()}
            </pre>
          )}
        </div>
      </div>
    );
  }
}