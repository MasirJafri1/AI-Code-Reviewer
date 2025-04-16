import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import EditorComponent from "./components/EditorComponent";
import ReviewComponent from "./components/ReviewComponent";
import ReviewButton from "./components/ReviewButton";
import { Bot, Sparkles, Github, Linkedin } from "lucide-react";

export default function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  async function reviewCode() {
    setLoading(true);
    try {
      const response = await axios.post("http://ai-code-reviewer-inky.vercel.app/ai/get-review", {
        code,
      });
      setReview(response.data);
    } catch (error) {
      setReview("Error: Unable to fetch review.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen text-white">
      <header className="border-b border-white/5 backdrop-blur-sm bg-black/30 sticky top-0 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto flex items-center justify-between p-4"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 relative group">
                <Bot className="w-6 h-6 text-blue-400" />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
                Code-Inspect
              </h1>
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-white/40 ml-12 mt-0.5"
            >
              Made by Masir Jafri
            </motion.span>
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com/MasirJafri1"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5 text-white/80" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/masirjafri/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-5 h-5 text-white/80" />
            </motion.a>
          </div>
        </motion.div>
      </header>

      <main className="container mx-auto p-6">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <motion.div
              className="space-y-4"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-white/90 flex items-center gap-2">
                Your Code
              </h2>
              <EditorComponent code={code} setCode={setCode} />
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-white/90 flex items-center gap-2">
                AI Review
              </h2>
              <ReviewComponent review={review} loading={loading} />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ReviewButton reviewCode={reviewCode} loading={loading} />
        </motion.div>
      </main>
    </div>
  );
}
