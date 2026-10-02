import { useState, useEffect } from 'react';
import { audioSystem } from '../utils/audioSystem';

const STORAGE_KEY = 'atelier_saved_residences';
const COMPARE_KEY = 'atelier_compare_residences';

export function useSavedProperties() {
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : ['azure-residence'];
    } catch {
      return ['azure-residence'];
    }
  });

  const [compareIds, setCompareIds] = useState(() => {
    try {
      const stored = localStorage.getItem(COMPARE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    } catch (e) {
      console.warn('Could not persist saved properties', e);
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(COMPARE_KEY, JSON.stringify(compareIds));
    } catch (e) {
      console.warn('Could not persist compare properties', e);
    }
  }, [compareIds]);

  const toggleSave = (propertyId) => {
    audioSystem.playClick();
    setSavedIds((prev) => {
      if (prev.includes(propertyId)) {
        return prev.filter((id) => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
  };

  const isSaved = (propertyId) => savedIds.includes(propertyId);

  const toggleCompare = (propertyId) => {
    audioSystem.playClick();
    setCompareIds((prev) => {
      if (prev.includes(propertyId)) {
        return prev.filter((id) => id !== propertyId);
      }
      if (prev.length >= 3) {
        // Replace oldest or cap at 3
        return [...prev.slice(1), propertyId];
      }
      return [...prev, propertyId];
    });
  };

  const isCompared = (propertyId) => compareIds.includes(propertyId);

  const clearCompare = () => setCompareIds([]);

  return {
    savedIds,
    toggleSave,
    isSaved,
    savedCount: savedIds.length,
    compareIds,
    toggleCompare,
    isCompared,
    clearCompare
  };
}
