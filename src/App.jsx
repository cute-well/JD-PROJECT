import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Check,
  FileText,
  LayoutTemplate,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react'
import { motion } from 'framer-motion'
import './App.css'

const navLinks = ['Features', 'How it Works', 'Testimonials', 'Pricing', 'FAQ']

const features = [
  { icon: Sparkles, title: 'AI Resume Builder', desc: 'Create recruiter-ready resumes in minutes with role-aware suggestions.' },
  { icon: LayoutTemplate, title: 'Smart Portfolio', desc: 'Turn your achievements into a modern portfolio with one click.' },
  { icon: Zap, title: 'ATS Optimization', desc: 'Get live score feedback to maximize interview callbacks.' },
]

const steps = [
  { title: 'Connect your profile', desc: 'Import work history, projects, and goals from your existing resume or LinkedIn.' },
  { title: 'Customize with AI', desc: 'CareerCanvas tailors your resume and portfolio for your target role.' },
  { title: 'Launch confidently', desc: 'Export polished documents and track ATS readiness before applying.' },
]

const testimonials = [
  { quote: 'CareerCanvas helped me land 3 interviews in one week.', name: 'Maya R.', role: 'Product Designer' },
  { quote: 'The ATS score preview instantly showed what recruiters needed.', name: 'Daniel K.', role: 'Data Analyst' },
  { quote: 'My portfolio finally looks premium and cohesive.', name: 'Ayesha L.', role: 'Frontend Engineer' },
]

const plans = [
  { name: 'Starter', price: '$0', details: 'Great for first-time job seekers', points: ['1 Resume', 'Basic ATS insights', 'Community templates'] },
  { name: 'Pro', price: '$19', details: 'For serious applicants', points: ['Unlimited resumes', 'Advanced ATS analysis', 'Portfolio customization'], featured: true },
  { name: 'Teams', price: '$49', details: 'Demo pricing for career coaches', points: ['Team workspace', 'Brand presets', 'Priority support'] },
]

const faqs = [
  { q: 'Is pricing live?', a: 'This section is demo-only for landing page preview purposes.' },
  { q: 'Can I edit exported resume files?', a: 'Yes, exports are provided in editable formats with clean structure.' },
  { q: 'Does it support multiple job targets?', a: 'Yes, you can generate tailored versions for each role.' },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
}

function App() {
  return (
    <div className="page">
      <div className="aurora" aria-hidden="true" />

      <header className="nav-wrap">
        <nav className="nav glass">
          <div className="brand"><Briefcase size={18} /> CareerCanvas AI</div>
          <div className="nav-links">
            {navLinks.map((link) => (
              <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} key={link}>{link}</a>
            ))}
          </div>
          <button className="btn btn-small">Get Started</button>
        </nav>
      </header>

      <main>
        <section className="hero section" id="hero">
          <motion.p className="eyebrow" {...fadeUp}><BadgeCheck size={14} /> Trusted by modern job seekers</motion.p>
          <motion.h1 {...fadeUp} transition={{ duration: 0.7, delay: 0.05 }}>
            Build your dream career brand with AI-crafted resumes & portfolios.
          </motion.h1>
          <motion.p className="subtext" {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
            Premium documents, ATS confidence, and standout visuals in one seamless workspace.
          </motion.p>
          <motion.div className="hero-cta" {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }}>
            <button className="btn">Start Free <ArrowRight size={16} /></button>
            <button className="btn btn-ghost">View Demo</button>
          </motion.div>

          <motion.div className="hero-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <motion.article className="glass card resume" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}>
              <h3><FileText size={16} /> Resume Preview</h3>
              <div className="mock-lines"><span /><span /><span /><span /></div>
            </motion.article>
            <motion.article className="glass card portfolio" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}>
              <h3><LayoutTemplate size={16} /> Portfolio Preview</h3>
              <div className="mock-tiles"><span /><span /><span /></div>
            </motion.article>
            <motion.article className="glass card ats" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}>
              <h3><Zap size={16} /> ATS Score</h3>
              <p className="score">92%</p>
              <div className="progress"><i /></div>
            </motion.article>
          </motion.div>
        </section>

        <section className="section" id="features">
          <motion.h2 {...fadeUp}>Everything you need to stand out</motion.h2>
          <div className="feature-grid">
            {features.map(({ icon: Icon, title, desc }, idx) => (
              <motion.article className="glass feature" key={title} {...fadeUp} transition={{ duration: 0.55, delay: idx * 0.08 }}>
                <Icon className="feature-icon" size={18} />
                <h3>{title}</h3>
                <p>{desc}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section" id="how-it-works">
          <motion.h2 {...fadeUp}>How it Works</motion.h2>
          <div className="timeline">
            {steps.map((step, idx) => (
              <motion.div className="timeline-item" key={step.title} {...fadeUp} transition={{ duration: 0.55, delay: idx * 0.1 }}>
                <span>{idx + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="section" id="testimonials">
          <motion.h2 {...fadeUp}>Loved by applicants worldwide</motion.h2>
          <div className="testimonial-grid">
            {testimonials.map((item, idx) => (
              <motion.article className="glass testimonial" key={item.name} {...fadeUp} transition={{ duration: 0.55, delay: idx * 0.08 }}>
                <div className="stars">{Array.from({ length: 5 }).map((_, i) => <Star size={14} key={i} />)}</div>
                <p>“{item.quote}”</p>
                <small>{item.name} · {item.role}</small>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section" id="pricing">
          <motion.h2 {...fadeUp}>Pricing (Demo)</motion.h2>
          <div className="pricing-grid">
            {plans.map((plan, idx) => (
              <motion.article className={`glass plan ${plan.featured ? 'featured' : ''}`} key={plan.name} {...fadeUp} transition={{ duration: 0.55, delay: idx * 0.08 }}>
                <h3>{plan.name}</h3>
                <p className="price">{plan.price}<span>/mo</span></p>
                <p className="muted">{plan.details}</p>
                <ul>
                  {plan.points.map((point) => (
                    <li key={point}><Check size={14} /> {point}</li>
                  ))}
                </ul>
                <button className="btn btn-full">Choose Plan</button>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section" id="faq">
          <motion.h2 {...fadeUp}>Frequently asked questions</motion.h2>
          <div className="faq-list">
            {faqs.map((item, idx) => (
              <motion.details className="glass faq" key={item.q} {...fadeUp} transition={{ duration: 0.5, delay: idx * 0.06 }}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </motion.details>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer glass">
        <p>© {new Date().getFullYear()} CareerCanvas AI · Build careers with confidence.</p>
        <button className="btn btn-small">Try CareerCanvas</button>
      </footer>
    </div>
  )
}

export default App
