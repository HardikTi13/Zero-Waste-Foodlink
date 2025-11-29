import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

import { useCurveTransition } from "./ui/CurveTransition";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const { triggerTransition } = useCurveTransition();

    return (
        <button
            onClick={() => triggerTransition(() => setTheme(theme === "light" ? "dark" : "light"), theme === "light" ? "Dark Mode" : "Light Mode")}
            className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors relative overflow-hidden"
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{
                    scale: theme === "dark" ? 1 : 0,
                    opacity: theme === "dark" ? 1 : 0,
                    rotate: theme === "dark" ? 0 : 180,
                }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 m-auto flex items-center justify-center"
            >
                <Moon size={20} />
            </motion.div>
            <motion.div
                initial={false}
                animate={{
                    scale: theme === "light" ? 1 : 0,
                    opacity: theme === "light" ? 1 : 0,
                    rotate: theme === "light" ? 0 : -180,
                }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
            >
                <Sun size={20} />
            </motion.div>
        </button>
    );
}
