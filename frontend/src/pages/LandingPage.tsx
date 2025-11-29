import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import {
    ArrowRight,
    ChefHat,
    HeartHandshake,
    Leaf,
    Users,
    Utensils,
} from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { useCurveTransition } from '../components/ui/CurveTransition';

export default function LandingPage() {
    const navigate = useNavigate();
    const { triggerTransition } = useCurveTransition();
    const container = useRef(null);

    // Parallax Scroll Hooks
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0vh', '50vh']);

    // Lenis Smooth Scroll
    useEffect(() => {
        const lenis = new Lenis();

        function raf(time: any) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, []);

    const handleNavigate = (mode: 'LOGIN' | 'SIGNUP', role?: 'RESTAURANT' | 'NGO') => {
        triggerTransition(() => {
            navigate('/auth', { state: { initialMode: mode, initialRole: role } });
        });
    };

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans selection:bg-emerald-200 selection:text-emerald-900 dark:selection:bg-emerald-900 dark:selection:text-emerald-200 overflow-hidden transition-colors duration-300">
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
                .liquid-glass-button {
                    position: relative;
                    isolation: isolate;
                    overflow: hidden;
                    border-radius: 24px;
                    transition: all 0.3s ease;
                }
                
                .liquid-glass-button::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    border-radius: 24px;
                    box-shadow: inset 0 0 12px -2px rgba(255, 255, 255, 0.4);
                    background-color: rgba(255, 255, 255, 0.1);
                    pointer-events: none;
                    transition: all 0.3s ease;
                }
                
                .liquid-glass-button::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    z-index: -1;
                    border-radius: 24px;
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    filter: url(#glass-distortion);
                    -webkit-filter: url(#glass-distortion);
                    isolation: isolate;
                    pointer-events: none;
                    opacity: 0.7;
                }

                .liquid-glass-button:hover {
                    transform: scale(1.05);
                }

                .liquid-glass-button:hover::before {
                    background-color: rgba(255, 255, 255, 0.2);
                    box-shadow: inset 0 0 20px -2px rgba(255, 255, 255, 0.6);
                }
            `}</style>

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-transparent border-transparent transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/20">
                            <Leaf size={20} className="text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                            Platr
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600 dark:text-stone-300">
                            {/* <a href="#how-it-works" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">How it Works</a>
                            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Impact</a>
                            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Partners</a> */}
                        </div>
                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            <button
                                onClick={() => handleNavigate('LOGIN')}
                                className="px-5 py-2 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-100 transition-all shadow-lg shadow-stone-900/20 dark:shadow-white/20"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section ref={container} className="sticky top-0 h-screen w-full overflow-hidden z-0">
                <motion.div style={{ y }} className="absolute inset-0">
                    <img
                        src="/hero-bg-food.jpg"
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
                </motion.div>

                <div className="relative z-10 h-full flex flex-col justify-end pb-32 px-6 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white mb-8 leading-[0.9]">
                            SHARE <span className="text-yellow-400">FOOD</span>,<br />
                            WASTE <span className="text-emerald-400">LESS</span>.
                        </h1>
                        <p className="text-xl md:text-2xl text-stone-200 mb-12 max-w-2xl font-light">
                            Discover the joy of giving. Connect surplus food with those who need it most.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <button
                                onClick={() => handleNavigate('LOGIN', 'RESTAURANT')}
                                className="liquid-glass-button px-8 py-4 text-white text-lg font-bold uppercase tracking-wider min-w-[240px] flex items-center justify-center gap-3 group"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <ChefHat size={24} />
                                    I'm a Restaurant
                                </span>
                            </button>
                            <button
                                onClick={() => handleNavigate('LOGIN', 'NGO')}
                                className="liquid-glass-button px-8 py-4 text-white text-lg font-bold uppercase tracking-wider min-w-[240px] flex items-center justify-center gap-3 group"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <HeartHandshake size={24} />
                                    I'm an NGO
                                </span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="sticky top-0 h-screen w-full z-10 bg-[#0a0a0a] text-white flex items-center justify-center px-6">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Utensils,
                                value: "50,000+",
                                label: "Meals Provided",
                                desc: "Fresh, nutritious food delivered to those in need.",
                                color: "text-orange-400",
                                bg: "bg-orange-900/20"
                            },
                            {
                                icon: Leaf,
                                value: "25 Tons",
                                label: "CO₂ Saved",
                                desc: "Preventing food waste from entering landfills.",
                                color: "text-emerald-400",
                                bg: "bg-emerald-900/20"
                            },
                            {
                                icon: Users,
                                value: "120+",
                                label: "NGO Partners",
                                desc: "A growing network of verified organizations.",
                                color: "text-blue-400",
                                bg: "bg-blue-900/20"
                            }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="p-10 rounded-[32px] bg-[#1a1a1a] border border-white/5 hover:border-white/10 transition-all group hover:shadow-2xl hover:shadow-emerald-900/10"
                            >
                                <div className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                    <stat.icon size={32} />
                                </div>
                                <div className="text-5xl font-bold text-white mb-4">{stat.value}</div>
                                <div className="text-xl font-semibold text-stone-300 mb-4">{stat.label}</div>
                                <p className="text-stone-400 leading-relaxed text-lg">{stat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="sticky top-0 h-screen w-full z-20 bg-stone-50 dark:bg-stone-950 flex items-center justify-center px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto w-full relative">
                    <div className="text-center mb-20">
                        <h2 className="text-6xl md:text-7xl font-bold mb-6 text-stone-900 dark:text-white">How It Works</h2>
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

                        <div className="relative">
                            <img
                                src="/how-to-works-new.png"
                                alt="How It Works Infographic"
                                className="w-full h-auto rounded-3xl shadow-2xl"
                            />
                        </div>
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
