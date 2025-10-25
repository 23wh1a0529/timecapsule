import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CosmicBreadcrumb from '../../components/ui/CosmicBreadcrumb';
import FloatingActionHub from '../../components/ui/FloatingActionHub';
import CapsuleViewer3D from './components/CapsuleViewer3D';
import CapsuleMetadata from './components/CapsuleMetadata';
import OrbitalControls from './components/OrbitalControls';
import CosmicParticles from './components/CosmicParticles';

const CapsuleOrbitalView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentCapsuleIndex, setCurrentCapsuleIndex] = useState(0);
  const [viewMode, setViewMode] = useState('orbital');
  const [isLoading, setIsLoading] = useState(true);

  // Mock capsule data
  const capsules = [
  {
    id: 'cap_001',
    title: "My 25th Birthday Memories",
    description: "A collection of photos and videos from my birthday celebration with family and friends.",
    status: 'unlocked',
    createdAt: '2024-01-15T10:30:00Z',
    unlockDate: '2024-10-15T10:30:00Z',
    blockchainHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    transactionId: 'txn_kc_001_2024_birthday_memories',
    contentPreviews: [
    {
      type: 'image',
      name: 'birthday_cake.jpg',
      thumbnail: "https://images.unsplash.com/photo-1669315603260-242695f9a7aa",
      alt: 'Colorful birthday cake with lit candles on wooden table surrounded by party decorations'
    },
    {
      type: 'video',
      name: 'birthday_wishes.mp4',
      thumbnail: "https://images.unsplash.com/photo-1733119673369-40d43eaee939",
      alt: 'Group of friends singing happy birthday around dining table with birthday cake'
    },
    {
      type: 'text',
      name: 'birthday_letter.txt',
      thumbnail: null,
      alt: 'Text document containing birthday wishes and memories'
    }]

  },
  {
    id: 'cap_002',
    title: "New Year Resolutions 2025",
    description: "My goals and aspirations for the upcoming year, to be opened on New Year's Eve 2025.",
    status: 'locked',
    createdAt: '2024-12-31T23:59:00Z',
    unlockDate: '2025-12-31T23:59:00Z',
    blockchainHash: '0x8a3bfde2d1e68b8af77bc5fbe8a3bfde2d1e68b8af77bc5fbe8d3d3fc8c22b92496',
    transactionId: 'txn_kc_002_2025_resolutions_goals',
    contentPreviews: null
  },
  {
    id: 'cap_003',
    title: "Graduation Day Celebration",
    description: "Photos and memories from my university graduation ceremony and celebration party.",
    status: 'unlocking',
    createdAt: '2024-05-20T14:00:00Z',
    unlockDate: '2025-05-20T14:00:00Z',
    blockchainHash: '0x9b4cgef3e2f79c9bg88cd6gce9b4cgef3e2f79c9bg88cd6gce9e4e4gd9d33ca3507',
    transactionId: 'txn_kc_003_2024_graduation_memories',
    contentPreviews: null
  }];


  const currentCapsule = capsules?.[currentCapsuleIndex];

  useEffect(() => {
    // Get capsule ID from URL params
    const capsuleId = searchParams?.get('id');
    if (capsuleId) {
      const index = capsules?.findIndex((cap) => cap?.id === capsuleId);
      if (index !== -1) {
        setCurrentCapsuleIndex(index);
      }
    }

    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleNavigation = (action) => {
    if (typeof action === 'string') {
      if (action === 'prev' && currentCapsuleIndex > 0) {
        setCurrentCapsuleIndex(currentCapsuleIndex - 1);
      } else if (action === 'next' && currentCapsuleIndex < capsules?.length - 1) {
        setCurrentCapsuleIndex(currentCapsuleIndex + 1);
      } else {
        navigate(action);
      }
    } else {
      navigate(action);
    }
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleCapsuleRotate = (rotation) => {
    console.log('Capsule rotated:', rotation);
  };

  const handleCapsuleZoom = (zoom) => {
    console.log('Capsule zoom:', zoom);
  };

  const handleEditCapsule = () => {
    navigate(`/memory-forge-creation?edit=${currentCapsule?.id}`);
  };

  const handleDownloadCapsule = () => {
    console.log('Downloading capsule:', currentCapsule?.id);
    // Simulate download
    alert('Capsule content downloaded successfully!');
  };

  const handleShareCapsule = () => {
    console.log('Sharing capsule:', currentCapsule?.id);
    // Simulate sharing
    if (navigator.share) {
      navigator.share({
        title: currentCapsule?.title,
        text: currentCapsule?.description,
        url: window.location?.href
      });
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard?.writeText(window.location?.href);
      alert('Capsule link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <motion.div
          className="glassmorphic p-8 rounded-2xl text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-4">

            <Icon name="Loader" size={48} className="text-primary glow-primary mx-auto" />
          </motion.div>
          <h2 className="text-xl font-heading text-primary glow-primary mb-2">
            Initializing Orbital View
          </h2>
          <p className="text-text-secondary font-caption">
            Calibrating cosmic coordinates...
          </p>
        </motion.div>
      </div>);

  }

  return (
    <div className="min-h-screen cosmic-bg relative overflow-hidden">
      {/* Cosmic Particles Background */}
      <CosmicParticles density={30} speed={0.5} color="#00FFFF" />
      {/* Navigation Components */}
      <CosmicBreadcrumb />
      <FloatingActionHub />
      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-screen">
        {/* Left Sidebar - Orbital Controls (Desktop) */}
        <div className="hidden lg:block lg:col-span-1">
          <OrbitalControls
            onNavigate={handleNavigation}
            onViewChange={handleViewModeChange}
            currentCapsule={currentCapsuleIndex + 1}
            totalCapsules={capsules?.length} />

        </div>

        {/* Center - 3D Capsule Viewer */}
        <div className="lg:col-span-2">
          <motion.div
            className="glassmorphic rounded-2xl overflow-hidden h-96 lg:h-[600px] relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>

            {/* Header */}
            <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
              <div className="glassmorphic px-4 py-2 rounded-lg">
                <h1 className="text-lg font-heading text-primary glow-primary">
                  Capsule Orbital View
                </h1>
              </div>
              
              {/* Mobile Navigation */}
              <div className="lg:hidden flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleNavigation('prev')}
                  disabled={currentCapsuleIndex <= 0}
                  className="glassmorphic hover-glow-primary"
                  aria-label="Previous capsule">

                  <Icon name="ChevronLeft" size={20} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleNavigation('next')}
                  disabled={currentCapsuleIndex >= capsules?.length - 1}
                  className="glassmorphic hover-glow-primary"
                  aria-label="Next capsule">

                  <Icon name="ChevronRight" size={20} />
                </Button>
              </div>
            </div>

            {/* 3D Viewer */}
            <CapsuleViewer3D
              capsule={currentCapsule}
              onRotate={handleCapsuleRotate}
              onZoom={handleCapsuleZoom}
              className="w-full h-full" />


            {/* Mobile Capsule Counter */}
            <div className="lg:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="glassmorphic px-4 py-2 rounded-lg">
                <span className="text-sm font-mono text-primary">
                  {currentCapsuleIndex + 1} / {capsules?.length}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Mobile Quick Actions */}
          <div className="lg:hidden mt-4 flex justify-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/my-time-orbit-dashboard')}
              iconName="Home"
              iconPosition="left"
              className="hover-glow-secondary">

              Dashboard
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/memory-forge-creation')}
              iconName="Plus"
              iconPosition="left"
              className="hover-glow-accent">

              Create New
            </Button>
          </div>
        </div>

        {/* Right Sidebar - Capsule Metadata */}
        <div className="lg:col-span-1">
          <CapsuleMetadata
            capsule={currentCapsule}
            onEdit={handleEditCapsule}
            onDownload={handleDownloadCapsule}
            onShare={handleShareCapsule}
            className="h-fit max-h-[600px] overflow-y-auto" />

        </div>
      </div>
      {/* Mobile Controls (Hidden on Desktop) */}
      <OrbitalControls
        onNavigate={handleNavigation}
        onViewChange={handleViewModeChange}
        currentCapsule={currentCapsuleIndex + 1}
        totalCapsules={capsules?.length}
        className="lg:hidden" />

      {/* Ambient Audio Controls */}
      <div className="fixed top-6 right-6 z-100 hidden md:flex space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="glassmorphic hover-glow-primary"
          aria-label="Toggle ambient sounds">

          <Icon name="Volume2" size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="glassmorphic hover-glow-secondary"
          aria-label="Toggle cosmic music">

          <Icon name="Music" size={20} />
        </Button>
      </div>
    </div>);

};

export default CapsuleOrbitalView;