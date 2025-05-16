// app/[[...mdxPath]]/page.jsx
import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { useMDXComponents } from '../../mdx-components';
import { notFound } from 'next/navigation';

export const generateStaticParams = generateStaticParamsFor();

export async function generateMetadata(props) {
  const params = await props.params;
  try {
    const { metadata = {} } = await importPage(params.mdxPath);
    return metadata;
  } catch (error) {
    // log errors, excluding 404
    if (error.code !== 'MODULE_NOT_FOUND') {
      console.error('Metadata generation error:', error);
    }
    return { title: 'Cosmos EVM Documentation' };
  }
}

export default async function Page(props) {
  const params = await props.params;
  
  try {
    const { default: MDXContent, toc, metadata } = await importPage(params.mdxPath);
    const Wrapper = useMDXComponents().wrapper;
    
    return (
      <Wrapper toc={toc} metadata={metadata}>
        <MDXContent {...props} />
      </Wrapper>
    );
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
      console.error('Page rendering error:', error);
    }
    notFound();
  }
}