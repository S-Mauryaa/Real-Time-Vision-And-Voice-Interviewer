import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import {
  Sparkles, Zap, Shield, BarChart3, Clock, CheckCircle2,
  ArrowRight, Play, Star, ChevronRight, Brain, Users, Building2,
} from 'lucide-react';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { Button } from '@/components/common/Button';
import { ROUTES } from '@/constants';

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-16">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-8"
        >
          <Sparkles className="w-3.5 h-3.5" />
          AI-Powered Technical Interviews
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text leading-tight tracking-tight"
        >
          Interview Smarter,
          <br />
          <span className="text-primary">Hire Better.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
        >
          InterviewAI conducts fully autonomous technical interviews — evaluating
          coding, system design, and communication skills with real-time AI analysis
          and comprehensive scorecards.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link to={ROUTES.REGISTER}>
            <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Start Interviewing Free
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            leftIcon={<Play className="w-4 h-4" />}
          >
            Watch Demo
          </Button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 flex items-center justify-center gap-6 text-sm text-text-muted"
        >
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-accent fill-accent" />)}
            </div>
            <span>4.9 / 5 rating</span>
          </div>
          <span className="hidden sm:block w-px h-4 bg-border" />
          <span>10,000+ interviews conducted</span>
          <span className="hidden sm:block w-px h-4 bg-border" />
          <span>500+ companies trust us</span>
        </motion.div>

        {/* Preview card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-16 relative max-w-4xl mx-auto"
        >
          <div className="rounded-card-lg border border-border shadow-modal bg-white overflow-hidden">
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-neutral-50 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 mx-4 h-6 rounded bg-neutral-200 flex items-center px-3">
                <span className="text-xs text-neutral-400">interviewai.app/interview/live</span>
              </div>
            </div>
            {/* Interview room preview */}
            <div className="grid grid-cols-3 gap-0 h-64 sm:h-80">
              {/* AI side */}
              <div className="col-span-2 bg-neutral-900 flex flex-col items-center justify-center gap-4 p-6">
                <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                  <Brain className="w-10 h-10 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-white font-medium text-sm">AI Interviewer</p>
                  <p className="text-neutral-400 text-xs mt-1">Explain the difference between useMemo and useCallback…</p>
                </div>
                {/* Waveform */}
                <div className="flex items-end gap-1 h-6">
                  {[3,6,9,5,7,10,4,8,6,3,7,5].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-full bg-primary animate-waveform"
                      style={{ height: `${h * 2}px`, animationDelay: `${i * 0.07}s` }}
                    />
                  ))}
                </div>
              </div>
              {/* Candidate side */}
              <div className="bg-neutral-800 flex flex-col items-center justify-center gap-2 p-4">
                <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <p className="text-white text-xs font-medium">Alex Morgan</p>
                <div className="flex gap-2 mt-2">
                  <div className="w-7 h-7 rounded-full bg-neutral-700 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-success" />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-neutral-700 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-success" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  { icon: <Brain className="w-5 h-5" />, title: 'AI Interviewer', desc: 'Natural, conversational AI that adapts questions based on your responses in real time.' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Deep Scorecards', desc: 'Instant scores across technical ability, communication, problem solving and confidence.' },
  { icon: <Zap className="w-5 h-5" />, title: 'Instant Feedback', desc: 'Detailed feedback and personalized improvement tips within seconds of completing.' },
  { icon: <Shield className="w-5 h-5" />, title: 'Bias-Free Evaluation', desc: 'Objective, consistent scoring eliminates unconscious bias from your hiring process.' },
  { icon: <Clock className="w-5 h-5" />, title: 'Any Time, Anywhere', desc: 'Candidates interview on their schedule — no calendars, no back-and-forth emails.' },
  { icon: <CheckCircle2 className="w-5 h-5" />, title: 'Custom Questions', desc: 'Tailor interview topics, difficulty levels and question sets for each role.' },
];

