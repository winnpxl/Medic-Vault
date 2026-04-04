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
            <div className="w-10 h-10 bg-gradient-to-br from-orange-primary to-orange-secondary rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Medic Vault</span>
          </div>
          <button 
            onClick={onEnter}
            className="btn-primary hover:scale-105 active:scale-95 transition-transform"
          >
            Enter Vault
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex-1 space-y-8 text-center lg:text-left"
          >
            <motion.div variants={itemVariants}>
              <span className="px-4 py-2 rounded-full bg-orange-primary/10 border border-orange-primary/20 text-orange-primary text-xs font-semibold uppercase tracking-widest">
                Trusted by 500+ Medical Institutions
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              Your Medical Records, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-primary to-orange-secondary">
                Securely Vaulted.
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              The complete people platform designed to simplify medical files storage, enhance doctor-patient collaboration, and maximize clinical productivity.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
              <button 
                onClick={onEnter}
                className="btn-primary px-8 py-4 text-lg w-full sm:w-auto"
              >
                Access Dashboard
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-secondary px-8 py-4 text-lg w-full sm:w-auto">
                Watch Demo
              </button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-white/5"
            >
              <div className="space-y-1">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-xs text-gray-500 uppercase tracking-tighter">Uptime Guaranteed</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="space-y-1">
                <div className="text-2xl font-bold">ISO 27001</div>
                <div className="text-xs text-gray-500 uppercase tracking-tighter">Security Certified</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="space-y-1">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-xs text-gray-500 uppercase tracking-tighter">Support Available</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 relative w-full aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-primary/20 to-transparent rounded-3xl blur-3xl opacity-30 animate-pulse" />
            <img 
              src="/hero_vault.png" 
              alt="Futuristic Medical Vault" 
              className="relative z-10 w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
            />
            
            {/* Floating Stats Cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 z-20 glass-card p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Security Status</div>
                <div className="text-sm font-bold text-white uppercase tracking-wider">Vault Locked</div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-8 -left-8 z-20 glass-card p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-orange-primary/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-orange-primary" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Total Records</div>
                <div className="text-xl font-black text-white">2.4M+</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold">Built for Medical Excellence</h2>
            <p className="text-gray-400">Medic Vault provides the critical infrastructure needed to handle sensitive medical data at scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Lock, 
                title: "Bank-Grade Encryption", 
                desc: "Every file is encrypted using AES-256 both at rest and in transit.",
                color: "text-blue-400"
              },
              { 
                icon: Activity, 
                title: "Real-time Monitoring", 
                desc: "Track every access attempt with granular audit logs and alerts.",
                color: "text-orange-primary"
              },
              { 
                icon: Users, 
                title: "Seamless Collaboration", 
                desc: "Securely share records between departments and external specialists.",
                color: "text-purple-400"
              },
              { 
                icon: Smartphone, 
                title: "Mobile Portability", 
                desc: "Access critical patient data from any device, anywhere, anytime.",
                color: "text-emerald-400"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="glass-card p-8 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all">
            <div className="text-2xl font-black italic tracking-tighter uppercase">HealthLink</div>
            <div className="text-2xl font-black italic tracking-tighter uppercase">MediCore</div>
            <div className="text-2xl font-black italic tracking-tighter uppercase">BioVault</div>
            <div className="text-2xl font-black italic tracking-tighter uppercase">OmniMed</div>
            <div className="text-2xl font-black italic tracking-tighter uppercase">PulseCare</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-orange-primary" />
            <span className="font-bold tracking-tight">Medic Vault</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Security Architecture</a>
          </div>
          <div className="text-xs text-gray-600">
            © 2026 Medic Vault. Designed with intent.
          </div>
        </div>
      </footer>
    </div>
  );
}
