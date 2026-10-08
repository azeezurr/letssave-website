'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

const quickActions = [
    { label: 'Learn about features', value: 'features' },
    { label: 'Schedule a demo', value: 'demo' },
    { label: 'Pricing information', value: 'pricing' },
    { label: 'Industry solutions', value: 'industries' }
];

const responses: Record<string, string> = {
    features: "LetsSave offers 12 comprehensive features including:\n\n• Document Management with drag-and-drop upload\n• AI & OCR Hub powered by Gemini\n• Advanced Security with AES-256 encryption\n• Geo Tagging for location-based search\n• Team Collaboration with approval workflows\n• Global Search with metadata filtering\n• Secure Viewer with watermarking\n• Folder Management with departmental isolation\n• Multi-Language support (11 languages)\n• Compliance Ready (GDPR, SOC2, HIPAA)\n• Version Control with complete history\n• Flexible Billing (AWS, Stripe, Razorpay)\n\nWhich feature would you like to know more about?",
    demo: "Great! I'd love to help you schedule a demo. Please click the 'Schedule Demo' button at the top of the page, or email us directly at sales@letssave.in with your preferred date and time. Our team typically responds within 24 hours.",
    pricing: "LetsSave offers flexible pricing plans:\n\n• Starter: Perfect for small teams\n• Professional: For growing businesses\n• Enterprise: Custom solutions with AWS Marketplace integration\n\nPricing starts at $10/user/month. For detailed pricing and to discuss your specific needs, please contact sales@letssave.in or schedule a demo.",
    industries: "LetsSave serves 8 major industries:\n\n• Healthcare: HIPAA compliance, patient records\n• Finance: SOC2 compliance, secure vault\n• Legal: Contract management, case files\n• Government: Top Secret classification\n• Education: Student records, research papers\n• Manufacturing: Technical drawings, ISO compliance\n• Real Estate: Property documents, contracts\n• Technology: IP protection, patents\n\nWhich industry are you in?"
};

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [showQuickActions, setShowQuickActions] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{
                id: '1',
                text: "👋 Hi! I'm your LetsSave AI assistant. I can help you:\n\n• Learn about our features\n• Schedule a demo\n• Get pricing information\n• Explore industry solutions\n\nHow can I assist you today?",
                role: 'assistant',
                timestamp: new Date()
            }]);
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleQuickAction = (action: string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            text: quickActions.find(a => a.value === action)?.label || action,
            role: 'user',
            timestamp: new Date()
        };

        const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: responses[action] || "I'm here to help! Please ask me about features, pricing, demos, or industry solutions.",
            role: 'assistant',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage, assistantMessage]);
        setShowQuickActions(false);
    };

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            role: 'user',
            timestamp: new Date()
        };

        // Simple keyword matching for responses
        let responseText = "Thank you for your question! For detailed information, please:\n\n• Email us at sales@letssave.in\n• Schedule a demo using the button above\n• Explore our features section\n\nOur team will be happy to provide personalized assistance!";

        const lowerInput = inputValue.toLowerCase();
        if (lowerInput.includes('feature') || lowerInput.includes('what can')) {
            responseText = responses.features;
        } else if (lowerInput.includes('demo') || lowerInput.includes('schedule') || lowerInput.includes('meeting')) {
            responseText = responses.demo;
        } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('plan')) {
            responseText = responses.pricing;
        } else if (lowerInput.includes('industry') || lowerInput.includes('sector') || lowerInput.includes('healthcare') || lowerInput.includes('finance')) {
            responseText = responses.industries;
        } else if (lowerInput.includes('security') || lowerInput.includes('secure')) {
            responseText = "Security is our top priority! LetsSave offers:\n\n• AES-256 encryption\n• Top Secret classification levels\n• Password protection\n• Role-based access control (RBAC)\n• GDPR, SOC2, and HIPAA compliance\n• Audit trails and data residency\n\nYour documents are protected with bank-grade security.";
        } else if (lowerInput.includes('ai') || lowerInput.includes('gemini')) {
            responseText = "Our AI & OCR Hub is powered by Gemini Pro Vision:\n\n• Automated document summarization\n• Intelligent content extraction\n• Smart tagging and categorization\n• OCR for scanned documents\n• Natural language search\n\nAI makes your documents searchable and actionable!";
        }

        const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: responseText,
            role: 'assistant',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage, assistantMessage]);
        setInputValue('');
        setShowQuickActions(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[150] flex flex-col items-end">
            {isOpen && (
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-96 mb-4 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200 flex flex-col h-[600px]">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 flex justify-between items-center text-white shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <Sparkles className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">LetsSave AI</h3>
                                <p className="text-xs text-indigo-100">Always here to help</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/20 rounded-full p-2 transition-colors"
                            aria-label="Close Chat"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'assistant'
                                        ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white'
                                        : 'bg-slate-300 text-slate-700'
                                    }`}>
                                    {msg.role === 'assistant' ? <Sparkles className="h-4 w-4" /> : <span className="text-xs font-bold">You</span>}
                                </div>
                                <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${msg.role === 'user'
                                        ? 'bg-indigo-600 text-white rounded-br-none'
                                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                                    }`}>
                                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
                                    <p className={`text-[10px] mt-2 ${msg.role === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions */}
                    {showQuickActions && (
                        <div className="px-6 pb-4 pt-2 bg-slate-50 border-t border-slate-200 shrink-0">
                            <p className="text-xs text-slate-500 font-semibold mb-3">Quick actions:</p>
                            <div className="grid grid-cols-2 gap-2">
                                {quickActions.map((action) => (
                                    <button
                                        key={action.value}
                                        onClick={() => handleQuickAction(action.value)}
                                        className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-all"
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex gap-3 shrink-0">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask me anything..."
                            className="flex-1 px-4 py-3 bg-slate-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                        <button
                            type="submit"
                            disabled={!inputValue.trim()}
                            className="p-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                            aria-label="Send Message"
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all border-4 border-white"
                aria-label="Toggle Chat"
            >
                {isOpen ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
                )}
            </button>
        </div>
    );
}