function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-heading-1 font-bold text-text"
          >
            Everything you need for world-class interviews
          </motion.h2>
          <motion.p
            variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mt-4 text-text-secondary text-lg"
          >
            From scheduling to scorecards — InterviewAI handles the entire technical screening workflow.
          </motion.p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp} custom={i * 0.5} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="p-6 rounded-card-lg border border-border bg-background hover:shadow-card-hover hover:border-primary/30 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-card-sm bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                {f.icon}
              </div>
              <h3 className="font-semibold text-text mb-2">{f.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
const steps = [
  { num: '01', title: 'Company creates interview', desc: 'Set the role, topics, difficulty and duration. Share the invite link with candidates.' },
  { num: '02', title: 'Candidate joins & sets up', desc: 'Camera and microphone check, then enter the fully immersive interview room.' },
  { num: '03', title: 'AI conducts the interview', desc: 'Conversational AI asks adaptive questions, listens, and evaluates responses live.' },
  { num: '04', title: 'Scorecard delivered instantly', desc: 'Both parties receive detailed scores, feedback and a hiring recommendation.' },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-heading-1 font-bold text-text"
          >
            Up and running in minutes
          </motion.h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              variants={fadeUp} custom={i * 0.5} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(100%+1rem)] w-8 border-t-2 border-dashed border-border -translate-y-px" />
              )}
              <div className="text-4xl font-bold text-primary/20 mb-3">{s.num}</div>
              <h3 className="font-semibold text-text mb-2">{s.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Split section — Candidates & Companies ───────────────────────────────────
function AudienceSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
        {/* Candidates */}
        <motion.div
          id="candidates"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="rounded-card-lg bg-primary/5 border border-primary/20 p-8"
        >
          <div className="w-12 h-12 rounded-card-sm bg-primary/10 flex items-center justify-center text-primary mb-6">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-heading-2 font-bold text-text mb-4">For Candidates</h2>
          <ul className="space-y-3 mb-8">
            {['Interview on your own schedule', 'Get instant, actionable feedback', 'Build confidence with practice sessions', 'Stand out with an objective scorecard'].map(b => (
              <li key={b} className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                {b}
              </li>
            ))}
          </ul>
          <Link to={`${ROUTES.REGISTER}?role=candidate`}>
            <Button rightIcon={<ChevronRight className="w-4 h-4" />}>
              Create Candidate Account
            </Button>
          </Link>
        </motion.div>

        {/* Companies */}
        <motion.div
          id="companies"
          variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="rounded-card-lg bg-accent/5 border border-accent/20 p-8"
        >
          <div className="w-12 h-12 rounded-card-sm bg-accent/10 flex items-center justify-center text-accent-dark mb-6">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-heading-2 font-bold text-text mb-4">For Companies</h2>
          <ul className="space-y-3 mb-8">
            {['Screen 10x more candidates in less time', 'Eliminate scheduling headaches', 'Consistent, bias-free evaluation criteria', 'Exportable reports for your ATS'].map(b => (
              <li key={b} className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle2 className="w-4 h-4 text-accent-dark shrink-0" />
                {b}
              </li>
            ))}
          </ul>
          <Link to={`${ROUTES.REGISTER}?role=company`}>
            <Button variant="outline" rightIcon={<ChevronRight className="w-4 h-4" />}>
              Create Company Account
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { value: '10K+', label: 'Interviews Conducted' },
  { value: '500+', label: 'Companies Hiring' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '85%', label: 'Hire Rate Increase' },
];

function Stats() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp} custom={i * 0.3} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-sm text-white/70">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-heading-1 font-bold text-text mb-4"
        >
          Ready to transform your hiring?
        </motion.h2>
        <motion.p
          variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-text-secondary text-lg mb-8"
        >
          Join thousands of companies and candidates using InterviewAI to make better hiring decisions, faster.
        </motion.p>
        <motion.div
          variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link to={ROUTES.REGISTER}>
            <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Get Started — It's Free
            </Button>
          </Link>
          <Link to={ROUTES.LOGIN}>
            <Button variant="outline" size="lg">Sign In</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-border bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-semibold text-text">
          <div className="w-7 h-7 rounded-card-sm bg-primary flex items-center justify-center">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
          InterviewAI
        </div>
        <p className="text-sm text-text-muted">© {new Date().getFullYear()} InterviewAI. All rights reserved.</p>
        <div className="flex gap-4 text-sm text-text-muted">
          <a href="#" className="hover:text-text transition-colors">Privacy</a>
          <a href="#" className="hover:text-text transition-colors">Terms</a>
          <a href="#" className="hover:text-text transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <PublicNavbar />
      <Hero />
      <Features />
      <HowItWorks />
      <AudienceSection />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
}
