import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const suggestions = [
  "Find healthcare data",
  "Compare telecom datasets",
  "What is SOHO data?",
  "Show compliance info",
  "Best data for lead gen",
];

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const botResponses: Record<string, string> = {
  "find healthcare data": "I recommend our Healthcare Professional Database with 820K+ HCP records, 93% confidence score, covering NHS and private sector. Would you like to explore it?",
  "compare telecom datasets": "You can compare up to 3 products using our Compare feature. I suggest starting with UK Decision Maker Tele Data — it has 2.8M TPS-screened contacts.",
  "what is soho data?": "SOHO stands for Small Office/Home Office. Our SOHO dataset includes 5.5M+ sole traders, freelancers, and micro-businesses (1-9 employees) across the UK.",
  "show compliance info": "All our data products are GDPR compliant, ICO registered, and regularly audited. Visit our Trust Center for full details on HIPAA, CCPA, and ISO 27001 certifications.",
  "best data for lead gen": "For lead generation, I recommend combining our B2B Email Database (97% confidence) with Postal Data for multi-channel outreach. Use the Use Case Navigator for personalized recommendations.",
};

const FloatingAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Hi! I'm DataIQ Assistant. How can I help you discover the right data products?", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), text, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const key = text.toLowerCase().trim();
    const response = botResponses[key] || "That's a great question! I'd recommend exploring our catalog or using the Use Case Navigator for personalized data product recommendations. Is there anything specific you're looking for?";

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: response, isBot: true }]);
    }, 1200 + Math.random() * 800);
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-primary shadow-xl flex items-center justify-center text-white hover:scale-105 transition-transform"
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[520px] rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border gradient-primary">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-white" />
                <div>
                  <h3 className="text-sm font-semibold text-white">DataIQ Assistant</h3>
                  <p className="text-xs text-white/60">AI-powered data discovery</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[320px]">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                    msg.isBot ? "bg-muted text-foreground" : "gradient-primary text-white"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted px-3 py-2 rounded-xl text-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs hover:bg-primary/20 transition-colors flex items-center gap-1"
                  >
                    <Sparkles className="w-2.5 h-2.5" /> {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  placeholder="Ask about data products..."
                  className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
                />
                <Button size="icon" className="gradient-primary border-0 shrink-0 h-9 w-9" onClick={() => sendMessage(input)}>
                  <Send className="w-3.5 h-3.5 text-white" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingAssistant;
