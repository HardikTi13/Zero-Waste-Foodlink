import { useState, useEffect } from 'react';
import {
    Plus,
    Utensils,
    Leaf,
    Gift,
    Clock,
    MoreVertical,
    Calendar,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Donation, type Stats } from '../../types/donation';
import { StatusBadge } from '../../components/StatusBadge';
import { StatCard } from '../../components/StatCard';
import CreateDonationModal from './CreateDonationModal';
import { ImageModal } from '../../components/ImageModal';
import { Image as ImageIcon } from 'lucide-react';

// --- Mock Data ---
const mockStats: Stats = {
    totalDonations: 45,
    totalMealsProvided: 650,
    totalCo2SavedKg: 280.5
};

const mockDonations: Donation[] = [
    {
        id: "d1",
        ngoName: "Hope Foundation",
        foodType: "Curry & Rice",
        quantityMeals: 20,
        status: "PENDING_NGO_CONFIRMATION",
        createdAt: new Date().toISOString(),
        impact: { co2SavedKg: 8.5 }
    },
    {
        id: "d2",
        ngoName: "Food Angels",
        foodType: "Mixed Greens",
        quantityMeals: 15,
        status: "ACCEPTED",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        impact: { co2SavedKg: 4.2 }
    },
    {
        id: "d3",
        ngoName: "Community Kitchen",
        foodType: "Assorted Breads",
        quantityMeals: 50,
        status: "COLLECTED",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        impact: { co2SavedKg: 15.0 }
    },
    {
        id: "d4",
        ngoName: "Hope Foundation",
        foodType: "Pasta Trays",
        quantityMeals: 30,
        status: "COLLECTED",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        impact: { co2SavedKg: 12.8 }
    }
];

export default function RestaurantDashboard() {
    const [loading, setLoading] = useState(true);
    const [donations, setDonations] = useState<Donation[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingImage, setViewingImage] = useState<string | null>(null);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setDonations(mockDonations);
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleCreateDonation = (newDonation: Donation) => {
        setDonations([newDonation, ...donations]);
    };

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 p-6 md:p-8 font-sans selection:bg-emerald-200 selection:text-emerald-900 dark:selection:bg-emerald-900 dark:selection:text-emerald-200 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-stone-900 dark:text-white">
                            Restaurant Dashboard
                        </h1>
                        <p className="text-stone-500 dark:text-stone-400 mt-1">Track your contributions and environmental impact</p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                    >
                        <Plus size={20} />
                        New Donation
                    </button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard
                        title="Total Donations"
                        value={mockStats.totalDonations + (donations.length - mockDonations.length)}
                        icon={Gift}
                        color="text-emerald-600 dark:text-emerald-400"
                        trend="+12% this month"
                    />
                    <StatCard
                        title="Meals Provided"
                        value={(mockStats.totalMealsProvided || 0) + donations.reduce((acc, curr) => !mockDonations.find(d => d.id === curr.id) ? acc + (curr.quantityMeals || 0) : acc, 0)}
                        icon={Utensils}
                        color="text-orange-500 dark:text-orange-400"
                        trend="+85 meals"
                    />
                    <StatCard
                        title="CO₂ Saved"
                        value={(mockStats.totalCo2SavedKg || 0) + donations.reduce((acc, curr) => !mockDonations.find(d => d.id === curr.id) ? acc + (curr.impact?.co2SavedKg || 0) : acc, 0)}
                        unit="kg"
                        icon={Leaf}
                        color="text-emerald-500 dark:text-emerald-400"
                        trend="+24kg saved"
                    />
                </div>

                {/* Recent Activity */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-stone-900 dark:text-white flex items-center gap-2">
                            <Clock size={20} className="text-emerald-600 dark:text-emerald-500" />
                            Donation History
                        </h2>
                        <button className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors font-medium">
                            View All
                        </button>
                    </div>

                    <div className="grid gap-4">
                        <AnimatePresence mode="popLayout">
                            {loading ? (
                                [...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={`skeleton-${i}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-24 bg-stone-200 dark:bg-stone-800 rounded-2xl animate-pulse"
                                    />
                                ))
                            ) : (
                                donations.map((donation) => (
                                    <motion.div
                                        key={donation.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{ scale: 1.01 }}
                                        className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all group shadow-sm hover:shadow-md dark:shadow-none"
                                    >
                                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

                                            <div className="flex items-start gap-4">
                                                <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                    <Utensils size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-1">
                                                        {donation.foodType}
                                                    </h3>
                                                    <div className="flex items-center gap-3 text-sm text-stone-500 dark:text-stone-400">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar size={14} />
                                                            {new Date(donation.createdAt).toLocaleDateString()}
                                                        </span>
                                                        <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
                                                        <span>{donation.quantityMeals} meals</span>
                                                        <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
                                                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                                            <Leaf size={12} />
                                                            {donation.impact?.co2SavedKg}kg CO₂
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                                                <div className="text-right mr-4 hidden md:block">
                                                    <div className="text-xs text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">Assigned NGO</div>
                                                    <div className="text-sm font-medium text-stone-700 dark:text-stone-300">{donation.ngoName}</div>
                                                </div>
                                                <StatusBadge status={donation.status} />
                                                {donation.imageUrl && (
                                                    <button
                                                        onClick={() => setViewingImage(donation.imageUrl || null)}
                                                        className="p-2 text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                                                        title="View Image"
                                                    >
                                                        <ImageIcon size={20} />
                                                    </button>
                                                )}
                                                <button className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800">
                                                    <MoreVertical size={20} />
                                                </button>
                                            </div>

                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <CreateDonationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onCreate={handleCreateDonation}
                />

                <ImageModal
                    isOpen={!!viewingImage}
                    onClose={() => setViewingImage(null)}
                    imageUrl={viewingImage || undefined}
                />

            </div>
        </div>
    );
}
