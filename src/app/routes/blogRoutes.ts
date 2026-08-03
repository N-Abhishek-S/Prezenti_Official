import { lazy } from 'react';
import type { RouteDefinition } from './routeRegistry';
import type { BlogMetadata } from '../../content/blogs/blogTypes';

// Use Vite's glob import to automatically find all meta.ts files
// Note: We're doing an eager import for the metadata to build the route registry synchronously
const blogMetadataModules = import.meta.glob('../../content/blogs/**/meta.ts', { eager: true });

export const blogRoutes: Record<string, RouteDefinition> = {};
export const allBlogsMetadata: Record<string, BlogMetadata> = {};

// We can lazy load the Blog component
const BlogPostPage = lazy(() => import('../../pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const BlogHubPage = lazy(() => import('../../pages/BlogHubPage').then(m => ({ default: m.BlogHubPage })));

// Register the main blog hub page
blogRoutes['blog'] = {
  type: 'BLOG',
  component: BlogHubPage,
  dataKey: 'blog-hub'
};

Object.values(blogMetadataModules).forEach((moduleExport) => {
  const typedModule = moduleExport as { meta: BlogMetadata };
  const meta = typedModule.meta;
  
  if (meta && meta.slug) {
    allBlogsMetadata[meta.slug] = meta;
    
    blogRoutes[`blog/${meta.slug}`] = {
      type: 'BLOG',
      component: BlogPostPage,
      dataKey: meta.slug
    };
  }
});
