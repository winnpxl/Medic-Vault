import { motion } from 'motion/react';
import { Shield, Activity, Users, ArrowRight, Lock, CheckCircle, Smartphone } from 'lucide-react';

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
            <a href="#" className="hover:text-white transition-colors">Public Medical Folders</a>
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
              className="bg-white text-black px-5 sm:px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
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
                className="bg-white text-black px-8 py-4 rounded-full text-base font-bold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5 w-full sm:w-auto"
              >
                Onboard your institution
              </button>
              <button
                onClick={onEnter}
                className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-4 rounded-full text-base font-bold transition-all w-full sm:w-auto"
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
                src="/hero_vault.png"
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
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">Built for Medical Excellence</h2>
            <p className="text-gray-400 text-lg">Medic Vault provides the critical infrastructure needed to handle sensitive medical data at scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Lock,
                title: "Bank-Grade Encryption",
                desc: "Every file is encrypted using AES-256 both at rest and in transit, ensuring total privacy.",
                color: "text-blue-400",
                bg: "bg-blue-400/5"
              },
              {
                icon: Activity,
                title: "Real-time Monitoring",
                desc: "Track every access attempt with granular audit logs and instant security alerts.",
                color: "text-orange-primary",
                bg: "bg-orange-primary/5"
              },
              {
                icon: Users,
                title: "Seamless Collaboration",
                desc: "Securely share records between departments and external specialists with one click.",
                color: "text-purple-400",
                bg: "bg-purple-400/5"
              },
              {
                icon: Smartphone,
                title: "Mobile Portability",
                desc: "Access critical patient data from any device, anywhere, with our optimized mobile vault.",
                color: "text-emerald-400",
                bg: "bg-emerald-400/5"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                className="glass-card p-10 group relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${feature.bg} rounded-full blur-3xl -mr-16 -mt-16 group-hover:opacity-100 opacity-50 transition-opacity`} />
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform relative z-10`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4 relative z-10">{feature.title}</h3>
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
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Your health data flow, <br />reimagined for speed.</h2>
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

      {/* Trust Section / Logo Cloud */}
      <section className="py-24 border-y border-white/5 bg-white/[0.02] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-[0.2em] mb-12">Trusted by Clinical Leaders Worldwide</p>
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
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full max-h-[500px] bg-orange-primary/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-4xl mx-auto glass-card p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32" />

          <div className="space-y-10 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
              <Lock className="w-4 h-4 text-orange-primary" />
              HIPAA & GDPR Compliant Infrastructure
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
              Ready to secure your <br />clinical workspace?
            </h2>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Join thousands of medical professionals who trust Medic Vault for their most sensitive records. Secure, compliant, and infinitely scalable.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center pt-4">
              <button
                onClick={onEnter}
                className="btn-primary px-12 py-6 text-xl w-full sm:w-auto shadow-2xl shadow-orange-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                Get Started Now
                <ArrowRight className="w-6 h-6" />
              </button>
              <button className="flex items-center gap-3 text-lg font-semibold hover:text-orange-primary transition-colors">
                Contact Sales Team
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src="/logo.png" alt="Medic Vault Logo" className="w-7 h-7 object-contain" />
                </div>
                <span className="text-xl font-bold tracking-tight">Medic Vault</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Empowering healthcare providers with state-of-the-art cryptographic security and seamless medical record management.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-white uppercase text-xs tracking-widest">Platform</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">Security Architecture</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance Certs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Vault Engine</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-white uppercase text-xs tracking-widest">Company</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trust Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal Details</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-white uppercase text-xs tracking-widest">Stay Updated</h4>
              <div className="flex gap-2">
                <input type="email" placeholder="email@vault.com" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:border-orange-primary/50" />
                <button className="bg-orange-primary p-2 rounded-lg hover:bg-orange-primary/90 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-gray-600">Join our newsletter for the latest in health tech security.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
            <div className="text-xs text-gray-600">
              © 2026 Medic Vault Infrastructure. All rights reserved.
            </div>
            <div className="flex gap-8 text-[11px] text-gray-600 uppercase tracking-widest font-semibold">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
