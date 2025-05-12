import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { useMDXComponents as getMDXComponents } from '../../mdx-components';

export const generateStaticParams = generateStaticParamsFor('mdxPath');

export async function generateMetadata({ params }) {
  const path = Array.isArray(params?.mdxPath) && params.mdxPath.length
    ? params.mdxPath
    : ['index'];
  const { metadata = {} } = await importPage(path);
  return metadata;
}

export default async function Page({ params }) {
  const path = Array.isArray(params?.mdxPath) && params.mdxPath.length
    ? params.mdxPath
    : ['index'];

  const { default: MDXContent, toc, metadata } = await importPage(path);
  const Wrapper = getMDXComponents().wrapper;

  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent />
    </Wrapper>
  );
}
