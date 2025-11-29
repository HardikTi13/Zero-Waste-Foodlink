import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Utensils,
    Scale,
    Gift,
    Clock,
    CheckCircle,
    XCircle,
    Truck,
    ChevronDown,
    RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { type Donation, type Stats } from '../../types/donation';
import { StatusBadge } from '../../components/StatusBadge';
import { StatCard } from '../../components/StatCard';
import { ImageModal } from '../../components/ImageModal';
import { Image as ImageIcon } from 'lucide-react';

// --- Types ---
type NgoOption = {
    id: string;
    name: string;
};

// --- Hardcoded Data ---
const NGO_OPTIONS: NgoOption[] = [
    { id: "ngo_01", name: "Hope Foundation" },
    { id: "ngo_02", name: "Food Angels" },
    { id: "ngo_03", name: "Community Kitchen" }
];

// --- Mock API ---
const mockStats: Stats = {
    totalDonations: 12,
    totalMealsServed: 180,
    totalFoodSavedKg: 72.5
};

const mockDonations: Donation[] = [
    {
        _id: "d1",
        id: "d1",
        restaurantName: "Spicy Bites",
        foodName: "Curry & Rice",
        quantity: "20 meals",
        aiAnalysis: {
            foodType: "Curry & Rice",
            estimatedMeals: 20,
            freshness: "Good for 4 hours",
            notesForNGO: "Contains dairy, spicy."
        },
        status: "PENDING_NGO_CONFIRMATION",
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 4 * 3600000).toISOString(),
        location: { type: "Point", coordinates: [77.5946, 12.9716] }
    },
    {
        _id: "d2",
        id: "d2",
        restaurantName: "Green Salad Bar",
        foodName: "Mixed Greens",
        quantity: "15 meals",
        aiAnalysis: {
            foodType: "Mixed Greens",
            estimatedMeals: 15,
            freshness: "Good for 2 hours",
            notesForNGO: "Keep refrigerated."
        },
        status: "ACCEPTED",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        expiresAt: new Date(Date.now() + 2 * 3600000).toISOString(),
        location: { type: "Point", coordinates: [77.6, 12.98] }
    },
    {
        _id: "d3",
        id: "d3",
        restaurantName: "Bakery Delights",
        foodName: "Assorted Breads",
        quantity: "50 meals",
        aiAnalysis: {
            foodType: "Assorted Breads",
            estimatedMeals: 50,
            freshness: "Good for 24 hours",
            notesForNGO: "Contains gluten."
        },
        status: "COLLECTED",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        expiresAt: new Date(Date.now() - 80000000).toISOString(),
        location: { type: "Point", coordinates: [77.62, 12.95] }
    }
];

// Simulate API calls
const fetchStats = async (ngoId: string): Promise<Stats> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Fetching stats for ${ngoId}`);
            resolve(mockStats);
        }, 800);
    });
};

const fetchDonations = async (ngoId: string): Promise<Donation[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Fetching donations for ${ngoId}`);
            resolve([...mockDonations]);
        }, 1000);
    });
};

