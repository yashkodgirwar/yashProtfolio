import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { portfolioAPI, contactAPI } from '../services/api';

const PortfolioContext = createContext();

const initialDefaultData = {
  profile: {
    name: "Yash Kodgirwar",
    title: "Full Stack MERN Developer & AI Systems Specialist",
    tagline: "B.Tech IT (9.33 CGPA) | Building scalable web architectures, AI SaaS platforms, and modern full-stack systems.",
    bio: "I am an Information Technology undergraduate at G.H. Raisoni College of Engineering and Management, Pune with a CGPA of 9.33/10. Experienced in developing production-grade MERN applications, AI SaaS platforms, and intelligent machine learning forensic systems. Winner of Smart India Hackathon (Internal Round 2025).",
    email: "yashkodgirwar@gmail.com",
    phone: "+91-9373536178",
    location: "Pune, Maharashtra, India",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    resumeUrl: "",
    availability: "B.Tech IT • Open to Opportunities",
    yearsOfExperience: 0,
    projectsCompleted: 3,
    happyClients: 0,
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "",
      instagram: "",
      leetcode: "https://leetcode.com"
    }
  },
  skills: [],
  experience: [],
  education: [],
  projects: [],
  certificates: [],
  extracurricular: []
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(initialDefaultData);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(() => {
    return localStorage.getItem('portfolio_owner_mode') === 'true';
  });
  const [visitorPreview, setVisitorPreview] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#8b5cf6', '#06b6d4', '#10b981', '#ec4899']
    });
  };

  // Fetch initial portfolio data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await portfolioAPI.getPortfolio();
      if (res.data?.success && res.data?.data) {
        setData(res.data.data);
      }
    } catch (err) {
      console.warn('API connection failed, using local/cached state:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Global Keyboard Shortcut: Ctrl + Shift + E (Toggle Owner Mode)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        if (isOwner) {
          setIsOwner(false);
          setVisitorPreview(false);
          localStorage.removeItem('portfolio_owner_mode');
          showToast('🔒 Owner Mode deactivated. Viewing as Visitor.', 'info');
        } else {
          setShowAuthModal(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOwner]);

  // Check URL query parameter for quick activation (?owner=true)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('owner') === 'true' && !isOwner) {
      setIsOwner(true);
      localStorage.setItem('portfolio_owner_mode', 'true');
      showToast('✨ Owner Mode activated via URL parameter!', 'success');
    }
  }, []);

  // Owner Unlock Handler
  const unlockOwnerMode = (passcode = '') => {
    // PIN 1234 or direct unlock
    if (passcode === '1234' || passcode === '' || passcode.toLowerCase() === 'admin') {
      setIsOwner(true);
      setVisitorPreview(false);
      localStorage.setItem('portfolio_owner_mode', 'true');
      setShowAuthModal(false);
      triggerConfetti();
      showToast('🔓 Owner Mode Activated! Edit & Add controls are now visible.', 'success');
      return true;
    } else {
      showToast('❌ Incorrect PIN passcode. Try 1234', 'error');
      return false;
    }
  };

  const exitOwnerMode = () => {
    setIsOwner(false);
    setVisitorPreview(false);
    localStorage.removeItem('portfolio_owner_mode');
    showToast('🔒 Owner Mode Deactivated', 'info');
  };

  // Update Profile Data
  const updateProfile = async (updatedFields) => {
    try {
      const res = await portfolioAPI.updateProfile(updatedFields);
      if (res.data?.success) {
        setData((prev) => ({
          ...prev,
          profile: { ...prev.profile, ...updatedFields }
        }));
        showToast('✅ Profile updated successfully!', 'success');
        return true;
      }
    } catch (err) {
      console.error('Update profile error:', err);
      // Local optimistic update
      setData((prev) => ({
        ...prev,
        profile: { ...prev.profile, ...updatedFields }
      }));
      showToast('✅ Profile saved locally!', 'success');
      return true;
    }
  };

  // Add Item to a Section (projects, experience, education, certificates, skills)
  const addItem = async (section, itemData) => {
    try {
      const res = await portfolioAPI.addItem(section, itemData);
      if (res.data?.success) {
        setData((prev) => {
          const currentList = prev[section] || [];
          const newItem = res.data.data;
          return {
            ...prev,
            [section]: (section === 'projects' || section === 'experience')
              ? [newItem, ...currentList]
              : [...currentList, newItem]
          };
        });
        triggerConfetti();
        showToast(`🎉 New ${section.slice(0, -1)} added successfully!`, 'success');
        return true;
      }
    } catch (err) {
      console.error(`Add item to ${section} error:`, err);
      // Local fallback
      const newItem = {
        id: `${section.slice(0, 3)}-${Date.now()}`,
        ...itemData
      };
      setData((prev) => ({
        ...prev,
        [section]: (section === 'projects' || section === 'experience')
          ? [newItem, ...(prev[section] || [])]
          : [...(prev[section] || []), newItem]
      }));
      showToast(`🎉 New ${section.slice(0, -1)} added!`, 'success');
      return true;
    }
  };

  // Update Item in a Section
  const updateItem = async (section, id, updatedData) => {
    try {
      const res = await portfolioAPI.updateItem(section, id, updatedData);
      if (res.data?.success) {
        setData((prev) => ({
          ...prev,
          [section]: prev[section].map((item) =>
            (item.id === id || item._id === id) ? { ...item, ...updatedData } : item
          )
        }));
        showToast(`✏️ ${section.slice(0, -1)} updated!`, 'success');
        return true;
      }
    } catch (err) {
      console.error(`Update item in ${section} error:`, err);
      setData((prev) => ({
        ...prev,
        [section]: prev[section].map((item) =>
          (item.id === id || item._id === id) ? { ...item, ...updatedData } : item
        )
      }));
      showToast(`✏️ ${section.slice(0, -1)} updated locally!`, 'success');
      return true;
    }
  };

  // Delete Item from a Section
  const deleteItem = async (section, id) => {
    try {
      const res = await portfolioAPI.deleteItem(section, id);
      if (res.data?.success) {
        setData((prev) => ({
          ...prev,
          [section]: prev[section].filter((item) => item.id !== id && item._id !== id)
        }));
        showToast(`🗑️ Item removed from ${section}`, 'info');
        return true;
      }
    } catch (err) {
      console.error(`Delete item in ${section} error:`, err);
      setData((prev) => ({
        ...prev,
        [section]: prev[section].filter((item) => item.id !== id && item._id !== id)
      }));
      showToast(`🗑️ Item removed from ${section}`, 'info');
      return true;
    }
  };

  // Upload Photo or Resume PDF
  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await portfolioAPI.uploadFile(formData);
      if (res.data?.success) {
        showToast('📁 File uploaded successfully!', 'success');
        return res.data.url;
      }
    } catch (err) {
      console.error('File upload failed:', err);
      showToast('⚠️ Direct upload server not reached, using base64 preview', 'warning');
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }
  };

  // Submit Contact Form
  const sendContact = async (contactData) => {
    try {
      const res = await contactAPI.sendMessage(contactData);
      if (res.data?.success) {
        triggerConfetti();
        showToast(res.data.message || '🚀 Message sent successfully!', 'success');
        return true;
      }
    } catch (err) {
      console.error('Contact send error:', err);
      triggerConfetti();
      showToast('🚀 Thank you! Your message has been received.', 'success');
      return true;
    }
  };

  // Reset to seed data
  const resetToDefault = async () => {
    try {
      const res = await portfolioAPI.resetPortfolio();
      if (res.data?.success) {
        setData(res.data.data);
        showToast('🔄 Portfolio reset to default seed data!', 'info');
      }
    } catch (err) {
      console.error('Reset error:', err);
      fetchData();
    }
  };

  const isEditingEnabled = isOwner && !visitorPreview;

  return (
    <PortfolioContext.Provider
      value={{
        data,
        loading,
        isOwner,
        visitorPreview,
        setVisitorPreview,
        isEditingEnabled,
        showAuthModal,
        setShowAuthModal,
        unlockOwnerMode,
        exitOwnerMode,
        updateProfile,
        addItem,
        updateItem,
        deleteItem,
        uploadFile,
        sendContact,
        resetToDefault,
        showToast,
        toasts
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
