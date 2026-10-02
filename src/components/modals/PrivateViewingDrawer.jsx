import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, ShieldCheck, ArrowRight, PhoneCall } from 'lucide-react';
import { audioSystem } from '../../utils/audioSystem';
import { PROPERTIES } from '../../data/properties';
import { BRAND_CONFIG } from '../../data/config';

export default function PrivateViewingDrawer({
  isOpen,
  onClose,
  initialProperty = null
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    propertyId: initialProperty?.id || 'azure-residence',
    preferredDate: '',
    preferredTime: '11:00 AM',
    viewingType: 'In-Person Private Tour', // 'In-Person' | 'Virtual 3D Consultation' | 'VIP Aviation Transfer'
    message: '',
    requestType: 'viewing' // 'viewing' | 'callback'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full legal name is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid private email address is required.';
    if (!formData.phone.trim()) errs.phone = 'Contact telephone number is required.';
    if (formData.requestType === 'viewing' && !formData.preferredDate) {
      errs.preferredDate = 'Please select a preferred viewing date.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    audioSystem.playClick();

    // Simulated graceful client-side submission
    // NOTE: Replace with production CRM / webhook endpoint (e.g., /api/inquiry)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      audioSystem.playTransition();
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />

      {/* Side Panel Drawer */}
      <div className="relative z-10 w-full max-w-xl bg-[#121314] text-[#F4F1EA] h-full shadow-2xl border-l border-white/10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-400">
        {/* Header */}
        <div className="p-8 md:p-10 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-1">
              CONFIDENTIAL PROTOCOL
            </span>
            <h2 className="text-2xl font-serif text-white tracking-wide">
              Request Private Access
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-white/15 text-[#A0A09B] hover:text-white hover:border-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-10 flex-1">
          {isSubmitted ? (
            <div className="py-12 text-center animate-in fade-in duration-500">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-[#C5A880] flex items-center justify-center text-[#C5A880]">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-serif text-white mb-2">
                Inquiry Received
              </h3>
              <p className="text-sm text-[#A0A09B] max-w-md mx-auto leading-relaxed mb-6 font-sans-ui">
                A Senior Private Client Advisor has been assigned to your request. You will receive a discreet confirmation and itinerary via your preferred contact channel within 4 business hours.
              </p>
              <div className="p-4 bg-white/5 border border-white/10 text-xs font-mono text-[#C5A880] max-w-sm mx-auto mb-8">
                REF: ATELIER-{Math.floor(100000 + Math.random() * 900000)}
              </div>
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-[#F4F1EA] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] transition-colors"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type Switcher: Viewing vs Callback */}
              <div className="flex border border-white/15 p-1 bg-white/5">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, requestType: 'viewing' })}
                  className={`flex-1 py-2 text-xs uppercase tracking-wider transition-colors ${
                    formData.requestType === 'viewing'
                      ? 'bg-[#C5A880] text-[#0E0F0F] font-semibold'
                      : 'text-[#A0A09B] hover:text-white'
                  }`}
                >
                  Schedule Viewing
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, requestType: 'callback' })}
                  className={`flex-1 py-2 text-xs uppercase tracking-wider transition-colors ${
                    formData.requestType === 'callback'
                      ? 'bg-[#C5A880] text-[#0E0F0F] font-semibold'
                      : 'text-[#A0A09B] hover:text-white'
                  }`}
                >
                  Request Callback
                </button>
              </div>

              {/* Residence Selection */}
              <div>
                <label className="block text-[11px] font-mono tracking-widest uppercase text-[#A0A09B] mb-2">
                  Selected Residence
                </label>
                <select
                  value={formData.propertyId}
                  onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                  className="w-full bg-[#18191A] border border-white/15 px-4 py-3 text-sm text-[#F4F1EA] focus:border-[#C5A880] focus:outline-none"
                >
                  {PROPERTIES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} — {p.district}, {p.city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Format Selection (if viewing) */}
              {formData.requestType === 'viewing' && (
                <div>
                  <label className="block text-[11px] font-mono tracking-widest uppercase text-[#A0A09B] mb-2">
                    Viewing Format
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      'In-Person Tour',
                      'Virtual 3D Walk',
                      'VIP Chauffeur Transfer'
                    ].map((format) => (
                      <button
                        key={format}
                        type="button"
                        onClick={() => setFormData({ ...formData, viewingType: format })}
                        className={`p-2.5 text-left border text-[11px] uppercase tracking-wider transition-colors ${
                          formData.viewingType === format
                            ? 'border-[#C5A880] bg-[#C5A880]/15 text-white'
                            : 'border-white/10 text-[#A0A09B] hover:border-white/30'
                        }`}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Date & Time if viewing */}
              {formData.requestType === 'viewing' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono tracking-widest uppercase text-[#A0A09B] mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-[#18191A] border border-white/15 px-4 py-3 text-xs text-[#F4F1EA] focus:border-[#C5A880] focus:outline-none"
                    />
                    {errors.preferredDate && (
                      <span className="text-[10px] text-red-400 mt-1 block">{errors.preferredDate}</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono tracking-widest uppercase text-[#A0A09B] mb-2">
                      Preferred Time Slot
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full bg-[#18191A] border border-white/15 px-4 py-3 text-xs text-[#F4F1EA] focus:border-[#C5A880] focus:outline-none"
                    >
                      <option value="10:00 AM">10:00 AM (Morning Sunlight)</option>
                      <option value="01:00 PM">01:00 PM (Midday Perspective)</option>
                      <option value="04:30 PM">04:30 PM (Golden Hour Sunset)</option>
                      <option value="07:30 PM">07:30 PM (Nocturnal Illumination)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Client Credentials */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono tracking-widest uppercase text-[#A0A09B] mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Adebayo Sterling"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#18191A] border border-white/15 px-4 py-3 text-sm text-[#F4F1EA] focus:border-[#C5A880] focus:outline-none placeholder:text-[#6B6B67]"
                  />
                  {errors.fullName && (
                    <span className="text-[10px] text-red-400 mt-1 block">{errors.fullName}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono tracking-widest uppercase text-[#A0A09B] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="client@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#18191A] border border-white/15 px-4 py-3 text-sm text-[#F4F1EA] focus:border-[#C5A880] focus:outline-none placeholder:text-[#6B6B67]"
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-400 mt-1 block">{errors.email}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono tracking-widest uppercase text-[#A0A09B] mb-2">
                      Telephone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+234..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#18191A] border border-white/15 px-4 py-3 text-sm text-[#F4F1EA] focus:border-[#C5A880] focus:outline-none placeholder:text-[#6B6B67]"
                    />
                    {errors.phone && (
                      <span className="text-[10px] text-red-400 mt-1 block">{errors.phone}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono tracking-widest uppercase text-[#A0A09B] mb-2">
                    Confidential Notes or Specific Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Security entourage arrangements, non-disclosure agreement required, structural specifications..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#18191A] border border-white/15 px-4 py-3 text-xs text-[#F4F1EA] focus:border-[#C5A880] focus:outline-none placeholder:text-[#6B6B67] resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#F4F1EA] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Transmitting Protocol...'
                  ) : (
                    <>
                      Confirm Request
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>

              {/* Discretion Note */}
              <div className="flex items-start gap-3 pt-2 text-[#6B6B67] text-[11px] leading-relaxed">
                <ShieldCheck size={16} className="text-[#C5A880] shrink-0 mt-0.5" />
                <span>
                  All communications remain protected under strict professional attorney-client discretion. No data is shared with third parties.
                </span>
              </div>
            </form>
          )}
        </div>

        {/* Footer Contact bar */}
        <div className="p-6 md:p-8 border-t border-white/10 bg-[#0E0F0F] text-xs font-mono text-[#A0A09B] flex items-center justify-between">
          <span>Concierge: {BRAND_CONFIG.contact.phoneDisplay}</span>
          <a 
            href={BRAND_CONFIG.contact.whatsappLink} 
            target="_blank" 
            rel="noreferrer"
            className="text-[#C5A880] hover:underline"
          >
            Direct WhatsApp Desk →
          </a>
        </div>
      </div>
    </div>
  );
}
