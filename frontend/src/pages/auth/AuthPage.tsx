import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ChefHat,
    HeartHandshake,
    ArrowRight,
    Mail,
    Lock,
    User,
    Loader2,
    Leaf,
    Apple,
    Soup,
    Wheat,
    Carrot,
    Grape,
    Cherry,
    Drumstick,
    Pizza,
    Sandwich,
    Cookie,
    Milk,
    Fish,
    Egg,
    UtensilsCrossed,
    Candy,
    Banana,
    Croissant,
    Coffee,
    IceCream,
    Sprout
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

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-200/40 dark:bg-emerald-900/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-200/40 dark:bg-orange-900/20 rounded-full blur-[100px]" />
            </div>

            {/* Full Screen Food Doodles Background */}
            <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
                {/* Top Area */}
                <Apple className="absolute top-[5%] left-[5%] text-stone-300 dark:text-stone-700 rotate-[-12deg] opacity-50" size={64} strokeWidth={1.5} />
                <Soup className="absolute top-[12%] left-[20%] text-stone-300 dark:text-stone-700 rotate-[15deg] opacity-50" size={56} strokeWidth={1.5} />
                <Wheat className="absolute top-[8%] right-[15%] text-stone-300 dark:text-stone-700 rotate-[45deg] opacity-50" size={52} strokeWidth={1.5} />
                <Carrot className="absolute top-[18%] right-[5%] text-stone-300 dark:text-stone-700 rotate-[24deg] opacity-50" size={60} strokeWidth={1.5} />
                <Grape className="absolute top-[5%] left-[40%] text-stone-300 dark:text-stone-700 rotate-[-10deg] opacity-40" size={40} strokeWidth={1.5} />

                {/* Upper Middle */}
                <Cherry className="absolute top-[25%] left-[10%] text-stone-300 dark:text-stone-700 rotate-[30deg] opacity-40" size={32} strokeWidth={1.5} />
                <Drumstick className="absolute top-[28%] left-[30%] text-stone-300 dark:text-stone-700 rotate-[-20deg] opacity-50" size={58} strokeWidth={1.5} />
                <Pizza className="absolute top-[35%] left-[-2%] text-stone-300 dark:text-stone-700 rotate-[-45deg] opacity-50" size={72} strokeWidth={1.5} />
                <Sandwich className="absolute top-[32%] right-[-2%] text-stone-300 dark:text-stone-700 rotate-[15deg] opacity-50" size={68} strokeWidth={1.5} />
                <Cookie className="absolute top-[40%] right-[15%] text-stone-300 dark:text-stone-700 rotate-[60deg] opacity-50" size={48} strokeWidth={1.5} />
                <Milk className="absolute top-[25%] right-[30%] text-stone-300 dark:text-stone-700 rotate-[-15deg] opacity-40" size={42} strokeWidth={1.5} />

                {/* Lower Middle */}
                <Fish className="absolute bottom-[40%] left-[5%] text-stone-300 dark:text-stone-700 rotate-[180deg] opacity-50" size={54} strokeWidth={1.5} />
                <Egg className="absolute bottom-[35%] left-[25%] text-stone-300 dark:text-stone-700 rotate-[-10deg] opacity-50" size={46} strokeWidth={1.5} />
                <UtensilsCrossed className="absolute top-[45%] left-[45%] text-stone-300 dark:text-stone-700 rotate-[180deg] opacity-20" size={120} strokeWidth={1} />
                <Candy className="absolute bottom-[45%] right-[25%] text-stone-300 dark:text-stone-700 rotate-[15deg] opacity-40" size={34} strokeWidth={1.5} />
                <Banana className="absolute bottom-[38%] right-[5%] text-stone-300 dark:text-stone-700 rotate-[45deg] opacity-40" size={52} strokeWidth={1.5} />

                {/* Bottom Area */}
                <Croissant className="absolute bottom-[15%] left-[10%] text-stone-300 dark:text-stone-700 rotate-[-30deg] opacity-50" size={64} strokeWidth={1.5} />
                <Coffee className="absolute bottom-[20%] right-[10%] text-stone-300 dark:text-stone-700 rotate-[12deg] opacity-50" size={50} strokeWidth={1.5} />
                <IceCream className="absolute bottom-[10%] right-[25%] text-stone-300 dark:text-stone-700 rotate-[-15deg] opacity-50" size={56} strokeWidth={1.5} />
                <Leaf className="absolute bottom-[5%] left-[40%] text-stone-300 dark:text-stone-700 rotate-[45deg] opacity-40" size={38} strokeWidth={1.5} />
                <Sprout className="absolute bottom-[8%] right-[45%] text-stone-300 dark:text-stone-700 rotate-[-20deg] opacity-40" size={36} strokeWidth={1.5} />
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/20">
                            <Leaf size={20} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-stone-900 dark:text-white mb-2">
                        Zero-Waste FoodLink
                    </h1>
                    <p className="text-stone-500 dark:text-stone-400">Connecting surplus food with those in need.</p>
                </div>

                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-stone-200/50 dark:shadow-none transition-colors duration-300">
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
