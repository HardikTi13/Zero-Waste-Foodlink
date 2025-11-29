import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ChefHat,
    HeartHandshake,
    ArrowRight,
    Mail,
    Lock,
    User,
    Loader2
} from 'lucide-react';

type AuthMode = 'LOGIN' | 'SIGNUP';
type UserRole = 'RESTAURANT' | 'NGO';

export default function AuthPage() {
    const navigate = useNavigate();
    const [mode, setMode] = useState<AuthMode>('LOGIN');
    const [role, setRole] = useState<UserRole | null>(null);
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
        <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center p-4 font-sans selection:bg-blue-500/30 overflow-hidden relative">

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                        Zero-Waste FoodLink
                    </h1>
                    <p className="text-gray-400">Connecting surplus food with those in need.</p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl">
                    <AnimatePresence mode="wait">
                        {!role ? (
                            <motion.div
                                key="role-selection"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-xl font-semibold text-white text-center">Choose your role</h2>
                                <div className="grid grid-cols-1 gap-4">
                                    <button
                                        onClick={() => setRole('RESTAURANT')}
                                        className="group relative flex items-center gap-4 p-4 rounded-xl border border-gray-700 hover:border-blue-500/50 bg-gray-800/50 hover:bg-gray-800 transition-all duration-300 text-left"
                                    >
                                        <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                                            <ChefHat size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">Restaurant</h3>
                                            <p className="text-sm text-gray-400">I want to donate food</p>
                                        </div>
                                        <ArrowRight className="absolute right-4 text-gray-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                                    </button>

                                    <button
                                        onClick={() => setRole('NGO')}
                                        className="group relative flex items-center gap-4 p-4 rounded-xl border border-gray-700 hover:border-purple-500/50 bg-gray-800/50 hover:bg-gray-800 transition-all duration-300 text-left"
                                    >
                                        <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                                            <HeartHandshake size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-white group-hover:text-purple-400 transition-colors">NGO</h3>
                                            <p className="text-sm text-gray-400">I want to receive food</p>
                                        </div>
                                        <ArrowRight className="absolute right-4 text-gray-600 group-hover:text-purple-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
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
                                        className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-1"
                                    >
                                        ← Back
                                    </button>
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-xs font-medium text-gray-300">
                                        {role === 'RESTAURANT' ? <ChefHat size={12} /> : <HeartHandshake size={12} />}
                                        {role === 'RESTAURANT' ? 'Restaurant' : 'NGO'}
                                    </div>
                                </div>

                                <div className="text-center space-y-1">
                                    <h2 className="text-2xl font-bold text-white">
                                        {mode === 'LOGIN' ? 'Welcome Back' : 'Create Account'}
                                    </h2>
                                    <p className="text-sm text-gray-400">
                                        {mode === 'LOGIN'
                                            ? 'Enter your credentials to access your dashboard'
                                            : 'Fill in your details to get started'}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {mode === 'SIGNUP' && (
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-gray-400 ml-1">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                    className="w-full bg-gray-900/50 border border-gray-700 text-white pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder:text-gray-600 transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-gray-400 ml-1">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full bg-gray-900/50 border border-gray-700 text-white pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder:text-gray-600 transition-all"
                                                placeholder="name@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-gray-400 ml-1">Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="w-full bg-gray-900/50 border border-gray-700 text-white pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder:text-gray-600 transition-all"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
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
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        {mode === 'LOGIN' ? "Don't have an account? " : "Already have an account? "}
                                        <span className="text-blue-400 hover:underline">
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
