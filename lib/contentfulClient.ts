import * as contentful from 'contentful';

// Handle potential default export wrapper from CDN (ESM/CommonJS interop)
const contentfulPkg = contentful as any;
const createClient = contentfulPkg.createClient || contentfulPkg.default?.createClient;

if (typeof createClient !== 'function') {
  throw new Error("Contentful createClient function not found. Check module imports.");
}

// Centralized Contentful client initialization.
const contentfulClient = createClient({
  space: 'uwwxzch580v2',
  accessToken: '_w9heSLF4EJjCIaCq_OXMzqUzwJjvIlHCEXEV1UVN7I',
  host: 'cdn.contentful.com',
}) as contentful.ContentfulClientApi<undefined>;

export default contentfulClient;