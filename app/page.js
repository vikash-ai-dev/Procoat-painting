'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { toast } from 'sonner'
import {
  Phone, MessageCircle, ShieldCheck, Sparkles, PaintBucket, Building2, Factory, Home,
  Star, Clock, Award, Users, ArrowRight, CheckCircle2, Calculator, MapPin, Mail,
  Menu, X, ChevronRight, Palette, HardHat, Leaf, Timer, ThumbsUp, Zap
} from 'lucide-react'

// ---- Business config (easy to edit) ----
const BIZ = {
  name: 'ProCoat',
  full: 'ProCoat Painting Co.',
  tagline: 'Finish that speaks. Trust that lasts.',
  phone: '+91 98765 43210',
  phoneDial: '+919876543210',
  whatsapp: '919876543210',
  email: 'hello@procoatpainting.com',
  city: 'Delhi NCR',
  address: 'Sector 22, Noida, Uttar Pradesh',
  years: 15,
  projects: 1200,
  satisfaction: 98,
  warranty: 5,
}

const IMAGES = {
  hero: 'https://images.pexels.com/photos/4981780/pexels-photo-4981780.jpeg',
  residential: 'https://images.unsplash.com/photo-1519219788971-8d9797e0928e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwxfHxob21lJTIwaW50ZXJpb3J8ZW58MHx8fGJsdWV8MTc4MzU3NzAyM3ww&ixlib=rb-4.1.0&q=85',
  commercial: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwyfHxwYWludGluZ3xlbnwwfHx8Ymx1ZXwxNzgzNTc3MDIzfDA&ixlib=rb-4.1.0&q=85',
  industrial: 'https://images.unsplash.com/photo-1619440321768-e58b5bde3484?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwyfHxwYWludGVkJTIwaW50ZXJpb3J8ZW58MHx8fGJsdWV8MTc4MzU3NzAxNnww&ixlib=rb-4.1.0&q=85',
  portfolio1: 'https://images.unsplash.com/photo-1539445954623-46532d2dabaf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHw0fHxwYWludGVkJTIwaW50ZXJpb3J8ZW58MHx8fGJsdWV8MTc4MzU3NzAxNnww&ixlib=rb-4.1.0&q=85',
  portfolio2: 'https://images.unsplash.com/photo-1513492080443-fe1a22559fd6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwyfHxob21lJTIwaW50ZXJpb3J8ZW58MHx8fGJsdWV8MTc4MzU3NzAyM3ww&ixlib=rb-4.1.0&q=85',
}

const SERVICES = [
  {
    key: 'residential', icon: Home, title: 'Residential Painting',
    desc: 'Homes, apartments, villas & duplexes. Dust-free execution, premium finishes, on-time delivery.',
    img: IMAGES.residential,
    features: ['Interior & Exterior', 'Waterproofing', 'Texture & Wallpaper', 'Wood polish'],
  },
  {
    key: 'commercial', icon: Building2, title: 'Commercial Painting',
    desc: 'Offices, retail shops, showrooms, schools & hotels. Night-shift work available — zero business disruption.',
    img: IMAGES.commercial,
    features: ['Low-VOC paints', 'Weekend & night shifts', 'Brand color matching', 'Signage & lines'],
  },
  {
    key: 'industrial', icon: Factory, title: 'Industrial Painting',
    desc: 'Warehouses, factories, buildings & MEP structures. Anti-corrosion, epoxy floors & heat-resistant coatings.',
    img: IMAGES.industrial,
    features: ['Epoxy flooring', 'Anti-corrosive', 'Height & safety gear', 'PU & PPG coatings'],
  },
]

const REASONS = [
  { icon: ShieldCheck, title: 'Licensed & Insured', desc: 'Fully covered team — your property is protected on day one.' },
  { icon: Award, title: `${BIZ.warranty}-Year Warranty`, desc: 'Written warranty on workmanship. We come back if something isn’t right.' },
  { icon: Timer, title: 'On-Time or Free Day', desc: 'Miss our promised date? You get a free day of touch-ups. That simple.' },
  { icon: Leaf, title: 'Low-VOC, Kid-Safe Paints', desc: 'Asian Paints, Berger, Dulux — low-odour, family-safe finishes only.' },
  { icon: Palette, title: 'Free Color Consultation', desc: '30-minute consult with a color expert. Included with every quote.' },
  { icon: HardHat, title: 'Trained In-House Crew', desc: 'No sub-contracting. Same crew from start to finish — accountable, uniformed, verified.' },
]

