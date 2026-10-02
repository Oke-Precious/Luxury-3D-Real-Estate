import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import Loader from './components/ui/Loader';
import ResidenceExperience from './components/residence/ResidenceExperience';
import PrivateViewingDrawer from './components/modals/PrivateViewingDrawer';
import SearchModal from './components/modals/SearchModal';
import SavedDrawer from './components/modals/SavedDrawer';
import PropertyCompareModal from './components/property/PropertyCompareModal';

import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Developments from './pages/Developments';
import Locations from './pages/Locations';
import Journal from './pages/Journal';
import About from './pages/About';
import Contact from './pages/Contact';
import Compare from './pages/Compare';

import { useSavedProperties } from './hooks/useSavedProperties';
import { PROPERTIES } from './data/properties';

/**
 * ScrollToTop helper on navigation
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [currency, setCurrency] = useState('NGN');
  
  // Signature Experience State ("ENTER THE RESIDENCE")
  const [activeResidenceExperience, setActiveResidenceExperience] = useState(null);

  // Modal / Drawer States
  const [isViewingDrawerOpen, setIsViewingDrawerOpen] = useState(false);
  const [viewingTargetProperty, setViewingTargetProperty] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Saved Properties Hook
  const {
    savedIds,
    toggleSave,
    isSaved,
    savedCount,
    compareIds,
    toggleCompare,
    isCompared,
    clearCompare
  } = useSavedProperties();

  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'NGN' ? 'USD' : 'NGN'));
  };

  const handleOpenViewing = (property = null) => {
    setViewingTargetProperty(property || PROPERTIES[0]);
    setIsViewingDrawerOpen(true);
  };

  const handleEnterResidence = (property) => {
    setActiveResidenceExperience(property);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      
      {/* Contextual Desktop Custom Cursor */}
      <CustomCursor />

      {/* Cinematic Architectural Construction Loader */}
      {!isAppLoaded && (
        <Loader onComplete={() => setIsAppLoaded(true)} />
      )}

      <div className="relative min-h-screen bg-[#0E0F0F] text-[#F4F1EA] flex flex-col justify-between selection:bg-[#C5A880]/30 selection:text-[#F4F1EA]">
        {/* Navigation Bar */}
        <Navbar
          savedCount={savedCount}
          onOpenSaved={() => setIsSavedOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onRequestViewing={() => handleOpenViewing()}
          currency={currency}
          onToggleCurrency={handleToggleCurrency}
        />

        {/* Routes View */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  currency={currency}
                  isSaved={isSaved}
                  isCompared={isCompared}
                  onToggleSave={toggleSave}
                  onToggleCompare={toggleCompare}
                  onSelectProperty={handleEnterResidence}
                  onRequestViewing={handleOpenViewing}
                />
              }
            />
            <Route
              path="/properties"
              element={
                <Properties
                  currency={currency}
                  isSaved={isSaved}
                  isCompared={isCompared}
                  onToggleSave={toggleSave}
                  onToggleCompare={toggleCompare}
                  onSelectProperty={handleEnterResidence}
                  onRequestViewing={handleOpenViewing}
                />
              }
            />
            <Route
              path="/property/:id"
              element={
                <PropertyDetails
                  currency={currency}
                  isSaved={isSaved}
                  isCompared={isCompared}
                  onToggleSave={toggleSave}
                  onToggleCompare={toggleCompare}
                  onEnterExperience={handleEnterResidence}
                  onRequestViewing={handleOpenViewing}
                />
              }
            />
            <Route
              path="/developments"
              element={<Developments onRequestViewing={handleOpenViewing} />}
            />
            <Route
              path="/locations"
              element={
                <Locations
                  onSelectProperty={handleEnterResidence}
                  onRequestViewing={handleOpenViewing}
                />
              }
            />
            <Route path="/journal" element={<Journal />} />
            <Route
              path="/about"
              element={<About onRequestViewing={handleOpenViewing} />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/compare"
              element={
                <Compare
                  compareIds={compareIds}
                  currency={currency}
                  onRemoveCompare={toggleCompare}
                  onClearCompare={clearCompare}
                  onSelectProperty={handleEnterResidence}
                  onRequestViewing={handleOpenViewing}
                />
              }
            />
          </Routes>
        </main>

        {/* Dramatic Architectural Footer */}
        <Footer onRequestViewing={() => handleOpenViewing()} />

        {/* ----------------- MODALS & DRAWERS ----------------- */}

        {/* Signature Experience: Fullscreen 3D Residence Experience */}
        {activeResidenceExperience && (
          <ResidenceExperience
            property={activeResidenceExperience}
            currency={currency}
            isOpen={Boolean(activeResidenceExperience)}
            onClose={() => setActiveResidenceExperience(null)}
            onRequestViewing={(p) => {
              setActiveResidenceExperience(null);
              handleOpenViewing(p);
            }}
          />
        )}

        {/* Confidential Viewing Drawer */}
        <PrivateViewingDrawer
          isOpen={isViewingDrawerOpen}
          onClose={() => setIsViewingDrawerOpen(false)}
          initialProperty={viewingTargetProperty}
        />

        {/* Instant Search & Multi-criteria Filter Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          currency={currency}
          onSelectProperty={handleEnterResidence}
        />

        {/* Saved Residences Portfolio Drawer */}
        <SavedDrawer
          isOpen={isSavedOpen}
          onClose={() => setIsSavedOpen(false)}
          savedIds={savedIds}
          onToggleSave={toggleSave}
          onSelectProperty={handleEnterResidence}
          onRequestViewing={handleOpenViewing}
          currency={currency}
        />

        {/* Property Comparison Modal */}
        <PropertyCompareModal
          isOpen={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
          compareIds={compareIds}
          onRemoveCompare={toggleCompare}
          onClearCompare={clearCompare}
          onSelectProperty={handleEnterResidence}
          onRequestViewing={handleOpenViewing}
          currency={currency}
        />
      </div>
    </BrowserRouter>
  );
}
