import { useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { StatusBadge } from '../../components/StatusBadge';

import { useNavigate } from 'react-router-dom';
import { mockDonations } from '../../data/mockData';

export default function HistoryPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('ALL');

    const filteredDonations = mockDonations.filter(donation => {
        const matchesSearch =
            donation.foodType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donation.restaurantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donation.ngoName?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'ALL' || donation.status === filterStatus;

        return matchesSearch && matchesStatus;
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h1 className="text-3xl font-bold text-stone-900 dark:text-white">Donation History</h1>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search donations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-64 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-stone-400 dark:placeholder:text-stone-500 shadow-sm"
                        />
                    </div>

                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full sm:w-48 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white pl-10 pr-8 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all appearance-none cursor-pointer shadow-sm"
                        >
                            <option value="ALL">All Status</option>
                            <option value="PENDING_NGO_CONFIRMATION">Pending</option>
                            <option value="ACCEPTED">Accepted</option>
                            <option value="COLLECTED">Collected</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 text-stone-500 dark:text-stone-400 text-sm uppercase tracking-wider">
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Food Type</th>
                                <th className="p-4 font-medium">Quantity</th>
                                <th className="p-4 font-medium">Organization</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Impact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                            <AnimatePresence>
                                {filteredDonations.map((donation) => (
                                    <motion.tr
                                        key={donation.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="group hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer"
                                        onClick={() => navigate(`/history/${donation.id}`)}
                                    >
                                        <td className="p-4 text-stone-600 dark:text-stone-400">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} className="text-stone-400 dark:text-stone-500" />
                                                {new Date(donation.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium text-stone-900 dark:text-white">{donation.foodType}</td>
                                        <td className="p-4 text-stone-600 dark:text-stone-400">{donation.quantityMeals} meals</td>
                                        <td className="p-4 text-stone-600 dark:text-stone-400">
                                            {donation.restaurantName || donation.ngoName}
                                        </td>
                                        <td className="p-4">
                                            <StatusBadge status={donation.status} />
                                        </td>
                                        <td className="p-4 text-right font-medium text-emerald-600 dark:text-emerald-400">
                                            {donation.impact?.co2SavedKg}kg CO₂
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {filteredDonations.length === 0 && (
                    <div className="p-12 text-center text-stone-500 dark:text-stone-400">
                        No donations found matching your filters.
                    </div>
                )}
            </div>
        </div>
    );
}
