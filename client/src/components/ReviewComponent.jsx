import { useState } from "react";
import Markdown from "react-markdown";
import { Loader2, Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion, AnimatePresence } from "framer-motion";

function CodeBlock({ language, value }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={copyCode}
        className="absolute right-3 top-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 transform hover:scale-105"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <Check className="h-4 w-4 text-green-400" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <Copy className="h-4 w-4 text-blue-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: "0.75rem",
          padding: "1.75rem",
          background: "#1a1a1a",
          fontSize: "0.95rem",
          lineHeight: "1.5",
        }}
      >
        {value}
      </SyntaxHighlighter>
    </motion.div>
  );
}

export default function ReviewComponent({ review, loading }) {
  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 min-h-[400px] overflow-auto border border-white/5">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            className="flex justify-center items-center h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2 className="animate-spin text-blue-400 h-8 w-8" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Markdown
              className="prose prose-invert max-w-none prose-p:text-lg prose-headings:text-white/90 prose-code:text-blue-400"
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <CodeBlock
                      language={match[1]}
                      value={String(children).replace(/\n$/, "")}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {review || "Your review will appear here..."}
            </Markdown>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
