import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Clock } from 'lucide-react';
import { ARTICLES } from '@/data/articles';
import { CLINIC } from '@/data/clinic';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Seo } from '@/components/common/Seo';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...new Set(ARTICLES.map((a) => a.category))];

  const filteredArticles = ARTICLES.filter((a) => {
    const matchesCategory = selectedCategory === 'All' || a.category === selectedCategory;
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles[0] || ARTICLES[0];
  const gridArticles = filteredArticles.slice(1);

  return (
    <>
      <Seo
        title="Oral Health Blog & Dental Advice"
        description="Dental tips, preventive advice, and oral healthcare guidance from Dr Himanshi Sharma and Dr Shailesh Sharma at Xcellence Dental Clinic in Haridwar."
        canonical="/blog"
      />

      {/* Hero Banner */}
      <section className="relative bg-clove text-enamel py-16 sm:py-24 overflow-hidden border-b border-brass/25">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/images/clinic-wide.jpg"
            alt="Dental advice banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-clove via-clove/90 to-clove/75" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs sm:text-sm text-enamel/70 mb-4">
            <Link to="/" className="hover:text-brass transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/about" className="hover:text-brass transition-colors">
              About
            </Link>
            <span>/</span>
            <span className="text-brass font-medium">Dental Blog</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <Badge variant="brass" size="md">
              Clinical Insights
            </Badge>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-enamel leading-tight">
              Dental advice you can use
            </h1>

            <p className="text-base sm:text-xl font-sans text-enamel/80 leading-relaxed">
              Plain-language tips from our doctors on caring for your teeth, protecting your family's smiles, and handling dental emergencies.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Topic Filter Tools Overlapping Hero */}
      <section className="relative z-20 -mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-pearl rounded-3xl p-5 sm:p-7 border border-ink/10 shadow-card-elevated flex flex-wrap gap-4 items-center justify-between">
          {/* Topic Chips */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-semibold border transition-all ${
                  selectedCategory === cat
                    ? 'bg-pomegranate border-pomegranate text-pearl shadow-sm'
                    : 'bg-enamel/40 border-ink/15 text-ink hover:border-pomegranate/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-grow sm:flex-grow-0 sm:min-w-[280px]">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              placeholder="Search dental topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-ink/15 bg-enamel/30 text-xs sm:text-sm font-sans text-ink focus:border-pomegranate focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-8 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {filteredArticles.length === 0 ? (
            <div className="bg-pearl rounded-3xl p-12 text-center border border-ink/10 text-muted font-sans space-y-3">
              <BookOpen className="w-8 h-8 text-pomegranate mx-auto" />
              <p className="text-base font-medium text-ink">
                No articles match your search criteria.
              </p>
              <p className="text-xs">
                Try searching for another keyword or select "All" topics above.
              </p>
            </div>
          ) : (
            <>
              {/* Featured Article Card */}
              {featuredArticle && (
                <Link
                  to={`/blog/${featuredArticle.slug}`}
                  className="bg-pearl rounded-3xl border border-ink/10 shadow-soft hover:border-pomegranate/50 hover:shadow-card-elevated transition-all p-6 sm:p-10 block group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs font-sans text-muted">
                      <Badge variant="rosewater" size="sm">
                        {featuredArticle.category}
                      </Badge>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-pomegranate" />
                        {featuredArticle.readTime}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-4xl font-bold text-clove group-hover:text-pomegranate transition-colors">
                      {featuredArticle.title}
                    </h2>

                    <p className="text-sm sm:text-base font-sans text-muted leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>

                    <div className="pt-2">
                      <span className="text-sm font-sans font-bold text-pomegranate inline-flex items-center gap-1 group-hover:underline">
                        Read Full Article →
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid of Other Articles */}
              {gridArticles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gridArticles.map((article) => (
                    <Link
                      key={article.id}
                      to={`/blog/${article.slug}`}
                      className="bg-pearl rounded-2xl border border-ink/10 p-6 shadow-soft hover:shadow-md hover:border-pomegranate/40 transition-all block group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-sans text-muted">
                          <Badge variant="linen" size="sm">
                            {article.category}
                          </Badge>
                          <span>{article.readTime}</span>
                        </div>

                        <h3 className="font-serif text-xl font-bold text-clove leading-snug group-hover:text-pomegranate transition-colors">
                          {article.title}
                        </h3>

                        <p className="text-xs sm:text-sm font-sans text-muted line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-ink/5 mt-4">
                        <span className="text-xs font-sans font-bold text-pomegranate inline-flex items-center gap-1 group-hover:underline">
                          Read Article →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-clove text-enamel text-center border-t border-brass/25">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-enamel">
            Have a question we haven't answered?
          </h2>
          <p className="text-sm sm:text-base font-sans text-enamel/80 max-w-lg mx-auto">
            Our friendly team is happy to discuss your concerns. Walk in or call us.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button to="/book-appointment" variant="secondary" size="md">
              Book a Visit
            </Button>
            <Button href={CLINIC.phoneTel} variant="ghost" size="md">
              Call {CLINIC.phone.display}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};
