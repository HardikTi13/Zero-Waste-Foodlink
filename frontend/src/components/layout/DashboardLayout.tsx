import { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    History,
    User,
    LogOut,
    Menu,
    X,
    ChefHat,
    HeartHandshake,
    Leaf
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ThemeToggle } from '../ThemeToggle';

export default function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Mock role detection based on current path or local storage
    // In a real app, this would come from an Auth Context
    const isRestaurant = location.pathname.includes('restaurant');
    const role = isRestaurant ? 'Restaurant' : 'NGO';

    const handleLogout = () => {
        navigate('/');
    };

    const navItems = [
        {
            label: 'Dashboard',
            icon: LayoutDashboard,
            path: isRestaurant ? '/restaurant-dashboard' : '/ngo-dashboard'
        },
        {
            label: 'History',
            icon: History,
            path: '/history'
        },
        {
            label: 'Profile',
            icon: User,
            path: '/profile'
        }
    ];

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans selection:bg-emerald-200 selection:text-emerald-900 dark:selection:bg-emerald-900 dark:selection:text-emerald-200 flex transition-colors duration-300">

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-600 dark:text-stone-400 shadow-sm"
            >
                <Menu size={24} />
            </button>

            {/* Sidebar Backdrop (Mobile) */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-stone-900/20 dark:bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                className={cn(
                    "fixed lg:sticky top-0 left-0 h-screen w-72 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 z-50 lg:translate-x-0 transition-all duration-300 shadow-xl shadow-stone-200/50 dark:shadow-none",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="p-6 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className={cn("p-2 rounded-lg text-white shadow-md", isRestaurant ? "bg-stone-800 dark:bg-stone-700" : "bg-emerald-600")}>
                                {isRestaurant ? <ChefHat size={24} /> : <HeartHandshake size={24} />}
                            </div>
                            <div>
                                <h1 className="font-bold text-lg leading-tight text-stone-900 dark:text-white">Platr</h1>
                                <span className="text-xs text-stone-500 dark:text-stone-400 font-medium uppercase tracking-wider">{role} Portal</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2 flex-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                    isActive
                                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-medium shadow-sm border border-emerald-100 dark:border-emerald-900/50"
                                        : "text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/50 hover:text-stone-900 dark:hover:text-stone-200"
                                )}
                            >
                                {({ isActive }) => (
                                    <>
                                        <item.icon size={20} className={isActive ? "text-emerald-600 dark:text-emerald-400" : "text-stone-400 dark:text-stone-500 group-hover:text-stone-600 dark:group-hover:text-stone-300"} />
                                        <span>{item.label}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer Actions */}
                    <div className="mt-auto space-y-4">
                        <div className="flex items-center justify-between px-4 py-2">
                            <span className="text-sm font-medium text-stone-500 dark:text-stone-400">Theme</span>
                            <ThemeToggle />
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-stone-500 dark:text-stone-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors group"
                        >
                            <LogOut size={20} className="group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
                <Outlet />
            </main>

        </div>
    );
}
