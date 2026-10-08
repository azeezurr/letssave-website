'use client';

import React from 'react';
import { LayoutDashboard, FileText, Folder, Sparkles, Shield, Share2, MapPin } from 'lucide-react';

export default function HelpPage() {
    const features = [
        {
            title: 'Smart Dashboard',
            icon: LayoutDashboard,
            description: 'Your central command center for document activity.',
            details: ['Real-time status tracking', 'Pending approvals count', 'Storage usage metrics']
        },
        {
            title: 'Document Management',
            icon: FileText,
            description: 'Comprehensive tools for file handling.',
            details: ['Upload & Drag-drop', 'PDF & Image preview', 'Version control']
        },
        {
            title: 'Secure Folders',
            icon: Folder,
            description: 'Organize content with enterprise hierarchy.',
            details: ['Departmental isolation', 'Nested structures', 'Tag-based filing']
        },
        {
            title: 'AI Insights',
            icon: Sparkles,
            description: 'Powered by Gemini Pro Vision.',
            details: ['Auto-summarization', 'Content extraction', 'Smart tagging conversation']
        },
        {
            title: 'Enterprise Security',
            icon: Shield,
            description: 'Zero-trust architecture.',
            details: ['Role-Based Access (RBAC)', 'Top Secret classification', 'AES-256 Encryption']
        },
        {
            title: 'Team Collaboration',
            icon: Share2,
            description: 'Work together effectively.',
            details: ['Document sharing', 'Comment threads', 'Approval workflows']
        }
    ];

    return (
        <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4">How can we help?</h1>
                <p className="text-lg text-slate-500">
                    Explore the capabilities of the LetsSave Digital Management System.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Geo Feature Highlight */}
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 hover:shadow-lg transition-all ring-4 ring-indigo-50/50">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 rounded-2xl bg-indigo-50 text-indigo-600">
                            <MapPin size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Geo Tagging</h2>
                    </div>
                    <p className="text-slate-500 mb-6 font-medium">
                        Visualize your document origins with interactive maps.
                    </p>
                    <ul className="space-y-3">
                        {['Location-based search', 'Map visualization', 'Geofencing security'].map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                {detail}
                            </li>
                        ))}
                    </ul>
                </div>

                {features.map((feature, index) => (
                    <div key={index} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 rounded-2xl bg-slate-50 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                <feature.icon size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900">{feature.title}</h2>
                        </div>
                        <p className="text-slate-500 mb-6 font-medium">
                            {feature.description}
                        </p>
                        <ul className="space-y-3">
                            {feature.details.map((detail, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mt-16 bg-slate-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-4">Still need assistance?</h2>
                    <p className="text-slate-400 mb-8">Our support team is available 24/7 for enterprise customers.</p>
                    <button className="px-8 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-indigo-50 transition-colors">Contact Support</button>
                </div>
            </div>
        </div>
    );
}
