export default {
  components: [
    './src/components/TestPage.tsx',
    './src/components/FarhansComponent.tsx',
    './src/components/BrandPortalPage.tsx',
  ],
  propertyGroups: [
    {
      key: 'branding',
      displayName: 'Branding',
      sortOrder: 1,
    },
    {
      key: 'content',
      displayName: 'Content',
      sortOrder: 2,
    },
    {
      key: 'layout',
      displayName: 'Layout',
      sortOrder: 3,
    },
    {
      key: 'seo',
      displayName: 'SEO',
      sortOrder: 4,
    },
  ],
};
