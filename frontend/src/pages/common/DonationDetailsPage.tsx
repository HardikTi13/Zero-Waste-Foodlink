import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Utensils, Clock, Leaf, AlertCircle } from 'lucide-react';
import { mockDonations } from '../../data/mockData';
import { StatusBadge } from '../../components/StatusBadge';

export default function DonationDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const donation = mockDonations.find(d => d.id === id);

    if (!donation) {
        return (
            <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-stone-900 dark:text-white">Donation Not Found</h1>
                    <p className="text-stone-500 dark:text-stone-400">The donation you are looking for does not exist.</p>
                    <button
                        onClick={() => navigate('/history')}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                    >
                        Back to History
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 p-6 md:p-8 transition-colors duration-300">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-full transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-stone-900 dark:text-white flex items-center gap-3">
                            Donation #{donation.id}
                            <StatusBadge status={donation.status} />
                        </h1>
                        <p className="text-stone-500 dark:text-stone-400 text-sm">
                            Created on {new Date(donation.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Image Section */}
                {donation.imageUrl && (
                    <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-sm bg-stone-100 dark:bg-stone-900">
                        <img
                            src={donation.imageUrl}
                            alt={donation.foodName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Food Details */}
                        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Utensils className="text-emerald-600 dark:text-emerald-500" size={20} />
                                Food Details
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Food Name</label>
                                    <p className="text-lg font-medium">{donation.foodName}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Quantity</label>
                                    <p className="text-lg font-medium">{donation.quantity} ({donation.quantityMeals} meals)</p>
                                </div>
                                {donation.expiresAt && (
                                    <div className="sm:col-span-2">
                                        <label className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Expires At</label>
                                        <p className="text-lg font-medium flex items-center gap-2">
                                            <Clock size={16} className="text-orange-500" />
                                            {new Date(donation.expiresAt).toLocaleString()}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Logistics */}
                        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <MapPin className="text-emerald-600 dark:text-emerald-500" size={20} />
                                Logistics
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-start border-b border-stone-100 dark:border-stone-800 pb-4">
                                    <div>
                                        <label className="text-xs text-stone-400 uppercase tracking-wider font-semibold">From (Restaurant)</label>
                                        <p className="text-base font-medium">{donation.restaurantName}</p>
                                    </div>
                                    <div className="text-right">
                                        <label className="text-xs text-stone-400 uppercase tracking-wider font-semibold">To (NGO)</label>
                                        <p className="text-base font-medium">{donation.ngoName || "Pending Assignment"}</p>
                                    </div>
                                </div>
                                {donation.location && (
                                    <div>
                                        <label className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Pickup Location</label>
                                        <p className="text-sm font-mono bg-stone-100 dark:bg-stone-800 p-2 rounded-lg mt-1">
                                            {donation.location.coordinates.join(', ')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Impact */}
                        <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl p-6">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-emerald-800 dark:text-emerald-400">
                                <Leaf size={20} />
                                Environmental Impact
                            </h2>
                            <div className="text-center py-4">
                                <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-500">
                                    {donation.impact?.co2SavedKg}
                                </span>
                                <span className="text-sm text-emerald-700 dark:text-emerald-400 ml-1">kg</span>
                                <p className="text-sm text-emerald-600/80 dark:text-emerald-400/80 mt-1">CO₂ Emissions Prevented</p>
                            </div>
                        </div>

                        {/* AI Analysis */}
                        {donation.aiAnalysis && (
                            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm">
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <AlertCircle className="text-purple-500" size={20} />
                                    AI Analysis
                                </h2>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <span className="text-stone-500 dark:text-stone-400">Freshness:</span>
                                        <p className="font-medium">{donation.aiAnalysis.freshness}</p>
                                    </div>
                                    <div>
                                        <span className="text-stone-500 dark:text-stone-400">Notes:</span>
                                        <p className="font-medium italic">"{donation.aiAnalysis.notesForNGO}"</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
