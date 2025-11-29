import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
    ArrowRight,
    ChefHat,
    HeartHandshake,
    Leaf,
    Users,
    Utensils,
    Sprout,
    Apple,
    Carrot,
    Croissant,
    Coffee,
    Pizza,
    Sandwich,
    Fish,
    Wheat,
    Soup,
    Drumstick,
    Egg,
    Cookie,
    Milk,
    UtensilsCrossed,
    Candy,
    IceCream,
    Banana,
    Cherry,
    Grape
} from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

function TiltCard() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative w-full h-full perspective-1000"
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200/50 to-orange-200/50 dark:from-emerald-900/20 dark:to-orange-900/20 rounded-3xl blur-3xl transform translate-z-[-20px]" />
            <div
                style={{ transform: "translateZ(20px)" }}
                className="relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-8 shadow-2xl shadow-stone-200/50 dark:shadow-none"
            >
                {/* Abstract UI Representation */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-8">
                        <div className="w-32 h-4 bg-stone-200 dark:bg-stone-700 rounded-full" />
                        <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full" />
                    </div>
                    {[1, 2, 3].map((_, i) => (
                        <motion.div
                            key={i}
                            style={{ transform: `translateZ(${30 + i * 10}px)` }}
                            className="flex items-center gap-4 p-4 bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-100 dark:border-stone-700 shadow-sm"
                        >
                            <div className="w-10 h-10 rounded-lg bg-stone-200 dark:bg-stone-700" />
                            <div className="flex-1 space-y-2">
                                <div className="w-24 h-3 bg-stone-200 dark:bg-stone-700 rounded-full" />
                                <div className="w-16 h-2 bg-stone-100 dark:bg-stone-600 rounded-full" />
                            </div>
                            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function LandingPage() {
    const navigate = useNavigate();

    const handleNavigate = (mode: 'LOGIN' | 'SIGNUP', role?: 'RESTAURANT' | 'NGO') => {
        navigate('/auth', { state: { initialMode: mode, initialRole: role } });
    };

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans selection:bg-emerald-200 selection:text-emerald-900 dark:selection:bg-emerald-900 dark:selection:text-emerald-200 overflow-hidden transition-colors duration-300">

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-xl border-b border-stone-200 dark:border-stone-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/20">
                            <Leaf size={16} className="text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                            Platr
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={() => handleNavigate('LOGIN')}
                            className="px-6 py-2.5 text-sm font-semibold bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 hover:-translate-y-0.5"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-200/40 dark:bg-orange-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-200/40 dark:bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
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

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/30 text-sm text-emerald-800 dark:text-emerald-300 mb-8 font-medium relative z-20">
                            <Sprout size={16} className="text-emerald-600 dark:text-emerald-400" />
                            Connecting Surplus to Scarcity
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-stone-900 dark:text-white mb-6 tracking-tight">
                            Share Food, <br />
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent relative z-10">
                                    Waste Less.
                                </span>
                                <svg
                                    className="absolute -bottom-2 left-0 w-full h-3 text-emerald-500/50 -z-0"
                                    viewBox="0 0 100 10"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        d="M0 5 Q 50 10 100 5"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="none"
                                    />
                                </svg>
                            </span>
                        </h1>
                        <p className="text-xl text-stone-600 dark:text-stone-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Platr connects restaurants with surplus food to NGOs feeding the hungry.
                            Join the movement to end food waste and hunger in your community.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button
                                onClick={() => handleNavigate('LOGIN', 'RESTAURANT')}
                                className="w-full sm:w-auto px-8 py-4 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 rounded-2xl font-medium transition-all shadow-xl shadow-stone-900/20 dark:shadow-stone-100/10 flex items-center justify-center gap-3 group hover:-translate-y-1"
                            >
                                <ChefHat size={20} />
                                I'm a Restaurant
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => handleNavigate('LOGIN', 'NGO')}
                                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 rounded-2xl font-medium transition-all shadow-lg shadow-stone-200/50 dark:shadow-none flex items-center justify-center gap-3 group hover:-translate-y-1"
                            >
                                <HeartHandshake size={20} className="text-emerald-600 dark:text-emerald-500" />
                                I'm an NGO
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-0 w-full hidden md:block"
                >
                    <div className="max-w-7xl mx-auto px-6 flex justify-between text-sm text-stone-400 dark:text-stone-500 font-semibold tracking-widest uppercase">
                        <span>Trusted by 500+ Partners</span>
                        <span>AI-Powered Matching</span>
                        <span>Real-time Tracking</span>
                    </div>
                </motion.div>
            </section>

            {/* Impact Section */}
            <section className="py-20 px-6 relative z-10 bg-white dark:bg-stone-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Utensils,
                                value: "50,000+",
                                label: "Meals Provided",
                                desc: "Fresh, nutritious food delivered to those in need.",
                                color: "text-orange-600 dark:text-orange-400",
                                bg: "bg-orange-50 dark:bg-orange-900/20"
                            },
                            {
                                icon: Leaf,
                                value: "25 Tons",
                                label: "CO₂ Saved",
                                desc: "Preventing food waste from entering landfills.",
                                color: "text-emerald-600 dark:text-emerald-400",
                                bg: "bg-emerald-50 dark:bg-emerald-900/20"
                            },
                            {
                                icon: Users,
                                value: "120+",
                                label: "NGO Partners",
                                desc: "A growing network of verified organizations.",
                                color: "text-blue-600 dark:text-blue-400",
                                bg: "bg-blue-50 dark:bg-blue-900/20"
                            }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, rotateX: 5, rotateY: 5, scale: 1.02 }}
                                className="p-8 rounded-3xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 hover:border-stone-200 dark:hover:border-stone-700 transition-all group hover:shadow-2xl hover:shadow-emerald-900/10 dark:hover:shadow-emerald-900/20 perspective-1000"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <stat.icon size={28} />
                                </div>
                                <div className="text-4xl font-bold text-stone-900 dark:text-white mb-2">{stat.value}</div>
                                <div className="text-lg font-semibold text-stone-600 dark:text-stone-300 mb-3">{stat.label}</div>
                                <p className="text-stone-500 dark:text-stone-400 leading-relaxed">{stat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 px-6 relative overflow-hidden bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-900 dark:text-white">How It Works</h2>
                        <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto text-lg">
                            Seamlessly connecting surplus to scarcity through technology.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-12">
                            {[
                                {
                                    step: "01",
                                    title: "Restaurant Posts Donation",
                                    desc: "Quickly list surplus food details. Our AI suggests shelf life and packaging tips."
                                },
                                {
                                    step: "02",
                                    title: "Instant Notification",
                                    desc: "Nearby NGOs get real-time alerts based on food type and quantity needed."
                                },
                                {
                                    step: "03",
                                    title: "Pickup & Distribution",
                                    desc: "NGO accepts and collects the food. Impact stats are updated instantly."
                                }
                            ].map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    viewport={{ once: true }}
                                    className="flex gap-6"
                                >
                                    <div className="text-5xl font-bold text-emerald-200 dark:text-emerald-900/50 font-mono">{step.step}</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">{step.title}</h3>
                                        <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <TiltCard />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 transition-colors duration-300">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-stone-500 dark:text-stone-400 text-sm">
                    <div className="flex items-center gap-2">
                        <Leaf size={16} className="text-emerald-600 dark:text-emerald-500" />
                        <span>© 2025 Platr</span>
                    </div>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Terms</a>
                        <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact</a>
                        <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">About</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
