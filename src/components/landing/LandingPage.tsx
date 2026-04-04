import { motion } from 'motion/react';
import { Shield, Activity, Users, ArrowRight, Lock, CheckCircle, Smartphone, Globe, Eye, FileUser, BarChart, Box, FileText } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export function LandingPage({ onEnter }: LandingPageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-navy-950 text-white selection:bg-orange-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-navy-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center">
              <img src="/logo.png" alt="Medic Vault Logo" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight">Medic Vault</span>
          </div>

          {/* Centered Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">How it works</a>
            <a href="#public-archives" className="hover:text-white transition-colors">Public Medical Folders</a>
            <a href="#" className="hover:text-white transition-colors">Hierarchy</a>
            <a href="#" className="hover:text-white transition-colors">About us</a>
            <a href="#" className="hover:text-white transition-colors">Get Help</a>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={onEnter}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={onEnter}
              className="bg-orange-primary text-white px-5 sm:px-6 py-2.5 rounded-md text-sm font-medium hover:bg-gray-100 hover:text-orange-primary transition-all hover:scale-105 active:scale-95"
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-10 px-6 relative overflow-hidden">
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FF6200 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}
        />

        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-orange-primary/10 rounded-full blur-[140px] -z-10" />

        <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-12 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 max-w-4xl"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-white"
            >
              Secure cloud storage <br />
              for your medical files
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              A complete platform designed to simplify medical file storage and enhance productivity for health institutions.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 justify-center pt-2">
              <button
                onClick={onEnter}
                className="bg-orange-primary text-white px-8 py-4 rounded-md text-base font-medium hover:bg-gray-100 hover:text-orange-primary transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5 w-full sm:w-auto"
              >
                Onboard your institution
              </button>
              <button
                onClick={onEnter}
                className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-4 rounded-md text-base font-medium transition-all w-full sm:w-auto"
              >
                Explore public medical folders
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="relative w-full max-w-6xl mt-8"
          >
            {/* Soft Glow under image */}
            <div className="absolute -inset-10 bg-orange-primary/20 blur-[100px] rounded-full opacity-20 pointer-events-none" />

            <div className="relative group">
              <div className="" />
              <img
                src="/hero_vault.webp"
                alt="Medic Vault Dashboard Mockup"
                className="relative w-full h-auto object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Trust Stats Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-10 lg:gap-24 pt-20"
          >
            <div className="text-center space-y-1">
              <div className="text-3xl lg:text-4xl font-bold text-white tracking-tighter">99.9%</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-[0.25em] font-bold">Uptime</div>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <div className="text-center space-y-1">
              <div className="text-3xl lg:text-4xl font-bold text-white tracking-tighter">AES-256</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-[0.25em] font-bold">Encryption</div>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <div className="text-center space-y-1">
              <div className="text-3xl lg:text-4xl font-bold text-white tracking-tighter">ISO-27k</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-[0.25em] font-bold">Certified</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight">Built for Medical Excellence</h2>
            <p className="text-gray-400 text-lg">Medic Vault provides the critical infrastructure needed to handle sensitive medical data at scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Lock,
                title: "Bank-Grade Encryption",
                desc: "Every file is encrypted using AES-256 both at rest and in transit, ensuring total privacy.",
                color: "text-white",
                bg: "bg-white/5"
              },
              {
                icon: Activity,
                title: "Real-time Monitoring",
                desc: "Track every access attempt with granular audit logs and instant security alerts.",
                color: "text-white",
                bg: "bg-white/5"
              },
              {
                icon: Users,
                title: "Seamless Collaboration",
                desc: "Securely share records between departments and external specialists with one click.",
                color: "text-white",
                bg: "bg-white/5"
              },
              {
                icon: Smartphone,
                title: "Mobile Portability",
                desc: "Access critical patient data from any device, anywhere, with our optimized mobile vault.",
                color: "text-white",
                bg: "bg-white/5"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                className="glass-card p-4 group relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${feature.bg} rounded-full blur-3xl -mr-16 -mt-16 group-hover:opacity-100 opacity-50 transition-opacity`} />
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform relative z-10`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-semibold mb-4 relative z-10">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed relative z-10">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-32 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight">Your health data flow, <br />reimagined for speed.</h2>
                <p className="text-gray-400 text-lg leading-relaxed">We've eliminated the friction in medical records management. From ingestion to audit, every step is optimized for security and performance.</p>
              </div>

              <div className="space-y-8">
                {[
                  { step: "01", title: "Secure Ingestion", desc: "Drag and drop any lab result, scan, or prescription into your encrypted vault." },
                  { step: "02", title: "Automated Indexing", desc: "Our AI automatically categorizes and tags records for instant retrieval." },
                  { step: "03", title: "Controlled Access", desc: "Grant granular permissions to specialists or emergency responders as needed." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-orange-primary/30 flex items-center justify-center text-orange-primary font-bold group-hover:bg-orange-primary group-hover:text-white transition-all">
                      {item.step}
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-white">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-orange-primary/10 blur-[100px] rounded-full" />
              <div className="glass-card p-4 lg:p-8 relative overflow-hidden group">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-xs text-gray-500 font-mono tracking-widest">ENCRYPTION_LAYER_ACTIVE</div>
                  </div>
                  <div className="font-mono text-xs lg:text-sm text-orange-primary/80 space-y-2">
                    <p className="text-gray-500">// Initializing AES-256-GCM...</p>
                    <p>{">"} Loading patient_record_772.vault</p>
                    <p>{">"} Applying polymorphic encryption layer</p>
                    <p className="text-emerald-400">{">"} Success: Record vaulted in 42ms</p>
                    <div className="pt-4 grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                        <p className="text-gray-500 text-[10px] mb-1 uppercase">Hash Key</p>
                        <p className="truncate">f2d9...8a1b</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                        <p className="text-gray-500 text-[10px] mb-1 uppercase">Auth Status</p>
                        <p className="text-emerald-400">Verified</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative scanning line */}
                <motion.div
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-primary to-transparent opacity-50 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Public Medical Archives Section */}
      <section id="public-archives" className="py-40 px-6 relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Section Header - Split Layout */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-24">
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center gap-4 text-gray-500 font-medium tracking-[0.2em] uppercase text-xs">
                <span className="w-8 h-px bg-gray-800" />
                Public Archives
                <span className="w-8 h-px bg-gray-800" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight leading-tight font-sans">
                Secure dissemination for <span className="text-orange-primary ">Research & Training</span>
              </h2>
            </div>
            <div className="max-w-md lg:text-right">
              <p className="text-gray-400 text-lg leading-relaxed">
                We combine high-level encryption with public accessibility to help institutions share critical datasets. Our solutions turn raw data into accessible experiences that connect, inspire, and drive clinical impact.
              </p>
            </div>
          </div>

          {/* Staggered Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
            {[
              {
                icon: FileUser,
                label: "Training Case Studies",
                value: "15k+",
                delay: 0,
                offset: "lg:mt-0",
                color: "text-white"
              },
              {
                icon: BarChart,
                label: "Trusted Health Partners",
                value: "120+",
                delay: 0.1,
                offset: "lg:mt-20",
                color: "text-white"
              },
              {
                icon: Box,
                label: "Public Folders Created",
                value: "450+",
                delay: 0.2,
                offset: "lg:mt-8",
                color: "text-white"
              },
              {
                icon: FileText,
                label: "Compliance Guidelines",
                value: "08+",
                delay: 0.3,
                offset: "lg:mt-28",
                color: "text-white"
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: card.delay, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className={`relative group ${card.offset}`}
              >
                <div className={`
                  ${card.highlight
                    ? "bg-gradient-to-br from-orange-primary/20 via-navy-900 to-navy-950 border-orange-primary/20"
                    : "bg-[#0A0A0A] border-white/5"}
                  border p-6 lg:p-7 flex flex-col justify-between transition-all duration-500
                `}>
                  {/* Decorative Corners */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="space-y-8 h-full flex flex-col justify-between relative z-10">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/40 group-hover:bg-white/5 transition-colors">
                      <card.icon className={`w-6 h-6 ${card.color}`} />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-4xl lg:text-5xl font-bold text-white tracking-tighter">
                        {card.value}
                      </h3>
                      <p className="text-gray-500 opacity-50 font-light text-sm lg:text-base leading-tight max-w-[140px]">
                        {card.label}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section / Logo Cloud */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-medium opacity-50 text-gray-800 uppercase tracking-[0.2em] mb-12">Trusted by Clinical Leaders Worldwide</p>
          <div className="flex flex-wrap justify-between items-center gap-12 lg:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="text-2xl font-black italic tracking-tighter uppercase group cursor-default">
              <span className="group-hover:text-orange-primary transition-colors">Health</span>Link
            </div>
            <div className="text-2xl font-black italic tracking-tighter uppercase group cursor-default">
              <span className="group-hover:text-blue-400 transition-colors">Medi</span>Core
            </div>
            <div className="text-2xl font-black italic tracking-tighter uppercase group cursor-default">
              <span className="group-hover:text-emerald-400 transition-colors">Bio</span>Vault
            </div>
            <div className="text-2xl font-black italic tracking-tighter uppercase group cursor-default">
              <span className="group-hover:text-purple-400 transition-colors">Omni</span>Med
            </div>
            <div className="text-2xl font-black italic tracking-tighter uppercase group cursor-default">
              <span className="group-hover:text-red-400 transition-colors">Pulse</span>Care
            </div>
          </div>
        </div>
      </section>

      {/* Security CTA Section */}
      <section className="py-40 px-6 relative overflow-hidden bg-navy-950 border-y border-white/5">
        {/* Glow & Grid Effects */}
        <div className="absolute inset-0 grid-pattern [mask-image:radial-gradient(ellipse_at_center,black,transparent)] opacity-40 -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full max-h-[600px] bg-orange-primary/10 rounded-full blur-[140px] -z-20 opacity-60" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mx-auto mb-8 shadow-2xl backdrop-blur-xl"
          >
            <img src="/logo.png" alt="Medic Vault" className="w-10 h-10 object-contain" />
          </motion.div>

          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight leading-tight">
              Ready to secure your <br />clinical workspace?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Join thousands of medical professionals who trust Medic Vault for their most sensitive records. Secure, compliant, and infinitely scalable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center pt-8">
            <button
              onClick={onEnter}
              className="bg-orange-primary text-white px-6 py-4 rounded-md text-lg font-medium hover:bg-white hover:text-orange-primary transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-orange-primary/20 flex items-center gap-3"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 bg-black border-t border-white/5 overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            {/* Branding Column */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Logo" className="w-8 h-8" />
                <span className="text-xl font-bold tracking-tight">Medic Vault</span>
              </div>
              <p className="text-gray-500 text-base leading-relaxed max-w-sm">
                Empowering healthcare providers with state-of-the-art cryptographic security and seamless medical record management.
              </p>
              <div className="text-xs text-gray-600 font-medium">
                © {new Date().getFullYear()} Medic Vault. All rights reserved.
              </div>
            </div>

            {/* Pages Column */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-8">Pages</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-8">Resources</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Licenses</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Style Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
              </ul>
            </div>

            {/* Social Column */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-8">Social Media</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">X (Twitter)</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 text-[11px] text-gray-600 flex flex-col md:flex-row justify-between gap-6 items-center">
            <div className="flex gap-8 uppercase tracking-[0.2em] font-semibold">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
            <div className="text-gray-500 tracking-widest">
              Designed by Sam
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