const PROCESS = [
  { n: '01', title: 'Free Site Visit', desc: 'We visit, measure & discuss. No obligation, no fee.' },
  { n: '02', title: 'Transparent Quote', desc: 'Line-item breakdown — paint, prep, labour, extras. Nothing hidden.' },
  { n: '03', title: 'Prep & Protect', desc: 'Furniture covered, floors masked, cracks filled. Then we paint.' },
  { n: '04', title: 'Walk-Through & Warranty', desc: 'Final inspection with you. Warranty card + touch-up kit handed over.' },
]

const TESTIMONIALS = [
  { name: 'Priya Sharma', role: 'Homeowner, Noida', rating: 5, text: 'They finished my 3BHK in 4 days flat. Zero mess, walls look magazine-worthy. Even sent a follow-up crew after 3 months for a free touch-up.' },
  { name: 'Rajesh Menon', role: 'Restaurant Owner', rating: 5, text: 'Painted our entire restaurant over the weekend — we didn’t lose a single day of business. Professional, punctual, and priced fairly.' },
  { name: 'Anita Kapoor', role: 'Society Secretary', rating: 5, text: 'Handled our 80-flat society exterior. Coordinated with residents, worked around parking, finished 3 days early. Highly recommend.' },
  { name: 'Vikram Industries', role: 'Warehouse Manager', rating: 5, text: 'Epoxy floor + anti-corrosive walls for our 40,000 sqft warehouse. Two years in, zero peeling. Book them.' },
]

const FAQ = [
  { q: 'How much does painting a 2BHK cost?', a: 'For a standard 2BHK (~850 sqft carpet), interior repainting typically ranges from ₹25,000 to ₹55,000 depending on paint quality (Tractor, Apex, Royale) and prep work needed. Use our instant estimator above for a personalised number.' },
  { q: 'Do you provide the paint or do I buy it?', a: 'Both options available. We can source at contractor rates (usually cheaper than retail) or paint what you already bought. Fully flexible.' },
  { q: 'How long does the work take?', a: 'A 2BHK interior takes 3–5 days. A full house exterior 5–8 days. Commercial spaces we can do overnight/weekend. Exact timeline confirmed in quote.' },
  { q: 'Is there any warranty?', a: `Yes — a written ${BIZ.warranty}-year workmanship warranty. If paint peels, cracks or bubbles due to our work, we redo it free.` },
  { q: 'Do you move furniture?', a: 'Yes. We cover and shift furniture to the room’s center or an adjacent room. Heavy items stay covered in place. Everything restored on the last day.' },
  { q: 'What areas do you serve?', a: `Currently ${BIZ.city} and 40km around. For larger commercial/industrial projects, we travel PAN-India.` },
]

// ------- Sub-components -------

function AnimatedNumber({ value, suffix = '' }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0
        const dur = 1400
        const t0 = performance.now()
        const step = (t) => {
          const p = Math.min(1, (t - t0) / dur)
          setN(Math.round(value * (0.2 + 0.8 * p * (2 - p))))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        obs.disconnect()
      }
    })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [value])
  return <span ref={ref}>{n}{suffix}</span>
}

function Section({ id, children, className = '' }) {
  return <section id={id} className={`scroll-mt-24 ${className}`}>{children}</section>
}

function Kicker({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-orange-600">
      <Sparkles className="h-3.5 w-3.5" /> {children}
    </div>
  )
}

// ------- Main -------

