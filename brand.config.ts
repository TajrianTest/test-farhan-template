/**
 * Brand configuration interface for portal customization
 */
export interface BrandConfig {
  branding: {
    name: string;
    logo: string;
    favicon?: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background?: string;
      text?: string;
    };
    typography: {
      headingFont: string;
      bodyFont: string;
    };
  };
  layout: {
    headerStyle: 'classic' | 'modern' | 'minimal';
    footerStyle: 'simple' | 'detailed';
    navigationPosition?: 'top' | 'side';
  };
  features?: {
    enableBlog?: boolean;
    enableSearch?: boolean;
    enableDownloads?: boolean;
  };
}

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
