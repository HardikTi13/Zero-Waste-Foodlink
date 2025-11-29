import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ArrowRight,
    Mail,
    Lock,
    User,
    Loader2,
    Leaf,
    ChefHat,
    HeartHandshake
} from 'lucide-react';

type AuthMode = 'LOGIN' | 'SIGNUP';
type UserRole = 'RESTAURANT' | 'NGO';

export default function AuthPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { initialMode, initialRole } = location.state || {};

    const [mode, setMode] = useState<AuthMode>(initialMode || 'LOGIN');
    const [role, setRole] = useState<UserRole | null>(initialRole || null);
    const [loading, setLoading] = useState(false);

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!role) return;

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            if (role === 'NGO') {
                navigate('/ngo-dashboard');
            } else {
                navigate('/restaurant-dashboard');
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex items-center justify-center p-4 font-sans selection:bg-emerald-200 selection:text-emerald-900 dark:selection:bg-emerald-900 dark:selection:text-emerald-200 overflow-hidden relative transition-colors duration-300">

            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/vid.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px]" />
            </div>

            {/* SVG Filter for Liquid Glass Effect */}
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                    <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.025 0.025"
                            numOctaves="2"
                            seed="92"
                            result="noise"
                        />
                        <feGaussianBlur
                            in="noise"
                            stdDeviation="2"
                            result="blurred"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="blurred"
                            scale="30"
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </defs>
            </svg>

            <style>{`
                .liquid-glass-card {
                    position: relative;
                    isolation: isolate;
                }
                
                .liquid-glass-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    border-radius: 24px;
                    box-shadow: inset 0 0 12px -2px rgba(255, 255, 255, 0.4);
                    background-color: rgba(255, 255, 255, 0.1);
                    pointer-events: none;
                }
                
                .liquid-glass-card::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    z-index: -1;
                    border-radius: 24px;
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    filter: url(#glass-distortion);
                    -webkit-filter: url(#glass-distortion);
                    isolation: isolate;
                    pointer-events: none;
                    opacity: 0.7;
                }
            `}</style>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/20">
                            <Leaf size={20} className="text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                            Platr
                        </span>
                    </div>
                    <p className="text-stone-500 dark:text-stone-400">Connecting surplus food with those in need.</p>
                </div>

                <div className="liquid-glass-card bg-white/40 dark:bg-stone-900/60 border border-white/20 dark:border-stone-800/50 rounded-3xl p-6 md:p-8 shadow-xl shadow-stone-200/20 dark:shadow-none transition-colors duration-300 backdrop-blur-sm">
                    <AnimatePresence mode="wait">
                        {!role ? (
                            <motion.div
                                key="role-selection"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-xl font-semibold text-stone-900 dark:text-white text-center">Choose your role</h2>
                                <div className="grid grid-cols-1 gap-4">
                                    <button
                                        onClick={() => setRole('RESTAURANT')}
                                        className="group relative flex items-center gap-4 p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-stone-900 dark:hover:border-stone-100 bg-stone-50 dark:bg-stone-800/50 hover:bg-white dark:hover:bg-stone-800 transition-all duration-300 text-left"
                                    >
                                        <div className="p-3 rounded-lg bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 group-hover:bg-stone-900 dark:group-hover:bg-stone-100 group-hover:text-white dark:group-hover:text-stone-900 transition-colors">
                                            <ChefHat size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-stone-900 dark:text-white transition-colors">Restaurant</h3>
                                            <p className="text-sm text-stone-500 dark:text-stone-400">I want to donate food</p>
                                        </div>
                                        <ArrowRight className="absolute right-4 text-stone-400 dark:text-stone-500 group-hover:text-stone-900 dark:group-hover:text-white opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                                    </button>

                                    <button
                                        onClick={() => setRole('NGO')}
                                        className="group relative flex items-center gap-4 p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-emerald-600 dark:hover:border-emerald-500 bg-stone-50 dark:bg-stone-800/50 hover:bg-white dark:hover:bg-stone-800 transition-all duration-300 text-left"
                                    >
                                        <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                            <HeartHandshake size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">NGO</h3>
                                            <p className="text-sm text-stone-500 dark:text-stone-400">I want to receive food</p>
                                        </div>
                                        <ArrowRight className="absolute right-4 text-stone-400 dark:text-stone-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="auth-form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <button
                                        onClick={() => setRole(null)}
                                        className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors flex items-center gap-1"
                                    >
                                        ← Back
                                    </button>
                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${role === 'RESTAURANT' ? 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300' : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400'}`}>
                                        {role === 'RESTAURANT' ? <ChefHat size={12} /> : <HeartHandshake size={12} />}
                                        {role === 'RESTAURANT' ? 'Restaurant' : 'NGO'}
                                    </div>
                                </div>

                                <div className="text-center space-y-1">
                                    <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
                                        {mode === 'LOGIN' ? 'Welcome Back' : 'Create Account'}
                                    </h2>
                                    <p className="text-sm text-stone-500 dark:text-stone-400">
                                        {mode === 'LOGIN'
                                            ? 'Enter your credentials to access your dashboard'
                                            : 'Fill in your details to get started'}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {mode === 'SIGNUP' && (
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-stone-500 dark:text-stone-400 ml-1">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" size={18} />
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder:text-stone-400 dark:placeholder:text-stone-500 transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-stone-500 dark:text-stone-400 ml-1">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" size={18} />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder:text-stone-400 dark:placeholder:text-stone-500 transition-all"
                                                placeholder="name@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-stone-500 dark:text-stone-400 ml-1">Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" size={18} />
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder:text-stone-400 dark:placeholder:text-stone-500 transition-all"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                                    >
                                        {loading ? (
                                            <Loader2 size={20} className="animate-spin" />
                                        ) : (
                                            <>
                                                {mode === 'LOGIN' ? 'Sign In' : 'Create Account'}
                                                <ArrowRight size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="text-center">
                                    <button
                                        onClick={() => setMode(mode === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}
                                        className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
                                    >
                                        {mode === 'LOGIN' ? "Don't have an account? " : "Already have an account? "}
                                        <span className="text-emerald-600 dark:text-emerald-500 font-medium hover:underline">
                                            {mode === 'LOGIN' ? 'Sign up' : 'Log in'}
                                        </span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
