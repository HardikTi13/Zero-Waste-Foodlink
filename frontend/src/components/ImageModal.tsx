import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl?: string;
    altText?: string;
}

export function ImageModal({ isOpen, onClose, imageUrl, altText = "Food image" }: ImageModalProps) {
    return (
        <AnimatePresence>
            {isOpen && imageUrl && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-stone-900/80 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 m-auto w-full max-w-3xl h-fit max-h-[90vh] p-4 z-50 pointer-events-none flex items-center justify-center"
                    >
                        <div className="relative bg-white dark:bg-stone-900 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors z-10"
                            >
                                <X size={20} />
                            </button>
                            <img
                                src={imageUrl}
                                alt={altText}
                                className="w-full h-full max-h-[85vh] object-contain bg-stone-100 dark:bg-stone-950"
                            />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
