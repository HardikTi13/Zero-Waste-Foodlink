"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ================== CONTEXT ==================

interface CurveTransitionContextType {
    triggerTransition: (callback: () => void, label?: string) => void;
}

const CurveTransitionContext = createContext<CurveTransitionContextType | undefined>(undefined);

export const useCurveTransition = () => {
    const context = useContext(CurveTransitionContext);
    if (!context) {
        throw new Error("useCurveTransition must be used within a CurveTransitionProvider");
    }
    return context;
};

// ================== PROVIDER ==================

export function CurveTransitionProvider({ children }: { children: React.ReactNode }) {
    const [isActive, setIsActive] = useState(false);
    const [label, setLabel] = useState("");
    const [callback, setCallback] = useState<(() => void) | null>(null);

    const triggerTransition = (cb: () => void, text: string = "") => {
        if (isActive) return; // Prevent double trigger
        setLabel(text);
        setCallback(() => cb);
        setIsActive(true);
    };

    const handleAnimationComplete = () => {
        if (callback) {
            callback();
        }
    };

    const handleTransitionFinished = () => {
        setIsActive(false);
        setCallback(null);
        setLabel("");
    };

    return (
        <CurveTransitionContext.Provider value={{ triggerTransition }}>
            {children}
            <AnimatePresence mode="wait">
                {isActive && (
                    <CurveOverlay
                        label={label}
                        onCovered={handleAnimationComplete}
                        onFinished={handleTransitionFinished}
                    />
                )}
            </AnimatePresence>
        </CurveTransitionContext.Provider>
    );
}

// ================== OVERLAY COMPONENT ==================

const CurveOverlay = ({ label, onCovered, onFinished }: { label: string, onCovered: () => void, onFinished: () => void }) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [animState, setAnimState] = useState<"entering" | "exiting">("entering");

    useEffect(() => {
        const resize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    useEffect(() => {
        if (animState === "entering") {
            // Wait for enter animation to finish (approx 0.8s)
            const timer = setTimeout(() => {
                onCovered();
                setAnimState("exiting");
            }, 500);
            return () => clearTimeout(timer);
        } else {
            // Wait for exit animation to finish
            const timer = setTimeout(() => {
                onFinished();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [animState, onCovered, onFinished]);

    const { height, width } = dimensions;
    if (width === 0) return null;

    // SVG Paths
    // Initial: Flat at top
    const initialPath = `M0 0 L${width} 0 L${width} 0 Q${width / 2} 0 0 0 L0 0`;

    // Covered: Full screen with a large curve at the bottom
    // We add 600px to the control point to create a deep curve
    const targetPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 600} 0 ${height} L0 0`;

    // Exit: Collapsed at bottom (maintaining curve)
    const exitPath = `M0 ${height} L${width} ${height} L${width} ${height} Q${width / 2} ${height + 600} 0 ${height} L0 ${height}`;

    const curveVariants = {
        initial: {
            d: initialPath,
        },
        covered: {
            d: targetPath,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: exitPath,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none flex flex-col"
        >
            {/* The main block */}
            <motion.div
                className="flex-1 bg-green-700 w-full relative flex items-center justify-center"
                initial={{ y: "-100%" }}
                animate={animState === "entering" ? { y: "0%" } : { y: "100%" }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
                {/* Label */}
                <motion.p
                    className="text-white text-4xl font-bold absolute z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {label}
                </motion.p>

                {/* The Curve SVG */}
                <svg className="absolute top-0 left-0 w-full h-full fill-stone-950 pointer-events-none overflow-visible">
                    <motion.path
                        initial="initial"
                        animate={animState === "entering" ? "covered" : "exit"}
                        variants={curveVariants}
                    />
                </svg>
            </motion.div>
        </motion.div>
    );
};
