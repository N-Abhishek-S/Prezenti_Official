import { useEffect } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { SEO } from '../seo/SEO';
import { StructuredData } from '../seo/StructuredData';
import { SEO_CONSTANTS } from '../seo/constants';
import { blogsData } from '../data/blogs';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { FaqAccordion } from '../components/ui/FaqAccordion';
import { ServiceCta } from '../components/ui/ServiceCta';
import { motion } from 'framer-motion';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const blog = blogsData.find((b) => b.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [slug]);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  const breadcrumbs = [
    { name: 'Blog', url: '/blog' },
    { name: blog.title, url: `/blog/${blog.slug}` }
  ];

  const canonicalUrl = `${SEO_CONSTANTS.BASE_URL}/blog/${blog.slug}`;

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.seoTitle,
    "description": blog.seoDescription,
    "author": {
      "@type": "Organization",
      "name": "Prezenti"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Prezenti",
      "logo": {
        "@type": "ImageObject",
        "url": `${SEO_CONSTANTS.BASE_URL}/brand/prezenti-mark.png`
      }
    },
    "datePublished": blog.date,
    "mainEntityOfPage": canonicalUrl
  };

  return (
    <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <SEO 
        title={blog.seoTitle}
        description={blog.seoDescription}
        canonicalUrl={`/blog/${blog.slug}`} 
        keywords={[blog.targetKeyword, blog.category.toLowerCase(), 'prezenti blog']}
      />
      
      <StructuredData
        type="WebPage"
        data={{
          name: blog.seoTitle,
          description: blog.seoDescription,
          url: canonicalUrl,
        }}
      />
      <StructuredData type="BreadcrumbList" data={{ breadcrumbs }} />
      <StructuredData type="FAQPage" data={{ faqs: blog.faqs }} />
      
      {/* Inject custom Article schema since our StructuredData doesn't have it natively mapped yet */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
              {blog.category}
            </span>
            <span className="text-sm text-neutral-500 font-medium">
              {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-6"
          >
            {blog.title}
          </motion.h1>
          <p className="text-xl text-neutral-600 leading-relaxed font-medium">
            {blog.excerpt}
          </p>
        </header>

        <div className="prose prose-lg prose-neutral max-w-none mb-16">
          {blog.content.map((section, idx) => (
            <section key={idx} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-6">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="mb-4 text-neutral-700 leading-relaxed">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
                  {section.list.map((li, liIdx) => (
                    <li key={liIdx}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <ServiceCta 
          title="Looking for Expert Staffing Solutions?" 
          description="Contact Prezenti today to streamline your facility management and corporate staffing needs." 
        />

        <section className="my-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Frequently Asked Questions</h2>
          <FaqAccordion faqs={blog.faqs} />
        </section>

        <div className="mt-16 pt-12 border-t border-neutral-200">
          <Link to="/blog" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors">
            <span className="mr-2">←</span> Back to all articles
          </Link>
        </div>
      </article>
    </main>
  );
}
