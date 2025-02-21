import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import { motion } from "framer-motion";

export default function EditorComponent({ code, setCode }) {
  return (
    <motion.div
      className="bg-black/20 backdrop-blur-sm rounded-xl border border-white/5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={(code) =>
          highlight(code, languages.javascript, "javascript")
        }
        padding={24}
        style={{
          fontFamily: '"Fira Code", monospace',
          fontSize: 15,
          backgroundColor: "transparent",
          minHeight: "400px",
          color: "#e2e8f0",
        }}
        className="min-h-[400px] outline-none"
      />
    </motion.div>
  );
}
