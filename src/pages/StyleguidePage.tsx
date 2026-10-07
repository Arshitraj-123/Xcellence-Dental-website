import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Button,
  Container,
  Section,
  Eyebrow,
  Card,
  Accordion,
  Tabs,
  Dialog,
  Chip,
  Badge,
  useToast,
  Logo,
  Img,
} from '@/components/ui';
import { IMAGES } from '@/data/images';
import { Heart, Phone, Calendar, ArrowRight } from 'lucide-react';

/* ─── Colour swatch ─── */
const colours = [
  { name: 'enamel',          hex: '#FBF8F2', textDark: true },
  { name: 'pearl',           hex: '#FFFFFF', textDark: true },
  { name: 'linen',           hex: '#F1EBE1', textDark: true },
  { name: 'ink',             hex: '#1E1A1D', textDark: false },
  { name: 'muted',           hex: '#6B6168', textDark: false },
  { name: 'pomegranate',     hex: '#8C2F4B', textDark: false },
  { name: 'pomegranate-dark',hex: '#6F2339', textDark: false },
  { name: 'rosewater',       hex: '#F3DFDA', textDark: true },
  { name: 'clove',           hex: '#2A1620', textDark: false },
  { name: 'brass',           hex: '#C19A5B', textDark: true },
  { name: 'brass-deep',      hex: '#A67C3A', textDark: false },
];

/* ─── Type scale specimens ─── */
const typeScale = [
  { name: 'fluid-5xl', sample: 'The quick brown fox' },
  { name: 'fluid-4xl', sample: 'The quick brown fox jumps' },
  { name: 'fluid-3xl', sample: 'The quick brown fox jumps over' },
  { name: 'fluid-2xl', sample: 'The quick brown fox jumps over the lazy dog' },
  { name: 'fluid-xl',  sample: 'Gentle dentistry in a calm, modern office.' },
  { name: 'fluid-lg',  sample: 'Certified Laser Dentistry for painless care' },
  { name: 'fluid-base',sample: 'Our doctors and caring team make every visit a reassuring one.' },
  { name: 'fluid-sm',  sample: 'From routine cleanings to advanced laser surgery and implants.' },
  { name: 'fluid-xs',  sample: '45+ YEARS CARING FOR HARIDWAR' },
];

const accordionItems = [
  { id: '1', title: 'Do you accept walk-in patients?', content: 'Yes, we welcome walk-in patients every day during our operating hours from 10 AM to 9 PM.' },
  { id: '2', title: 'What payment methods are available?', content: 'We accept cash, UPI, and all major debit and credit cards. We also offer in-house financing options.' },
  { id: '3', title: 'How do I book an appointment?', content: 'You can book an appointment by calling us, sending a WhatsApp message, or using our online booking form.' },
];

const tabItems = [
  { id: 'overview', label: 'Overview', content: <p className="text-muted">This is the overview tab content. General information about the service goes here.</p> },
  { id: 'details',  label: 'Details',  content: <p className="text-muted">Detailed treatment information, duration, and what to expect during your visit.</p> },
  { id: 'faq',      label: 'FAQ',      content: <p className="text-muted">Frequently asked questions about this particular service or treatment.</p> },
];

