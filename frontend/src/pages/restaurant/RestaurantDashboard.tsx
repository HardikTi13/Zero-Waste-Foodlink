import { useState, useEffect } from 'react';
import {
    Plus,
    Utensils,
    Leaf,
    Gift,
    Clock,
    CheckCircle,
    Truck,
    MoreVertical,
    Calendar,
    ArrowUpRight,
    X,
    Loader2,
    AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- Types ---
type DonationStatus = "PENDING_NGO_CONFIRMATION" | "ACCEPTED" | "REJECTED" | "COLLECTED";

type Donation = {
    id: string;
    ngoName: string;
    foodType: string;
    quantityMeals: number;
    status: DonationStatus;
    createdAt: string;
    impact: {
        co2SavedKg: number;
    };
};

type Stats = {
    totalDonations: number;
    totalMealsProvided: number;
    totalCo2SavedKg: number;
};

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

// --- Components ---

const StatusBadge = ({ status }: { status: DonationStatus }) => {
    const styles = {
        PENDING_NGO_CONFIRMATION: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        ACCEPTED: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        REJECTED: "bg-red-500/10 text-red-500 border-red-500/20",
        COLLECTED: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    };

    const labels = {
        PENDING_NGO_CONFIRMATION: "Pending",
        ACCEPTED: "Accepted",
        REJECTED: "Rejected",
        COLLECTED: "Collected",
    };

    return (
        <span className={cn("text-xs px-2.5 py-1 rounded-full border font-medium flex items-center gap-1.5 w-fit", styles[status])}>
            {status === 'PENDING_NGO_CONFIRMATION' && <Clock size={12} />}
            {status === 'ACCEPTED' && <CheckCircle size={12} />}
            {status === 'COLLECTED' && <Truck size={12} />}
            {labels[status]}
        </span>
    );
};

const StatCard = ({ title, value, unit, icon: Icon, color, trend }: { title: string, value: number, unit?: string, icon: any, color: string, trend?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-6 rounded-2xl relative overflow-hidden group"
    >
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
            <Icon size={64} />
        </div>
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-gray-800 ${color} bg-opacity-20`}>
                    <Icon size={20} className={color.replace('bg-', 'text-')} />
                </div>
                {trend && (
                    <div className="flex items-center gap-1 text-emerald-500 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded-full">
                        <ArrowUpRight size={12} />
                        {trend}
                    </div>
                )}
            </div>
            <div className="space-y-1">
                <span className="text-gray-400 text-sm font-medium block">{title}</span>
                <div className="text-3xl font-bold text-white">
                    {value}
                    {unit && <span className="text-lg text-gray-500 ml-1 font-normal">{unit}</span>}
                </div>
            </div>
        </div>
    </motion.div>
);

export default function RestaurantDashboard() {
    const [loading, setLoading] = useState(true);
    const [donations, setDonations] = useState<Donation[]>([]);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        foodType: '',
        quantity: '',
        freshness: 'Good for 24 hours',
        notes: ''
    });

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setDonations(mockDonations);
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleCreateDonation = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newDonation: Donation = {
            id: `d${Date.now()}`,
            ngoName: "Pending Assignment", // In real app, this might be assigned later or selected
            foodType: formData.foodType,
            quantityMeals: parseInt(formData.quantity) || 0,
            status: "PENDING_NGO_CONFIRMATION",
            createdAt: new Date().toISOString(),
            impact: { co2SavedKg: (parseInt(formData.quantity) || 0) * 0.5 } // Mock calculation
        };

        setDonations([newDonation, ...donations]);
        setIsSubmitting(false);
        setIsModalOpen(false);
        setFormData({ foodType: '', quantity: '', freshness: 'Good for 24 hours', notes: '' });
    };

    return (
        <div className="min-h-screen bg-black text-gray-100 p-6 md:p-8 font-sans selection:bg-blue-500/30">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Restaurant Dashboard
                        </h1>
                        <p className="text-gray-400 mt-1">Track your contributions and environmental impact</p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 active:scale-95"
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
                        color="text-purple-500"
                        trend="+12% this month"
                    />
                    <StatCard
                        title="Meals Provided"
                        value={mockStats.totalMealsProvided + donations.reduce((acc, curr) => !mockDonations.find(d => d.id === curr.id) ? acc + curr.quantityMeals : acc, 0)}
                        icon={Utensils}
                        color="text-orange-500"
                        trend="+85 meals"
                    />
                    <StatCard
                        title="CO₂ Saved"
                        value={mockStats.totalCo2SavedKg + donations.reduce((acc, curr) => !mockDonations.find(d => d.id === curr.id) ? acc + curr.impact.co2SavedKg : acc, 0)}
                        unit="kg"
                        icon={Leaf}
                        color="text-emerald-500"
                        trend="+24kg saved"
                    />
                </div>

                {/* Recent Activity */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                            <Clock size={20} className="text-blue-400" />
                            Donation History
                        </h2>
                        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
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
                                        className="h-24 bg-gray-900/30 rounded-2xl animate-pulse"
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
                                        className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-all group"
                                    >
                                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

                                            <div className="flex items-start gap-4">
                                                <div className="p-3 rounded-xl bg-gray-800/50 text-gray-400 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors">
                                                    <Utensils size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white mb-1">
                                                        {donation.foodType}
                                                    </h3>
                                                    <div className="flex items-center gap-3 text-sm text-gray-400">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar size={14} />
                                                            {new Date(donation.createdAt).toLocaleDateString()}
                                                        </span>
                                                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                                                        <span>{donation.quantityMeals} meals</span>
                                                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                                                        <span className="text-emerald-400 flex items-center gap-1">
                                                            <Leaf size={12} />
                                                            {donation.impact.co2SavedKg}kg CO₂
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                                                <div className="text-right mr-4 hidden md:block">
                                                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Assigned NGO</div>
                                                    <div className="text-sm font-medium text-gray-300">{donation.ngoName}</div>
                                                </div>
                                                <StatusBadge status={donation.status} />
                                                <button className="p-2 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-gray-800">
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

                {/* New Donation Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                                onClick={() => setIsModalOpen(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="fixed inset-0 m-auto w-full max-w-lg h-fit bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
                            >
                                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-white">New Donation</h2>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <form onSubmit={handleCreateDonation} className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Food Type</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.foodType}
                                            onChange={e => setFormData({ ...formData, foodType: e.target.value })}
                                            placeholder="e.g., Leftover Catering Trays"
                                            className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Quantity (Meals)</label>
                                            <input
                                                type="number"
                                                required
                                                min="1"
                                                value={formData.quantity}
                                                onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                                                placeholder="e.g., 50"
                                                className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Freshness</label>
                                            <select
                                                value={formData.freshness}
                                                onChange={e => setFormData({ ...formData, freshness: e.target.value })}
                                                className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none"
                                            >
                                                <option>Good for 2 hours</option>
                                                <option>Good for 4 hours</option>
                                                <option>Good for 12 hours</option>
                                                <option>Good for 24 hours</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Notes</label>
                                        <textarea
                                            rows={3}
                                            value={formData.notes}
                                            onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                            placeholder="Any specific details (allergens, packaging, etc.)"
                                            className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                                        />
                                    </div>

                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3 text-sm text-blue-200">
                                        <AlertCircle size={20} className="text-blue-400 shrink-0" />
                                        <p>Our AI will automatically match this donation with the most suitable NGO based on location and need.</p>
                                    </div>

                                    <div className="pt-2 flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-medium transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Create Donation'}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