export default function App() {
  const [navOpen, setNavOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const waLink = `https://wa.me/${BIZ.whatsapp}?text=${encodeURIComponent(`Hi ${BIZ.name}, I'd like a painting quote.`)}`
  const telLink = `tel:${BIZ.phoneDial}`

  return (
    <main className="relative">
      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200' : 'bg-transparent'}`}>
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <a href="#top" className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white">
              <PaintBucket className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="font-extrabold text-slate-900 text-lg">{BIZ.name}</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500">Painting Co.</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
            <a href="#services" className="hover:text-orange-600">Services</a>
            <a href="#estimator" className="hover:text-orange-600">Instant Quote</a>
            <a href="#why" className="hover:text-orange-600">Why Us</a>
            <a href="#work" className="hover:text-orange-600">Our Work</a>
            <a href="#reviews" className="hover:text-orange-600">Reviews</a>
            <a href="#faq" className="hover:text-orange-600">FAQ</a>
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <a href={telLink}><Button variant="outline" className="gap-2"><Phone className="h-4 w-4" />Call</Button></a>
            <a href="#contact"><Button className="gap-2 bg-orange-500 hover:bg-orange-600 text-white">Get Free Quote <ArrowRight className="h-4 w-4" /></Button></a>
          </div>
          <button className="md:hidden p-2" onClick={() => setNavOpen(!navOpen)} aria-label="menu">
            {navOpen ? <X /> : <Menu />}
          </button>
        </div>
        <AnimatePresence>
          {navOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden overflow-hidden bg-white border-t">
              <div className="flex flex-col p-4 gap-3 text-sm">
                {['services','estimator','why','work','reviews','faq','contact'].map(id => (
                  <a key={id} href={`#${id}`} onClick={() => setNavOpen(false)} className="py-2 border-b capitalize">{id === 'estimator' ? 'Instant Quote' : id}</a>
                ))}
                <a href={telLink}><Button className="w-full gap-2"><Phone className="h-4 w-4" />Call {BIZ.phone}</Button></a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <Section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-slate-50 via-white to-orange-50/40">
        <div className="absolute inset-0 grain-bg opacity-40 pointer-events-none" />
        <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-10 items-center relative">
          <motion.div style={{ y: heroY }} className="lg:col-span-7">
            <Kicker>Trusted since 2010 · {BIZ.city}</Kicker>
            <h1 className="mt-5 text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-slate-900">
              Painters who show up <span className="paint-stroke">on time</span>,<br />
              finish <span className="paint-stroke">on budget</span>.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl">
              Residential, commercial & industrial painting by a licensed in-house crew. Free site visit, transparent quotes, {BIZ.warranty}-year written warranty.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#estimator"><Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white gap-2 glow-orange text-base h-12 px-6">
                <Calculator className="h-5 w-5" /> Get Instant Quote
              </Button></a>
              <a href={waLink} target="_blank" rel="noreferrer"><Button size="lg" variant="outline" className="gap-2 text-base h-12 px-6 border-slate-300">
                <MessageCircle className="h-5 w-5 text-green-600" /> WhatsApp Us
              </Button></a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-slate-600">
              <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-emerald-600" /> Licensed & Insured</div>
              <div className="flex items-center gap-2"><Award className="h-5 w-5 text-emerald-600" /> {BIZ.warranty}-Year Warranty</div>
              <div className="flex items-center gap-2"><Star className="h-5 w-5 text-amber-500 fill-amber-500" /> 4.9 / 5 (300+ reviews)</div>
            </div>
          </motion.div>

          <div className="lg:col-span-5 relative">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}
              className="relative rounded-3xl overflow-hidden glow-navy">
              <img src={IMAGES.hero} alt="Professional painter" className="w-full h-[520px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div>
                  <div className="text-xs uppercase tracking-widest text-orange-300 font-semibold">Now booking</div>
                  <div className="font-bold text-xl">June – August slots</div>
                </div>
                <a href="#contact"><Button size="sm" className="bg-white text-slate-900 hover:bg-slate-100 gap-1">Reserve <ChevronRight className="h-4 w-4" /></Button></a>
              </div>
            </motion.div>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
              className="hidden md:block absolute -left-8 top-8 bg-white rounded-2xl shadow-2xl p-4 w-56 border border-slate-100">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex -space-x-2">
                  {[0,1,2].map(i => <div key={i} className={`h-8 w-8 rounded-full border-2 border-white ${['bg-orange-400','bg-slate-800','bg-emerald-500'][i]}`} />)}
                </div>
                <span className="font-semibold">300+ happy homes</span>
              </div>
              <div className="mt-2 text-xs text-slate-500">painted this year alone</div>
            </motion.div>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
              className="hidden md:block absolute -right-4 bottom-24 bg-white rounded-2xl shadow-2xl p-4 border border-slate-100">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Booked in 60 sec
              </div>
              <div className="text-xs text-slate-500 mt-1">Avg. quote response time</div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* TRUST BAR */}
      <Section className="border-y bg-slate-900 text-white">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 py-10">
          {[
            { v: BIZ.years, s: '+', label: 'Years experience', Icon: Clock },
            { v: BIZ.projects, s: '+', label: 'Projects delivered', Icon: PaintBucket },
            { v: BIZ.satisfaction, s: '%', label: 'Client satisfaction', Icon: ThumbsUp },
            { v: BIZ.warranty, s: 'yr', label: 'Warranty on work', Icon: ShieldCheck },
          ].map((s, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="flex md:justify-start justify-center mb-2"><s.Icon className="h-6 w-6 text-orange-400" /></div>
              <div className="text-4xl md:text-5xl font-extrabold"><AnimatedNumber value={s.v} suffix={s.s} /></div>
              <div className="text-slate-400 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <Kicker>What we do</Kicker>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900">Every surface. Every scale. One trusted crew.</h2>
            <p className="mt-4 text-lg text-slate-600">From a single bedroom to a 50,000 sqft warehouse — the same in-house team, the same warranty, the same on-time promise.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div key={s.key}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="group overflow-hidden border-slate-200 hover:border-orange-400 transition-all hover:-translate-y-1 hover:shadow-2xl">
                  <div className="relative h-56 overflow-hidden">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                    <div className="absolute top-4 left-4 grid h-11 w-11 place-items-center rounded-xl bg-white/95 shadow">
                      <s.icon className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="absolute bottom-4 left-4 text-white text-xl font-bold">{s.title}</div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-slate-600">{s.desc}</p>
                    <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      {s.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-slate-700"><CheckCircle2 className="h-4 w-4 text-emerald-500" />{f}</li>
                      ))}
                    </ul>
                    <a href="#estimator" className="mt-5 inline-flex items-center gap-1 text-orange-600 font-semibold group-hover:gap-2 transition-all">
                      Get quote for this <ArrowRight className="h-4 w-4" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* INSTANT ESTIMATOR (killer feature) */}
      <EstimatorSection />

      {/* WHY US */}
      <Section id="why" className="py-24 bg-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Kicker>Why {BIZ.name}</Kicker>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900">Six reasons customers keep coming back.</h2>
            <p className="mt-4 text-slate-600">Any painter can paint a wall. Fewer show up on time, finish on budget, and stand behind their work in writing. We do.</p>
            <a href="#contact"><Button className="mt-6 bg-slate-900 hover:bg-slate-800 gap-2">Book Free Site Visit <ArrowRight className="h-4 w-4" /></Button></a>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {REASONS.map((r, i) => (
              <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200 p-6 bg-slate-50 hover:bg-white hover:shadow-lg transition-all">
                <div className="h-11 w-11 rounded-xl bg-orange-500/10 text-orange-600 grid place-items-center mb-4"><r.icon className="h-5 w-5" /></div>
                <div className="font-bold text-lg text-slate-900">{r.title}</div>
                <p className="mt-2 text-slate-600 text-sm">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROCESS */}
      <Section id="process" className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-orange-300">
              <Zap className="h-3.5 w-3.5" /> How it works
            </div>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold">Four steps. Zero surprises.</h2>
          </div>
          <div className="mt-14 grid md:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <motion.div key={p.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl p-6 bg-slate-800/50 border border-slate-700 hover:border-orange-400/50 transition-colors">
                <div className="text-6xl font-black text-orange-400/30">{p.n}</div>
                <div className="mt-2 text-xl font-bold">{p.title}</div>
                <p className="mt-2 text-slate-400 text-sm">{p.desc}</p>
                {i < PROCESS.length - 1 && <ArrowRight className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 h-6 w-6 text-orange-400/50" />}
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* PORTFOLIO */}
      <Section id="work" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div className="max-w-2xl">
              <Kicker>Recent work</Kicker>
              <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900">Real projects. Real finishes.</h2>
            </div>
            <a href="#contact" className="text-orange-600 font-semibold inline-flex items-center gap-1">See full portfolio <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[IMAGES.portfolio1, IMAGES.residential, IMAGES.portfolio2, IMAGES.commercial, IMAGES.industrial, IMAGES.hero, IMAGES.portfolio1, IMAGES.residential].map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className={`relative overflow-hidden rounded-2xl group ${i % 5 === 0 ? 'col-span-2 row-span-2' : ''}`}>
                <img src={img} alt="" className={`w-full ${i % 5 === 0 ? 'h-[420px]' : 'h-52'} object-cover group-hover:scale-110 transition-transform duration-700`} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="text-white">
                    <div className="text-xs uppercase tracking-widest text-orange-300">Case study</div>
                    <div className="font-bold">Project #{100 + i}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section id="reviews" className="py-24 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Kicker>Reviews</Kicker>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900">Loved by 1,200+ customers.</h2>
            <div className="mt-4 flex items-center justify-center gap-2">
              {[...Array(5)].map((_,i) => <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />)}
              <span className="ml-2 font-bold text-slate-900">4.9</span>
              <span className="text-slate-500">on Google</span>
            </div>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="border-slate-200 h-full">
                  <CardContent className="p-8">
                    <div className="flex gap-1 mb-3">{[...Array(t.rating)].map((_,i) => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}</div>
                    <p className="text-slate-700 text-lg leading-relaxed">"{t.text}"</p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-gradient-to-br from-slate-800 to-orange-500 grid place-items-center text-white font-bold">{t.name[0]}</div>
                      <div>
                        <div className="font-bold text-slate-900">{t.name}</div>
                        <div className="text-sm text-slate-500">{t.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Kicker>FAQ</Kicker>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900">Common questions.</h2>
            <p className="mt-4 text-slate-600">Still unsure? WhatsApp us — usually replies within 10 minutes.</p>
            <a href={waLink} target="_blank" rel="noreferrer"><Button className="mt-6 bg-green-600 hover:bg-green-700 gap-2"><MessageCircle className="h-4 w-4" />Chat on WhatsApp</Button></a>
          </div>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full">
              {FAQ.map((f, i) => (
                <AccordionItem key={i} value={`i${i}`} className="border-b border-slate-200">
                  <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-orange-600 py-5">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-5">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <ContactSection waLink={waLink} telLink={telLink} />

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-8">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 text-white">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500"><PaintBucket className="h-5 w-5" /></div>
              <div>
                <div className="font-extrabold text-lg">{BIZ.full}</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">{BIZ.tagline}</div>
              </div>
            </div>
            <p className="mt-4 text-sm">Licensed painting contractors serving {BIZ.city} for {BIZ.years}+ years. Residential, commercial & industrial.</p>
          </div>
          <div>
            <div className="text-white font-bold mb-4">Services</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-white">Residential</a></li>
              <li><a href="#services" className="hover:text-white">Commercial</a></li>
              <li><a href="#services" className="hover:text-white">Industrial</a></li>
              <li><a href="#services" className="hover:text-white">Waterproofing</a></li>
              <li><a href="#services" className="hover:text-white">Texture & Wallpaper</a></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-bold mb-4">Company</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#why" className="hover:text-white">Why Us</a></li>
              <li><a href="#work" className="hover:text-white">Portfolio</a></li>
              <li><a href="#reviews" className="hover:text-white">Reviews</a></li>
              <li><a href="#faq" className="hover:text-white">FAQ</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-bold mb-4">Contact</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> {BIZ.phone}</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> {BIZ.email}</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {BIZ.address}</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-6 border-t border-slate-800 text-xs flex flex-wrap justify-between gap-3">
          <div>© {new Date().getFullYear()} {BIZ.full}. All rights reserved.</div>
          <div>Made with care in {BIZ.city}</div>
        </div>
      </footer>

      {/* FLOATING ACTIONS */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
        <a href={waLink} target="_blank" rel="noreferrer" className="group grid h-14 w-14 place-items-center rounded-full bg-green-500 hover:bg-green-600 text-white shadow-2xl transition-transform hover:scale-110">
          <MessageCircle className="h-6 w-6" />
          <span className="absolute right-16 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs text-white opacity-0 group-hover:opacity-100 transition">Chat on WhatsApp</span>
        </a>
        <a href={telLink} className="group grid h-14 w-14 place-items-center rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-2xl transition-transform hover:scale-110">
          <Phone className="h-6 w-6" />
          <span className="absolute right-16 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs text-white opacity-0 group-hover:opacity-100 transition">Call now</span>
        </a>
      </div>
    </main>
  )
}

// ---------- Estimator ----------
function EstimatorSection() {
  const [propertyType, setPropertyType] = useState('residential')
  const [surface, setSurface] = useState('interior')
  const [quality, setQuality] = useState('standard')
  const [area, setArea] = useState(800)
  const [estimate, setEstimate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const canBook = name.trim().length > 1 && phone.trim().length >= 8

  async function calc(persist = false) {
    setLoading(true)
    try {
      const res = await fetch('/api/estimate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyType, surface, quality, area, ...(persist ? { name, phone } : {}) }),
      })
      const data = await res.json()
      setEstimate(data.estimate)
      if (persist) toast.success('Estimate sent! We’ll WhatsApp you shortly.')
    } catch (e) {
      toast.error('Could not calculate. Try again.')
    } finally { setLoading(false) }
  }

  useEffect(() => { calc(false) }, [propertyType, surface, quality, area])

  const fmt = (n) => `₹${n.toLocaleString('en-IN')}`

  return (
    <Section id="estimator" className="py-24 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-12 relative">
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-orange-300">
            <Calculator className="h-3.5 w-3.5" /> Instant Quote
          </div>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">Know your price <span className="paint-stroke">in 30 seconds</span>.</h2>
          <p className="mt-4 text-slate-300 text-lg">Move the sliders, get a real ballpark instantly. Like it? Lock in the price with a free on-site visit — no obligation.</p>
          <div className="mt-8 space-y-4">
            {[
              { icon: CheckCircle2, t: 'Real market rates, not inflated' },
              { icon: CheckCircle2, t: 'Includes paint, prep & labour' },
              { icon: CheckCircle2, t: 'Locked in after site visit' },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-200"><r.icon className="h-5 w-5 text-emerald-400" />{r.t}</div>
            ))}
          </div>
        </div>

        <Card className="lg:col-span-7 bg-white text-slate-900 border-0 shadow-2xl">
          <CardContent className="p-6 md:p-8">
            <Tabs value={propertyType} onValueChange={setPropertyType}>
              <TabsList className="grid grid-cols-3 w-full mb-6">
                <TabsTrigger value="residential" className="gap-1"><Home className="h-4 w-4" />Residential</TabsTrigger>
                <TabsTrigger value="commercial" className="gap-1"><Building2 className="h-4 w-4" />Commercial</TabsTrigger>
                <TabsTrigger value="industrial" className="gap-1"><Factory className="h-4 w-4" />Industrial</TabsTrigger>
              </TabsList>
              <TabsContent value={propertyType} className="mt-0 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-700 font-semibold">Surface</Label>
                    <Select value={surface} onValueChange={setSurface}>
                      <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="interior">Interior walls</SelectItem>
                        <SelectItem value="exterior">Exterior walls</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-700 font-semibold">Paint quality</Label>
                    <Select value={quality} onValueChange={setQuality}>
                      <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (Tractor / Bison)</SelectItem>
                        <SelectItem value="standard">Standard (Apex / Weathercoat)</SelectItem>
                        <SelectItem value="premium">Premium (Royale / Apex Ultima)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-700 font-semibold">Approx. paintable area</Label>
                    <div className="text-orange-600 font-bold">{area.toLocaleString('en-IN')} sqft</div>
                  </div>
                  <Slider value={[area]} min={100} max={20000} step={50} onValueChange={(v) => setArea(v[0])} className="mt-4" />
                  <div className="flex justify-between text-xs text-slate-500 mt-1"><span>100</span><span>10,000</span><span>20,000</span></div>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
                  <div className="text-xs uppercase tracking-widest text-orange-300 font-semibold">Estimated cost</div>
                  <div className="mt-1 text-4xl md:text-5xl font-extrabold">
                    {estimate ? `${fmt(estimate.low)} – ${fmt(estimate.high)}` : '—'}
                  </div>
                  <div className="text-slate-300 text-sm mt-1">
                    {estimate ? `₹${estimate.ratePerSqft}/sqft · includes paint, prep & labour` : 'Adjust sliders'}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                  <Input placeholder="Phone / WhatsApp" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <Button onClick={() => calc(true)} disabled={!canBook || loading}
                  className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white gap-2 text-base">
                  {loading ? 'Saving...' : (<><Sparkles className="h-4 w-4" /> Lock in this quote — free site visit</>)}
                </Button>
                <p className="text-xs text-slate-500 text-center">By submitting, you agree to be contacted about your project. No spam.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}

// ---------- Contact ----------
function ContactSection({ waLink, telLink }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: 'residential', message: '' })
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!form.name || !form.phone) return toast.error('Name and phone are required')
    setLoading(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'contact' }),
      })
      if (!res.ok) throw new Error('failed')
      toast.success('Thanks! We’ll reach out within 30 minutes.')
      setForm({ name: '', phone: '', email: '', service: 'residential', message: '' })
    } catch (err) { toast.error('Something went wrong. Try WhatsApp instead.') }
    finally { setLoading(false) }
  }

  return (
    <Section id="contact" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <Kicker>Get in touch</Kicker>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900">Let’s paint your space.</h2>
          <p className="mt-4 text-slate-600 text-lg">Tell us a bit about your project. We’ll call or WhatsApp you within 30 minutes on business hours.</p>
          <div className="mt-8 space-y-4">
            <a href={telLink} className="flex items-center gap-4 p-4 rounded-2xl bg-white border hover:border-orange-400 transition-colors">
              <div className="h-11 w-11 rounded-xl bg-orange-500 text-white grid place-items-center"><Phone className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Call</div>
                <div className="font-bold text-slate-900">{BIZ.phone}</div>
              </div>
            </a>
            <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white border hover:border-green-400 transition-colors">
              <div className="h-11 w-11 rounded-xl bg-green-500 text-white grid place-items-center"><MessageCircle className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">WhatsApp</div>
                <div className="font-bold text-slate-900">Chat now — replies in ~10 min</div>
              </div>
            </a>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border">
              <div className="h-11 w-11 rounded-xl bg-slate-900 text-white grid place-items-center"><MapPin className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Serving</div>
                <div className="font-bold text-slate-900">{BIZ.city} · {BIZ.address}</div>
              </div>
            </div>
          </div>
        </div>

        <Card className="lg:col-span-7 border-0 shadow-2xl">
          <CardContent className="p-8">
            <form onSubmit={submit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Full name *</Label>
                  <Input className="mt-2" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
                </div>
                <div>
                  <Label>Phone *</Label>
                  <Input className="mt-2" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98xxx xxxxx" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Email (optional)</Label>
                  <Input className="mt-2" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
                </div>
                <div>
                  <Label>Service</Label>
                  <Select value={form.service} onValueChange={v => setForm({ ...form, service: v })}>
                    <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential Painting</SelectItem>
                      <SelectItem value="commercial">Commercial Painting</SelectItem>
                      <SelectItem value="industrial">Industrial Painting</SelectItem>
                      <SelectItem value="waterproofing">Waterproofing</SelectItem>
                      <SelectItem value="texture">Texture / Wallpaper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Tell us about your project</Label>
                <Textarea className="mt-2" rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="E.g. 3BHK repainting, need in July, prefer Royale finish" />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-base gap-2">
                {loading ? 'Sending...' : (<>Request Free Site Visit <ArrowRight className="h-4 w-4" /></>)}
              </Button>
              <p className="text-xs text-slate-500 text-center">Zero spam. Zero pushy sales calls. Just an honest quote.</p>
            </form>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
