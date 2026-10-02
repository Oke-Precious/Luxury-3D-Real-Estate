import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '../data/config';
import { audioSystem } from '../utils/audioSystem';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Acquisition Inquiry',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    audioSystem.playTransition();
    setIsSent(true);
  };

  return (
    <div className="pt-32 pb-28 px-6 md:px-16 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="border-b border-white/10 pb-12 mb-16">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-2">
          CLIENT GALLERIES & DESKS
        </span>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
            Connect & Advisory
          </h1>
          <p className="text-xs md:text-sm text-[#A0A09B] max-w-md font-sans-ui leading-relaxed">
            Direct access to our senior partner desks in Ikoyi, Lagos and Mayfair, London.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Contact Galleries & Addresses */}
        <div className="lg:col-span-5 space-y-12">
          <div>
            <h3 className="text-xl font-serif text-white mb-6">Private Client Galleries</h3>
            <div className="space-y-6">
              {BRAND_CONFIG.contact.offices.map((office, idx) => (
                <div key={idx} className="border border-white/10 bg-[#121314] p-6 space-y-2">
                  <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider block">
                    {office.type}
                  </span>
                  <h4 className="text-lg font-serif text-white">{office.city}</h4>
                  <p className="text-xs text-[#A0A09B] font-sans-ui">{office.address}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 space-y-4 text-xs font-mono">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-[#6B6B67]">TELEPHONE</span>
              <span className="text-white">{BRAND_CONFIG.contact.phoneDisplay}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-[#6B6B67]">WHATSAPP PRIVATE DESK</span>
              <a href={BRAND_CONFIG.contact.whatsappLink} target="_blank" rel="noreferrer" className="text-[#C5A880] hover:underline">
                {BRAND_CONFIG.contact.whatsappDisplay}
              </a>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-[#6B6B67]">CONCIERGE EMAIL</span>
              <span className="text-white">{BRAND_CONFIG.contact.conciergeEmail}</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 border border-white/10 bg-[#121314] p-8 md:p-12">
          {isSent ? (
            <div className="py-16 text-center animate-in fade-in">
              <CheckCircle2 size={40} className="mx-auto mb-4 text-[#C5A880]" />
              <h3 className="text-2xl font-serif text-white mb-2">Message Transmitted</h3>
              <p className="text-xs md:text-sm text-[#A0A09B] max-w-sm mx-auto leading-relaxed">
                Thank you. A Senior Client Advisor will reach out via your specified contact method shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider block mb-4">
                INITIATE PRIVATE CORRESPONDENCE
              </span>

              <div>
                <label className="block text-[11px] font-mono text-[#A0A09B] uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Folake Adeyemi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#18191A] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-[#A0A09B] uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#18191A] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#A0A09B] uppercase mb-1">
                    Telephone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+234..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#18191A] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#A0A09B] uppercase mb-1">
                  Nature of Mandate
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#18191A] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="General Acquisition Inquiry">Trophy Residential Acquisition</option>
                  <option value="Private Viewing Request">Schedule Private Viewing</option>
                  <option value="Off-Market Mandate">Off-Market Confidential Search</option>
                  <option value="Property Divestment">Architectural Property Divestment</option>
                  <option value="Media & Press">Architectural Press & Curation</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#A0A09B] uppercase mb-1">
                  Confidential Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Detail your acquisition timeline, preferred enclave, or specific architectural requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#18191A] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C5A880] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#F4F1EA] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] transition-colors"
              >
                Transmit Inquiry to Advisory Desk
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
