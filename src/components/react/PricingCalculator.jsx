import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
    {
        id: 'pages', label: 'Pages', options: [
            { value: 1, label: 'Landing Page', price: 1000 },
            { value: 5, label: '5-10 Pages', price: 2500 },
            { value: 10, label: '10+ Pages', price: 4000 }
        ]
    },
    {
        id: 'design', label: 'Design Tier', options: [
            { value: 'template', label: 'Template Customization', price: 500 },
            { value: 'custom', label: 'Custom Design', price: 2000 },
            { value: 'premium', label: 'Premium 3D/Animated', price: 4000 }
        ]
    },
    {
        id: 'functionality', label: 'Functionality', options: [
            { value: 'basic', label: 'Informational', price: 0 },
            { value: 'cms', label: 'CMS / Blog', price: 1500 },
            { value: 'ecommerce', label: 'E-Commerce', price: 3500 },
            { value: 'webapp', label: 'Web App / SaaS', price: 6000 }
        ]
    },
    {
        id: 'extras', label: 'Extras', multi: true, options: [
            { value: 'seo', label: 'Advanced SEO', price: 800 },
            { value: 'copy', label: 'Copywriting', price: 600 },
            { value: 'logo', label: 'Logo / Branding', price: 1200 },
            { value: 'analytics', label: 'Analytics Setup', price: 300 }
        ]
    }
];

export default function PricingCalculator({ lang = 'es' }) {
    const [selections, setSelections] = useState({
        pages: 1000,
        design: 500,
        functionality: 0,
        extras: []
    });

    const [total, setTotal] = useState(0);

    useEffect(() => {
        const pagesPrice = selections.pages;
        const designPrice = selections.design;
        const funcPrice = selections.functionality;
        const extrasPrice = selections.extras.reduce((acc, curr) => acc + curr, 0);
        setTotal(pagesPrice + designPrice + funcPrice + extrasPrice);
    }, [selections]);

    const handleSelect = (category, value, price) => {
        setSelections(prev => ({
            ...prev,
            [category]: price
        }));
    };

    const handleMultiSelect = (category, value, price) => {
        setSelections(prev => {
            const current = prev[category];
            if (current.includes(price)) {
                return { ...prev, [category]: current.filter(p => p !== price) };
            } else {
                return { ...prev, [category]: [...current, price] };
            }
        });
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <h3 className="text-3xl font-display font-bold text-white mb-6">
                        {lang === 'es' ? 'Calculadora de Presupuesto' : 'Project Estimator'}
                    </h3>

                    {features.map((feature) => (
                        <div key={feature.id} className="space-y-4">
                            <label className="text-sm font-medium text-gray-400 uppercase tracking-widest">{feature.label}</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {feature.options.map((option) => {
                                    const isSelected = feature.multi
                                        ? selections[feature.id].includes(option.price)
                                        : selections[feature.id] === option.price;

                                    return (
                                        <button
                                            key={option.value}
                                            onClick={() => feature.multi
                                                ? handleMultiSelect(feature.id, option.value, option.price)
                                                : handleSelect(feature.id, option.value, option.price)
                                            }
                                            className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-300 text-left ${isSelected
                                                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25'
                                                    : 'bg-dark/50 border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/5'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12 flex flex-col justify-center sticky top-24">
                    <div className="text-center">
                        <span className="text-gray-400 text-sm uppercase tracking-widest mb-2 block">
                            {lang === 'es' ? 'Estimado Total' : 'Total Estimate'}
                        </span>
                        <div className="text-5xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2">
                            ${total.toLocaleString()}
                        </div>
                        <p className="text-xs text-gray-500 mb-8">
                            {lang === 'es' ? '*Precio aproximado. Contacta para cotización final.' : '*Approximate price. Contact for final quote.'}
                        </p>
                        <a
                            href="#contact"
                            className="block w-full py-4 rounded-xl bg-white text-dark font-bold hover:bg-gray-200 transition-colors text-center"
                        >
                            {lang === 'es' ? 'Solicitar Presupuesto' : 'Request Quote'}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
