import React, { useState } from 'react';
import { ArrowRight, Clock, BookOpen, Share2 } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/journal';
import { audioSystem } from '../utils/audioSystem';

export default function Journal() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = ['All', 'Architecture', 'Engineering', 'Materials'];

  const filteredArticles = JOURNAL_ARTICLES.filter((a) => {
    if (selectedCategory !== 'All' && a.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="pt-32 pb-28 px-6 md:px-16 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="border-b border-white/10 pb-12 mb-12">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-2">
          EDITORIAL ARCHIVES
        </span>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
            The Architectural Journal
          </h1>
          <p className="text-xs md:text-sm text-[#A0A09B] max-w-md font-sans-ui leading-relaxed">
            Critical essays on tropical modernist engineering, concrete materiality, and coastal residential permanence.
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex border border-white/15 p-1 bg-white/5 w-fit mb-12 text-xs font-mono">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              audioSystem.playClick();
              setSelectedCategory(cat);
            }}
            className={`px-4 py-1.5 uppercase tracking-wider transition-colors ${
              selectedCategory === cat
                ? 'bg-[#C5A880] text-[#0E0F0F] font-semibold'
                : 'text-[#A0A09B] hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            onClick={() => {
              audioSystem.playTransition();
              setActiveArticle(article);
            }}
            className="group border border-white/10 bg-[#121314] p-6 flex flex-col justify-between cursor-pointer hover:border-[#C5A880]/50 transition-colors"
          >
            <div>
              <div className="relative h-60 overflow-hidden mb-6">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 px-2 py-1 bg-[#0E0F0F]/85 text-[10px] font-mono text-[#C5A880]">
                  {article.category}
                </div>
              </div>

              <div className="flex items-center gap-3 text-[10px] font-mono text-[#6B6B67] mb-2">
                <span>{article.date}</span>
                <span>·</span>
                <span>{article.readTime}</span>
              </div>

              <h2 className="text-2xl font-serif text-white group-hover:text-[#C5A880] transition-colors mb-3 leading-snug">
                {article.title}
              </h2>

              <p className="text-xs text-[#A0A09B] font-sans-ui line-clamp-3 leading-relaxed mb-6">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#C5A880]">
              <span>By {article.author.split(',')[0]}</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Monograph →
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Reading Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 md:p-8">
          <div 
            onClick={() => setActiveArticle(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md animate-in fade-in"
          />
          <div className="relative z-10 w-full max-w-3xl max-h-[85vh] bg-[#121314] border border-white/10 text-[#F4F1EA] shadow-2xl overflow-y-auto p-8 md:p-12 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
              <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase">
                {activeArticle.category} MONOGRAPH
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="text-xs font-mono uppercase text-[#A0A09B] hover:text-white"
              >
                Close (Esc)
              </button>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4 leading-tight">
              {activeArticle.title}
            </h2>
            <div className="text-xs font-mono text-[#6B6B67] mb-8 pb-4 border-b border-white/10 flex items-center gap-4">
              <span>{activeArticle.author}</span>
              <span>·</span>
              <span>{activeArticle.date}</span>
            </div>

            <img
              src={activeArticle.heroImage}
              alt={activeArticle.title}
              className="w-full h-80 object-cover mb-8 border border-white/10"
            />

            <div className="text-sm md:text-base text-[#D0CAC0] font-sans-ui leading-relaxed space-y-6">
              {activeArticle.content.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="pt-8 mt-8 border-t border-white/10 text-center">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2.5 bg-[#F4F1EA] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880]"
              >
                Return to Journal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
