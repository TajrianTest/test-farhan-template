import type { BrandConfig } from '@dam-portal/shared-types';

/**
 * Brand Portal Configuration
 * This file defines the branding and customization options for the portal
 */
export const brandConfig: BrandConfig = {
  branding: {
    name: 'Your Brand',
    logo: '/branding/logo.svg',
    favicon: '/branding/favicon.ico',
    colors: {
      primary: '#0066cc',
      secondary: '#333333',
      accent: '#ff6600',
      background: '#ffffff',
      text: '#1a1a1a',
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
    },
  },
  layout: {
    headerStyle: 'modern',
    footerStyle: 'detailed',
    navigationPosition: 'top',
  },
  features: {
    enableBlog: false,
    enableSearch: true,
    enableDownloads: true,
  },
};

export default brandConfig;