const updateDonationStatusApi = async (id: string, status: Donation['status']): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Updating donation ${id} to ${status}`);
            resolve();
        }, 500);
    });
};

export default function NgoDashboard() {
    const navigate = useNavigate();
    const [selectedNgo, setSelectedNgo] = useState<string>(NGO_OPTIONS[0].id);
    const [stats, setStats] = useState<Stats | null>(null);
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [viewingImage, setViewingImage] = useState<string | null>(null);

    const loadData = async () => {
        setLoading(true);
        try {
            const [statsData, donationsData] = await Promise.all([
                fetchStats(selectedNgo),
                fetchDonations(selectedNgo)
            ]);
            setStats(statsData);
            setDonations(donationsData);
        } catch (error) {
            console.error("Failed to load data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [selectedNgo]);

    const handleStatusUpdate = async (id: string, newStatus: Donation['status']) => {
        setProcessingId(id);
        try {
            await updateDonationStatusApi(id, newStatus);
            setDonations(prev => prev.map(d =>
                d.id === id ? { ...d, status: newStatus } : d
            ));
        } catch (error) {
            console.error("Failed to update status", error);
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 p-6 md:p-8 font-sans selection:bg-emerald-200 selection:text-emerald-900 dark:selection:bg-emerald-900 dark:selection:text-emerald-200 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-stone-900 dark:text-white">
                            NGO Dashboard
                        </h1>
                        <p className="text-stone-500 dark:text-stone-400 mt-1">Manage food donations and track impact</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <select
                                value={selectedNgo}
                                onChange={(e) => setSelectedNgo(e.target.value)}
                                className="appearance-none bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white pl-4 pr-10 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer min-w-[200px] shadow-sm"
                            >
                                {NGO_OPTIONS.map(ngo => (
                                    <option key={ngo.id} value={ngo.id}>{ngo.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={16} />
                        </div>
                        <button
                            onClick={loadData}
                            className="p-2.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 shadow-sm"
                        >
                            <RefreshCw size={20} className={cn(loading && "animate-spin")} />
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard
                        title="Total Donations"
                        value={stats?.totalDonations || 0}
                        icon={Gift}
                        color="text-emerald-600 dark:text-emerald-400"
                    />
                    <StatCard
                        title="Meals Served"
                        value={stats?.totalMealsServed || 0}
                        icon={Utensils}
                        color="text-orange-500 dark:text-orange-400"
                    />
                    <StatCard
                        title="Food Saved"
                        value={stats?.totalFoodSavedKg || 0}
                        unit="kg"
                        icon={Scale}
                        color="text-emerald-500 dark:text-emerald-400"
                    />
                </div>

                {/* Donations List */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-stone-900 dark:text-white flex items-center gap-2">
                        <Clock size={20} className="text-emerald-600 dark:text-emerald-500" />
                        Recent Donations
                    </h2>

                    <div className="grid gap-4">
                        <AnimatePresence mode="popLayout">
                            {loading ? (
                                [...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={`skeleton-${i}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-32 bg-stone-200 dark:bg-stone-800 rounded-2xl animate-pulse"
                                    />
                                ))
                            ) : donations.length === 0 ? (
                                <div className="text-center py-12 text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-900/50 rounded-2xl border border-stone-200 dark:border-stone-800 border-dashed">
                                    No donations found for this NGO.
                                </div>
                            ) : (
                                donations.map((donation) => (
                                    <motion.div
                                        key={donation.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors shadow-sm hover:shadow-md dark:shadow-none cursor-pointer"
                                        onClick={() => navigate(`/history/${donation.id}`)}
                                    >
                                        <div className="flex flex-col md:flex-row justify-between gap-4">
                                            <div className="space-y-3 flex-1">
                                                <div className="flex items-start justify-between md:justify-start gap-3">
                                                    <h3 className="text-lg font-semibold text-stone-900 dark:text-white">
                                                        {donation.restaurantName}
                                                    </h3>
                                                    <StatusBadge status={donation.status} />
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-sm text-stone-500 dark:text-stone-400">
                                                    <div className="flex items-center gap-2">
                                                        <Utensils size={14} className="text-stone-400 dark:text-stone-500" />
                                                        <span className="text-stone-700 dark:text-stone-300">{donation.aiAnalysis?.foodType}</span>
                                                        <span className="text-stone-300 dark:text-stone-600">•</span>
                                                        <span>~{donation.aiAnalysis?.estimatedMeals} meals</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock size={14} className="text-stone-400 dark:text-stone-500" />
                                                        <span>{donation.aiAnalysis?.freshness}</span>
                                                    </div>
                                                </div>

                                                {donation.aiAnalysis?.notesForNGO && (
                                                    <div className="text-sm bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/50 inline-block">
                                                        <span className="font-semibold text-emerald-800 dark:text-emerald-300 text-xs uppercase tracking-wider mr-2">Note:</span>
                                                        {donation.aiAnalysis.notesForNGO}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2 md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-stone-100 dark:border-stone-800">
                                                {donation.imageUrl && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setViewingImage(donation.imageUrl || null);
                                                        }}
                                                        className="p-2 text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                                                        title="View Image"
                                                    >
                                                        <ImageIcon size={20} />
                                                    </button>
                                                )}
                                                {donation.status === 'PENDING_NGO_CONFIRMATION' && (
                                                    <>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleStatusUpdate(donation.id, 'ACCEPTED');
                                                            }}
                                                            disabled={!!processingId}
                                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-emerald-600/20"
                                                        >
                                                            {processingId === donation.id ? (
                                                                <RefreshCw size={16} className="animate-spin" />
                                                            ) : (
                                                                <CheckCircle size={16} />
                                                            )}
                                                            Accept
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleStatusUpdate(donation.id, 'REJECTED');
                                                            }}
                                                            disabled={!!processingId}
                                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            <XCircle size={16} />
                                                            Reject
                                                        </button>
                                                    </>
                                                )}

                                                {donation.status === 'ACCEPTED' && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleStatusUpdate(donation.id, 'COLLECTED');
                                                        }}
                                                        disabled={!!processingId}
                                                        className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-stone-800 dark:bg-stone-700 hover:bg-stone-900 dark:hover:bg-stone-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                                    >
                                                        {processingId === donation.id ? (
                                                            <RefreshCw size={16} className="animate-spin" />
                                                        ) : (
                                                            <Truck size={16} />
                                                        )}
                                                        Mark Collected
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <ImageModal
                isOpen={!!viewingImage}
                onClose={() => setViewingImage(null)}
                imageUrl={viewingImage || undefined}
            />
        </div>
    );
}
