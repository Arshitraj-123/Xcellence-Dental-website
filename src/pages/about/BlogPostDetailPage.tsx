import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, User, ArrowLeft, ArrowRight, Calendar, Phone, Info } from 'lucide-react';
import { getBlogPostBySlug, BLOG_POSTS } from '@/data/blog';
import { CLINIC } from '@/data/clinic';
import { Seo } from '@/components/common/Seo';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/ui/Container';

export const BlogPostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="py-24 max-w-xl mx-auto px-4 text-center font-sans space-y-5">
        <Seo title="Article Not Found" noIndex />
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-clove">
          Article Not Found
        </h1>
        <p className="text-muted text-sm sm:text-base leading-relaxed">
          The educational article you are searching for does not exist or has been moved.
        </p>
        <div className="pt-2">
          <Button to="/blog" variant="primary">
            Return to Dental Blog
          </Button>
        </div>
      </div>
    );
  }

  // Find next and previous posts
  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  // JSON-LD Article Schema (Strictly no fake dates)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Dentist',
      name: CLINIC.name,
      url: 'https://xcellencedentalharidwar.com',
      telephone: CLINIC.phone.display,
    },
    mainEntityOfPage: `https://xcellencedentalharidwar.com/blog/${post.slug}`,
  };

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        ogType="article"
      />

      {/* JSON-LD Article Structured Data */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      {/* Header Banner */}
      <section className="bg-linen/60 border-b border-ink/10 py-12 sm:py-16">
        <Container size="lg">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-muted mb-6">
            <Link to="/" className="hover:text-pomegranate transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-pomegranate transition-colors">
              Dental Blog
            </Link>
            <span>/</span>
            <span className="text-clove font-medium truncate max-w-[200px] sm:max-w-xs">
              {post.category}
            </span>
          </nav>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="rosewater" size="md">
                {post.category}
              </Badge>
              <span className="inline-flex items-center gap-1.5 text-xs font-sans text-muted">
                <Clock className="w-3.5 h-3.5 text-pomegranate" />
                {post.readTime}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-sans text-muted">
                <User className="w-3.5 h-3.5 text-brass-deep" />
                {post.author}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-clove leading-tight tracking-tight">
              {post.title}
            </h1>

            <p className="font-sans text-base sm:text-lg text-muted leading-relaxed pt-1">
              {post.excerpt}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content Article */}
      <article className="py-12 sm:py-16">
        <Container size="md">
          {/* General Information, Not a Diagnosis Note */}
          <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-rosewater/40 border border-pomegranate/25 flex items-start gap-3.5 text-ink/85 text-xs sm:text-sm">
            <Info className="w-5 h-5 text-pomegranate flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-clove font-bold block mb-0.5">
                General information, not a diagnosis.
              </strong>
              <span>
                This educational article offers general oral wellness advice provided by {post.author}. It is not a clinical diagnosis or treatment plan. For individualized evaluations, schedule an appointment with our doctors at our Haridwar clinic.
              </span>
            </div>
          </div>

          {/* Article Body Blocks */}
          <div className="space-y-6 font-sans text-base sm:text-lg text-ink/85 leading-relaxed">
            {post.body && post.body.length > 0 ? (
              post.body.map((block, idx) => {
                if (block.type === 'heading') {
                  return (
                    <h2
                      key={idx}
                      className="font-serif text-2xl sm:text-3xl font-bold text-clove pt-6 pb-1 tracking-tight"
                    >
                      {block.content as string}
                    </h2>
                  );
                }
                return (
                  <p key={idx} className="leading-relaxed">
                    {block.content as string}
                  </p>
                );
              })
            ) : (
              post.paragraphs.map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  {p}
                </p>
              ))
            )}
          </div>

          {/* Doctor Signature Block */}
          <div className="mt-12 pt-8 border-t border-ink/10 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-serif text-lg font-bold text-clove">{post.author}</p>
              <p className="text-xs text-muted font-sans">
                {CLINIC.name} · Haridwar, Uttarakhand
              </p>
            </div>
            <Link
              to="/doctors"
              className="text-xs font-sans font-bold text-pomegranate hover:underline inline-flex items-center gap-1"
            >
              Meet our specialists →
            </Link>
          </div>

          {/* Navigation Between Posts */}
          <div className="mt-10 pt-8 border-t border-ink/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="p-4 rounded-2xl bg-pearl border border-ink/10 hover:border-pomegranate/40 transition-all group block"
              >
                <span className="text-xs font-mono text-muted flex items-center gap-1 group-hover:text-pomegranate transition-colors mb-1">
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous Article
                </span>
                <span className="font-serif text-base font-bold text-clove group-hover:text-pomegranate transition-colors line-clamp-2">
                  {prevPost.title}
                </span>
              </Link>
            ) : <div />}

            {nextPost && (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="p-4 rounded-2xl bg-pearl border border-ink/10 hover:border-pomegranate/40 transition-all group block text-right"
              >
                <span className="text-xs font-mono text-muted flex items-center justify-end gap-1 group-hover:text-pomegranate transition-colors mb-1">
                  Next Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="font-serif text-base font-bold text-clove group-hover:text-pomegranate transition-colors line-clamp-2">
                  {nextPost.title}
                </span>
              </Link>
            )}
          </div>
        </Container>
      </article>

      {/* Book-a-Visit Consultation CTA */}
      <section className="py-16 bg-clove text-enamel border-t border-brass/25">
        <Container size="md" className="text-center space-y-4">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-enamel">
            Have questions about your oral health?
          </h2>
          <p className="text-sm sm:text-base font-sans text-enamel/80 max-w-xl mx-auto leading-relaxed">
            Whether you need a routine checkup, laser gum care, or implant consultation, Dr Himanshi Sharma and Dr Shailesh Sharma are here to guide you.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Button
              to="/book-appointment"
              variant="secondary"
              size="md"
              icon={<Calendar className="w-4 h-4" />}
            >
              Book a Visit
            </Button>
            <Button
              href={CLINIC.phoneTel}
              variant="ghost"
              size="md"
              icon={<Phone className="w-4 h-4" />}
            >
              Call {CLINIC.phone.display}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};