export const StyleguidePage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  return (
    <>
      <Helmet>
        <title>Styleguide | Xcellence Dental Clinic</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-enamel">
        {/* Header */}
        <Section variant="clove" padded>
          <Container>
            <h1 className="font-serif text-fluid-4xl text-enamel mb-2">Design System Styleguide</h1>
            <p className="text-brass font-sans text-fluid-base">Enamel & Pomegranate — dev reference</p>
          </Container>
        </Section>

        {/* ─── Colours ─── */}
        <Section>
          <Container>
            <Eyebrow>Colours</Eyebrow>
            <h2 className="font-serif text-fluid-3xl text-ink mt-2 mb-6">Design Palette</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {colours.map((c) => (
                <div key={c.name} className="flex flex-col gap-1.5">
                  <div
                    className="w-full aspect-square rounded-card border border-linen/40"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="font-sans text-fluid-xs font-semibold text-ink">{c.name}</span>
                  <span className="font-mono text-fluid-xs text-muted">{c.hex}</span>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* ─── Typography ─── */}
        <Section variant="linen">
          <Container>
            <Eyebrow>Typography</Eyebrow>
            <h2 className="font-serif text-fluid-3xl text-ink mt-2 mb-6">Fluid Type Scale</h2>
            <div className="space-y-4">
              {typeScale.map((t) => (
                <div key={t.name} className="flex flex-col gap-0.5">
                  <span className="font-mono text-fluid-xs text-muted">{t.name}</span>
                  <p className={`text-${t.name} ${t.name.includes('5xl') || t.name.includes('4xl') || t.name.includes('3xl') || t.name.includes('2xl') ? 'font-serif' : 'font-sans'} text-ink`}>
                    {t.sample}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-linen">
              <Eyebrow className="mb-3">Eyebrow Label</Eyebrow>
              <p className="text-muted text-fluid-sm">The Eyebrow component — uppercase tracked label for section headings.</p>
            </div>
          </Container>
        </Section>

        {/* ─── Buttons ─── */}
        <Section>
          <Container>
            <Eyebrow>Buttons</Eyebrow>
            <h2 className="font-serif text-fluid-3xl text-ink mt-2 mb-6">Button Variants & Sizes</h2>

            <h3 className="font-sans text-fluid-lg font-semibold mb-3 text-ink">Variants</h3>
            <div className="flex flex-wrap gap-3 mb-8">
              <Button variant="primary" icon={<Calendar className="w-4 h-4" />}>Primary</Button>
              <Button variant="outline" icon={<Phone className="w-4 h-4" />}>Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>

            <h3 className="font-sans text-fluid-lg font-semibold mb-3 text-ink">On Dark</h3>
            <div className="bg-clove rounded-card p-6 mb-8">
              <div className="flex flex-wrap gap-3">
                <Button variant="onDark" icon={<Heart className="w-4 h-4" />}>On Dark</Button>
                <Button variant="primary">Primary on Dark</Button>
              </div>
            </div>

            <h3 className="font-sans text-fluid-lg font-semibold mb-3 text-ink">Sizes</h3>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg" iconRight={<ArrowRight className="w-5 h-5" />}>Large</Button>
            </div>

            <h3 className="font-sans text-fluid-lg font-semibold mb-3 text-ink">States</h3>
            <div className="flex flex-wrap gap-3">
              <Button disabled>Disabled</Button>
              <Button fullWidth>Full Width</Button>
            </div>
          </Container>
        </Section>

        {/* ─── Cards ─── */}
        <Section variant="linen">
          <Container>
            <Eyebrow>Cards</Eyebrow>
            <h2 className="font-serif text-fluid-3xl text-ink mt-2 mb-6">Card Variants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(['pearl', 'linen', 'rose', 'outline'] as const).map((v) => (
                <Card key={v} variant={v} elevated={v === 'pearl'} hoverable className="p-5">
                  <h3 className="font-serif text-fluid-lg text-ink mb-1 capitalize">{v}</h3>
                  <p className="text-fluid-sm text-muted">Card variant "{v}" with padding, optional elevation and hover lift.</p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* ─── Chips & Badges ─── */}
        <Section>
          <Container>
            <Eyebrow>Chips & Badges</Eyebrow>
            <h2 className="font-serif text-fluid-3xl text-ink mt-2 mb-6">Small Indicators</h2>

            <h3 className="font-sans text-fluid-lg font-semibold mb-3 text-ink">Chips</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              <Chip>Default</Chip>
              <Chip variant="pomegranate">Pomegranate</Chip>
              <Chip variant="brass">Brass</Chip>
              <Chip variant="pomegranate" active>Active</Chip>
              <Chip variant="brass" active>Active Brass</Chip>
            </div>

            <h3 className="font-sans text-fluid-lg font-semibold mb-3 text-ink">Badges</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="pomegranate">Featured</Badge>
              <Badge variant="brass">New</Badge>
              <Badge variant="success">Open</Badge>
              <Badge variant="muted">Closed</Badge>
              <span className="flex items-center gap-1.5"><Badge variant="success" dot /> Open Now</span>
              <span className="flex items-center gap-1.5"><Badge variant="muted" dot /> Closed</span>
            </div>
          </Container>
        </Section>

        {/* ─── Accordion ─── */}
        <Section variant="linen">
          <Container size="md">
            <Eyebrow>Accordion</Eyebrow>
            <h2 className="font-serif text-fluid-3xl text-ink mt-2 mb-6">Accessible Accordion</h2>
            <Card variant="pearl" elevated className="p-5 sm:p-6">
              <Accordion items={accordionItems} />
            </Card>
          </Container>
        </Section>

        {/* ─── Tabs ─── */}
        <Section>
          <Container size="md">
            <Eyebrow>Tabs</Eyebrow>
            <h2 className="font-serif text-fluid-3xl text-ink mt-2 mb-6">Accessible Tabs</h2>

            <h3 className="font-sans text-fluid-lg font-semibold mb-3 text-ink">Underline</h3>
            <Card variant="pearl" elevated className="p-5 sm:p-6 mb-6">
              <Tabs tabs={tabItems} variant="underline" />
            </Card>

            <h3 className="font-sans text-fluid-lg font-semibold mb-3 text-ink">Pill</h3>
            <Card variant="pearl" elevated className="p-5 sm:p-6">
              <Tabs tabs={tabItems} variant="pill" />
            </Card>
          </Container>
        </Section>

        {/* ─── Dialog ─── */}
        <Section variant="linen">
          <Container>
            <Eyebrow>Dialog</Eyebrow>
            <h2 className="font-serif text-fluid-3xl text-ink mt-2 mb-6">Modal Dialog</h2>
            <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="Sample Dialog">
              <p className="text-muted text-fluid-base mb-4">
                This dialog traps focus, closes on Escape, and restores focus on close.
              </p>
              <div className="flex gap-3 justify-end">
                <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
              </div>
            </Dialog>
          </Container>
        </Section>

        {/* ─── Toast ─── */}
        <Section>
          <Container>
            <Eyebrow>Toast</Eyebrow>
            <h2 className="font-serif text-fluid-3xl text-ink mt-2 mb-6">Toast Notifications</h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => toast('Information message')}>Info Toast</Button>
              <Button variant="outline" onClick={() => toast('Action completed', 'success')}>Success Toast</Button>
              <Button variant="outline" onClick={() => toast('Something went wrong', 'error')}>Error Toast</Button>
            </div>
          </Container>
        </Section>

        {/* ─── Logo Variants ─── */}
        <Section variant="linen">
          <Container>
            <Eyebrow>Logo</Eyebrow>
            <h2 className="font-serif text-fluid-3xl text-ink mt-2 mb-6">Responsive Logo Variants</h2>

            <div className="space-y-8">
              {/* Show at simulated widths */}
              {[
                { label: '1280px — Full', w: 1280, variant: 'full' as const },
                { label: '768px — Compact', w: 768, variant: 'compact' as const },
                { label: '390px — Compact', w: 390, variant: 'compact' as const },
                { label: '320px — Mark Only', w: 320, variant: 'mark-only' as const },
              ].map(({ label, w, variant }) => (
                <div key={label}>
                  <p className="font-mono text-fluid-xs text-muted mb-2">{label}</p>
                  <div
                    className="bg-pearl rounded-card border border-linen p-4 overflow-hidden"
                    style={{ maxWidth: w }}
                  >
                    <Logo forceVariant={variant} linkToHome={false} />
                  </div>
                </div>
              ))}

              {/* Dark variant */}
              <div>
                <p className="font-mono text-fluid-xs text-muted mb-2">Dark background — Full</p>
                <div className="bg-clove rounded-card p-4 max-w-lg">
                  <Logo forceVariant="full" colorScheme="dark" linkToHome={false} />
                </div>
              </div>

              {/* Mono-white variant */}
              <div>
                <p className="font-mono text-fluid-xs text-muted mb-2">Mono-white — Compact</p>
                <div className="bg-pomegranate rounded-card p-4 max-w-sm">
                  <Logo forceVariant="compact" colorScheme="mono-white" linkToHome={false} />
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* ─── Img Masks ─── */}
        <Section>
          <Container>
            <Eyebrow>Images</Eyebrow>
            <h2 className="font-serif text-fluid-3xl text-ink mt-2 mb-6">Img Component Masks</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="font-mono text-fluid-xs text-muted mb-2">mask="none"</p>
                <Img
                  src={IMAGES['clinic-team'].src}
                  alt={IMAGES['clinic-team'].alt}
                  ratio={IMAGES['clinic-team'].ratio}
                  mask="none"
                />
              </div>
              <div>
                <p className="font-mono text-fluid-xs text-muted mb-2">mask="rounded"</p>
                <Img
                  src={IMAGES['clinic-interior'].src}
                  alt={IMAGES['clinic-interior'].alt}
                  ratio={IMAGES['clinic-interior'].ratio}
                  mask="rounded"
                />
              </div>
              <div>
                <p className="font-mono text-fluid-xs text-muted mb-2">mask="arch"</p>
                <Img
                  src={IMAGES['doctor-himanshi-sharma'].src}
                  alt={IMAGES['doctor-himanshi-sharma'].alt}
                  ratio={IMAGES['doctor-himanshi-sharma'].ratio}
                  mask="arch"
                />
              </div>
            </div>

            {/* Fallback demo */}
            <div className="mt-8">
              <p className="font-mono text-fluid-xs text-muted mb-2">Error fallback (missing image)</p>
              <div className="max-w-xs">
                <Img
                  src="/images/nonexistent.jpg"
                  alt="Graceful fallback with tooth mark"
                  ratio="4/3"
                  mask="rounded"
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* ─── Section Variants ─── */}
        <Section variant="rose">
          <Container>
            <Eyebrow>Sections</Eyebrow>
            <h2 className="font-serif text-fluid-3xl text-ink mt-2 mb-4">Rose Section</h2>
            <p className="text-muted text-fluid-base">variant="rose" — soft rosewater background for call-to-action bands.</p>
          </Container>
        </Section>

        <Section variant="clove">
          <Container>
            <Eyebrow variant="dark">Sections</Eyebrow>
            <h2 className="font-serif text-fluid-3xl text-enamel mt-2 mb-4">Clove Section</h2>
            <p className="text-brass text-fluid-base">variant="clove" — dark section for footer and contrast panels. Focus rings switch to brass.</p>
          </Container>
        </Section>
      </div>
    </>
  );
};
