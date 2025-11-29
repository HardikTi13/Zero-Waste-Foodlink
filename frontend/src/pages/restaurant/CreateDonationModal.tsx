import { useState } from 'react';
import {
    X,
    Loader2,
    AlertCircle,
    Upload,
    Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Donation } from '../../types/donation';

interface CreateDonationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (donation: Donation) => void;
}

export default function CreateDonationModal({ isOpen, onClose, onCreate }: CreateDonationModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        foodType: '',
        quantity: '',
        freshness: 'Good for 24 hours',
        notes: '',
        image: null as string | null
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newDonation: Donation = {
            id: `d${Date.now()}`,
            ngoName: "Pending Assignment",
            foodType: formData.foodType,
            quantityMeals: parseInt(formData.quantity) || 0,
            status: "PENDING_NGO_CONFIRMATION",
            createdAt: new Date().toISOString(),
            impact: { co2SavedKg: (parseInt(formData.quantity) || 0) * 0.5 },
            imageUrl: formData.image || undefined
        };

        onCreate(newDonation);
        setIsSubmitting(false);
        onClose();
        setFormData({ foodType: '', quantity: '', freshness: 'Good for 24 hours', notes: '', image: null });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-stone-900/40 dark:bg-stone-950/60 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto w-full max-w-lg h-fit bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800/50">
                            <h2 className="text-xl font-bold text-stone-900 dark:text-white">New Donation</h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Image Upload */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Food Image (Upload for AI Analysis)</label>
                                <div className="relative">
                                    {formData.image ? (
                                        <div className="relative w-full h-48 rounded-xl overflow-hidden group border border-stone-200 dark:border-stone-700">
                                            <img src={formData.image} alt="Food preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, image: null })}
                                                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-xl cursor-pointer hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-all group">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-8 h-8 mb-3 text-stone-400 group-hover:text-emerald-500 transition-colors" />
                                                <p className="text-sm text-stone-500 dark:text-stone-400">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                            </div>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Food Type</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.foodType}
                                    onChange={e => setFormData({ ...formData, foodType: e.target.value })}
                                    placeholder="e.g., Leftover Catering Trays"
                                    className="w-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-stone-400 dark:placeholder:text-stone-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Quantity (Meals)</label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        value={formData.quantity}
                                        onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                                        placeholder="e.g., 50"
                                        className="w-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-stone-400 dark:placeholder:text-stone-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Freshness</label>
                                    <select
                                        value={formData.freshness}
                                        onChange={e => setFormData({ ...formData, freshness: e.target.value })}
                                        className="w-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all appearance-none"
                                    >
                                        <option>Good for 2 hours</option>
                                        <option>Good for 4 hours</option>
                                        <option>Good for 12 hours</option>
                                        <option>Good for 24 hours</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Notes</label>
                                <textarea
                                    rows={3}
                                    value={formData.notes}
                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                    placeholder="Any specific details (allergens, packaging, etc.)"
                                    className="w-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none placeholder:text-stone-400 dark:placeholder:text-stone-500"
                                />
                            </div>



                            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/50 rounded-xl p-4 flex gap-3 text-sm text-emerald-800 dark:text-emerald-300">
                                <AlertCircle size={20} className="text-emerald-600 dark:text-emerald-500 shrink-0" />
                                <p>Our AI will automatically match this donation with the most suitable NGO based on location and need.</p>
                            </div>

                            <div className="pt-2 flex gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-4 py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 rounded-xl font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-emerald-600/20"
                                >
                                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Create Donation'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
