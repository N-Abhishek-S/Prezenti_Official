import { Container } from '../components/ui/Container';
import { allBlogsMetadata } from '../app/routes/blogRoutes';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { SEO } from '../seo/SEO';

export function BlogHubPage() {
  const blogs = Object.values(allBlogsMetadata).filter(b => b.status === 'Published' || b.status === 'Ready');

  return (
    <>
      <SEO
        title="Knowledge Center & Blog | Prezenti"
        description="Explore expert insights on facility management, corporate housekeeping, security, and compliance in India."
        canonicalUrl="/blog"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-brand-dark text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Knowledge Center
            </h1>
            <p className="text-xl text-brand-muted/80">
              Expert insights, pricing guides, and compliance checklists for enterprise facility management.
            </p>
          </div>
        </Container>
      </section>

      {/* Blog Listing */}
      <section className="py-20 bg-brand-light min-h-screen">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <article key={blog.id} className="bg-white rounded-2xl shadow-sm border border-brand-accent/10 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-sm text-brand-accent font-semibold mb-4">
                    <span className="bg-brand-accent/10 px-3 py-1 rounded-full">{blog.category}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-brand-dark mb-4 leading-tight">
                    <Link to={`/blog/${blog.slug}`} className="hover:text-brand-accent transition-colors">
                      {blog.title}
                    </Link>
                  </h2>
                  <p className="text-brand-dark/70 mb-8 flex-grow">
                    {blog.aiSearch.summary}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-brand-dark/10">
                    <span className="flex items-center gap-2 text-sm text-brand-dark/60">
                      <Calendar className="w-4 h-4" />
                      {new Date(blog.history.createdAt).toLocaleDateString('en-IN')}
                    </span>
                    <Link to={`/blog/${blog.slug}`} className="flex items-center gap-1 text-brand-accent font-semibold hover:gap-2 transition-all">
                      Read <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
            
            {blogs.length === 0 && (
              <div className="col-span-full text-center py-20 text-brand-dark/50">
                <p className="text-xl">No articles published yet. Check back soon.</p>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
