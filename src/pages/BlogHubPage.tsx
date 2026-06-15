import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../seo/SEO';
import { StructuredData } from '../seo/StructuredData';
import { SEO_CONSTANTS } from '../seo/constants';
import { blogsData } from '../data/blogs';
import { motion } from 'framer-motion';

export function BlogHubPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const pageTitle = "Prezenti Blog | Facility Management & Corporate Staffing Insights";
  const seoDescription = "Read the latest insights, trends, and guides on facility management, corporate staffing, and workplace optimization in Pune and Maharashtra.";

  return (
    <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <SEO 
        title={pageTitle}
        description={seoDescription}
        canonicalUrl="/blog" 
        keywords={['facility management blog', 'corporate staffing insights', 'housekeeping tips', 'workplace optimization']}
      />
      
      <StructuredData
        type="WebPage"
        data={{
          name: pageTitle,
          description: seoDescription,
          url: `${SEO_CONSTANTS.BASE_URL}/blog`,
        }}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-6"
          >
            Insights & Resources
          </motion.h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Expert advice and industry trends on integrated facility management and corporate workforce optimization.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogsData.map((blog) => (
            <Link 
              key={blog.id} 
              to={`/blog/${blog.slug}`}
              className="flex flex-col bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg hover:border-primary-500 transition-all group"
            >
              <div className="p-8 flex flex-col grow">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-4">
                  {blog.category}
                </div>
                <h2 className="text-xl font-bold text-neutral-900 mb-4 group-hover:text-primary-700 transition-colors">
                  {blog.title}
                </h2>
                <p className="text-neutral-600 mb-6 grow line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="text-sm text-neutral-500 font-medium">
                  {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
