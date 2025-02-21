import { Loader2, Wand2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ReviewButton({ reviewCode, loading }) {
  return (
    <motion.button
      onClick={reviewCode}
      disabled={loading}
      className="relative group px-8 py-3 rounded-xl bg-blue-600 font-medium disabled:cursor-not-allowed overflow-hidden hover:bg-blue-500 transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-400/20"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59, 130, 246, 0.5) 0%, transparent 100%)",
        }}
      />
      <div className="relative flex items-center gap-2 text-white">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="animate-spin h-5 w-5" />
            Reviewing...
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <Wand2 className="h-5 w-5" />
            Review Code
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
