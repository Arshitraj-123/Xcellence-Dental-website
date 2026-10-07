import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Section, Eyebrow, Card, Badge, Button } from '@/components/ui';
import { CLINIC } from '@/data/clinic';
import { DOCTORS } from '@/data/doctors';
import { SERVICES } from '@/data/services';
import { BLOG_POSTS } from '@/data/blog';
import { AlertTriangle, CheckCircle, Clock, FileText, Stethoscope } from 'lucide-react';

export const ContentCheckPage: React.FC = () => {
  const unconfirmedServices = SERVICES.filter((s) => s.enabled && !s.confirmed);
  const confirmedServices = SERVICES.filter((s) => s.enabled && s.confirmed);
  const disabledServices = SERVICES.filter((s) => !s.enabled);
  const reviewArticles = BLOG_POSTS.filter((a) => a.needsDoctorReview);

  return (
    <>
      <Helmet>
        <title>Content Audit & Review | {CLINIC.name}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-enamel">
        {/* Header Banner */}
        <Section variant="clove" padded>
          <Container>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-brass">
                  Developer & Clinical Audit
                </span>
                <h1 className="font-serif text-fluid-4xl text-enamel mt-1">
                  Content Review Checklist
                </h1>
                <p className="text-enamel/80 font-sans text-fluid-base mt-2 max-w-2xl">
                  Tracks all data items requiring doctor review (<code className="text-brass">confirmed: false</code> or <code className="text-brass">needsDoctorReview: true</code>) and verifies single source of truth compliance.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button to="/" variant="outline" size="sm">
                  Back to Site
                </Button>
                <Button to="/styleguide" variant="primary" size="sm">
                  View Styleguide
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* Audit Summary Badges */}
        <Section variant="linen">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card variant="pearl" elevated className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-fluid-xs font-mono uppercase text-muted">Flagship Services</span>
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-3xl font-serif text-ink font-bold">{confirmedServices.length}</div>
                <p className="text-fluid-xs text-muted mt-1">Confirmed with full client facts</p>
              </Card>

              <Card variant="pearl" elevated className="p-5 border-l-4 border-amber-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-fluid-xs font-mono uppercase text-amber-700">Services for Review</span>
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                </div>
                <div className="text-3xl font-serif text-amber-700 font-bold">{unconfirmedServices.length}</div>
                <p className="text-fluid-xs text-muted mt-1">enabled: true, confirmed: false</p>
              </Card>

              <Card variant="pearl" elevated className="p-5 border-l-4 border-rose-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-fluid-xs font-mono uppercase text-rose-700">Articles for Review</span>
                  <FileText className="w-5 h-5 text-rose-500" />
                </div>
                <div className="text-3xl font-serif text-rose-700 font-bold">{reviewArticles.length}</div>
                <p className="text-fluid-xs text-muted mt-1">needsDoctorReview: true</p>
              </Card>

              <Card variant="pearl" elevated className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-fluid-xs font-mono uppercase text-muted">Disabled Services</span>
                  <Clock className="w-5 h-5 text-muted" />
                </div>
                <div className="text-3xl font-serif text-muted font-bold">{disabledServices.length}</div>
                <p className="text-fluid-xs text-muted mt-1">Removed (e.g. same-day dentistry)</p>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Section 1: Services Awaiting Clinical Confirmation */}
        <Section>
          <Container>
            <div className="flex items-center justify-between mb-6">
              <div>
                <Eyebrow>Services Review</Eyebrow>
                <h2 className="font-serif text-fluid-3xl text-ink mt-1">
                  Services Awaiting Doctor Review ({unconfirmedServices.length})
                </h2>
              </div>
              <Badge variant="brass">confirmed: false</Badge>
            </div>

            <p className="text-muted text-fluid-sm mb-6 max-w-3xl">
              These services were ported from the legacy site and adapted to general clinical standards. Both doctors are temporarily assigned to each until specific doctor assignments are confirmed.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unconfirmedServices.map((service) => (
                <Card key={service.slug} variant="pearl" elevated className="p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-serif text-fluid-lg text-ink font-bold">
                        {service.name}
                      </h3>
                      <Badge variant="muted">Needs Review</Badge>
                    </div>
                    <p className="text-muted text-fluid-sm mb-4">
                      {service.short}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-linen flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
                    <span className="font-mono">slug: /services/{service.slug}</span>
                    <span className="font-sans font-medium text-pomegranate">
                      Assigned: Dr Himanshi & Dr Shailesh
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Section 2: Educational Articles Requiring Doctor Review */}
        <Section variant="linen">
          <Container>
            <div className="flex items-center justify-between mb-6">
              <div>
                <Eyebrow>Educational Articles</Eyebrow>
                <h2 className="font-serif text-fluid-3xl text-ink mt-1">
                  Blog Articles Awaiting Clinical Sign-Off ({reviewArticles.length})
                </h2>
              </div>
              <Badge variant="brass">needsDoctorReview: true</Badge>
            </div>

            <p className="text-muted text-fluid-sm mb-6 max-w-3xl">
              All six educational articles are written in general, objective language without commercial claims or pricing. They require final clinical sign-off from the credited authors.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviewArticles.map((article) => (
                <Card key={article.slug} variant="pearl" elevated className="p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-fluid-xs text-brass font-bold uppercase">
                        {article.category}
                      </span>
                      <span className="text-fluid-xs text-muted">{article.readTime}</span>
                    </div>

                    <h3 className="font-serif text-fluid-base text-ink font-bold mb-2">
                      {article.title}
                    </h3>

                    <p className="text-muted text-fluid-xs line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-linen flex items-center justify-between text-fluid-xs">
                    <span className="font-medium text-clove">{article.author}</span>
                    <Badge variant="brass" dot>Pending</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Section 3: Verified Client Facts */}
        <Section>
          <Container>
            <Eyebrow>Single Source of Truth</Eyebrow>
            <h2 className="font-serif text-fluid-3xl text-ink mt-1 mb-6">
              Verified Client Facts (clinic.ts & doctors.ts)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Clinic Facts */}
              <Card variant="pearl" elevated className="p-6">
                <h3 className="font-serif text-fluid-xl text-ink mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  Clinic Details
                </h3>
                <dl className="space-y-3 text-fluid-sm">
                  <div>
                    <dt className="text-muted text-xs uppercase font-mono">Clinic Name</dt>
                    <dd className="font-medium text-ink">{CLINIC.name}</dd>
                  </div>
                  <div>
                    <dt className="text-muted text-xs uppercase font-mono">Tagline</dt>
                    <dd className="font-medium text-ink">{CLINIC.tagline}</dd>
                  </div>
                  <div>
                    <dt className="text-muted text-xs uppercase font-mono">Experience Headline</dt>
                    <dd className="font-medium text-ink">{CLINIC.experience}</dd>
                  </div>
                  <div>
                    <dt className="text-muted text-xs uppercase font-mono">Phone & WhatsApp</dt>
                    <dd className="font-medium text-ink">{CLINIC.phone.display} · +{CLINIC.whatsappNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-muted text-xs uppercase font-mono">Address</dt>
                    <dd className="font-medium text-ink">{CLINIC.address.single}</dd>
                  </div>
                  <div>
                    <dt className="text-muted text-xs uppercase font-mono">Timing</dt>
                    <dd className="font-medium text-ink">{CLINIC.hours.days}: {CLINIC.hours.label} ({CLINIC.hours.tz})</dd>
                  </div>
                </dl>
              </Card>

              {/* Doctors Facts */}
              <Card variant="pearl" elevated className="p-6">
                <h3 className="font-serif text-fluid-xl text-ink mb-4 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-emerald-600" />
                  Doctor Credentials
                </h3>
                <div className="space-y-4">
                  {DOCTORS.map((doc) => (
                    <div key={doc.id} className="p-3 bg-linen/50 rounded-lg">
                      <div className="font-serif text-fluid-base font-bold text-ink">{doc.name}</div>
                      <div className="text-pomegranate text-fluid-xs font-medium">{doc.qualifications}</div>
                      <div className="text-muted text-fluid-xs mt-1">Focus: {doc.focusAreas.join(', ')}</div>
                      <div className="text-muted text-fluid-xs mt-1 font-mono">Photo: {doc.photo}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
};
