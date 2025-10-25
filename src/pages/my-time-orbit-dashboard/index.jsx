import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CosmicBreadcrumb from '../../components/ui/CosmicBreadcrumb';
import FloatingActionHub from '../../components/ui/FloatingActionHub';
import OrbitalNavigator from '../../components/ui/OrbitalNavigator';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import page components
import OrbitalScene from './components/OrbitalScene';
import StatisticsPanel from './components/StatisticsPanel';
import QuickActions from './components/QuickActions';
import FilterControls from './components/FilterControls';

const MyTimeOrbitDashboard = () => {
  const navigate = useNavigate();
  const [capsules, setCapsules] = useState([]);
  const [filteredCapsules, setFilteredCapsules] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    timeRange: 'all',
    category: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(50);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [viewMode, setViewMode] = useState('orbital'); // orbital, list, grid
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Mock capsule data
  useEffect(() => {
    const mockCapsules = [
      {
        id: 'cap_001',
        title: "My 25th Birthday Memories",
        description: "A collection of photos and thoughts from my quarter-life celebration with friends and family.",
        status: 'unlocked',
        category: 'personal',
        unlockDate: '2024-03-15T00:00:00Z',
        createdAt: '2023-03-15T10:30:00Z',
        unlockedAt: '2024-03-15T00:00:00Z',
        blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
        content: {
          type: 'mixed',
          items: ['text', 'images', 'video']
        }
      },
      {
        id: 'cap_002',
        title: "Career Goals for 2025",
        description: "My aspirations and action plan for professional growth in the coming year.",
        status: 'unlocking',
        category: 'goals',
        unlockDate: '2025-01-01T00:00:00Z',
        createdAt: '2024-01-01T15:45:00Z',
        blockchainHash: '0x2b3c4d5e6f7890ab1234567890abcdef12345678',
        content: {
          type: 'text',
          items: ['text']
        }
      },
      {
        id: 'cap_003',
        title: "Wedding Day Emotions",
        description: "Raw thoughts and feelings from the most important day of my life.",
        status: 'locked',
        category: 'family',
        unlockDate: '2025-06-20T00:00:00Z',
        createdAt: '2024-06-20T18:20:00Z',
        blockchainHash: '0x3c4d5e6f7890ab12567890abcdef123456789012',
        content: {
          type: 'mixed',
          items: ['text', 'images', 'audio']
        }
      },
      {
        id: 'cap_004',
        title: "Graduation Achievement",
        description: "Celebrating the completion of my master\'s degree and future plans.",
        status: 'unlocked',
        category: 'achievements',
        unlockDate: '2024-05-15T00:00:00Z',
        createdAt: '2023-05-15T12:00:00Z',
        unlockedAt: '2024-05-15T00:00:00Z',
        blockchainHash: '0x4d5e6f7890ab1234890abcdef1234567890123456',
        content: {
          type: 'mixed',
          items: ['text', 'images', 'documents']
        }
      },
      {
        id: 'cap_005',
        title: "Letter to Future Self",
        description: "Personal reflections and advice for myself in 5 years.",
        status: 'locked',
        category: 'letters',
        unlockDate: '2029-10-25T00:00:00Z',
        createdAt: '2024-10-25T09:15:00Z',
        blockchainHash: '0x5e6f7890ab123456abcdef123456789012345678',
        content: {
          type: 'text',
          items: ['text']
        }
      },
      {
        id: 'cap_006',
        title: "Family Vacation Memories",
        description: "Photos and videos from our amazing trip to Japan with the whole family.",
        status: 'unlocked',
        category: 'family',
        unlockDate: '2024-08-10T00:00:00Z',
        createdAt: '2023-08-10T16:30:00Z',
        unlockedAt: '2024-08-10T00:00:00Z',
        blockchainHash: '0x6f7890ab12345678def123456789012345678901',
        content: {
          type: 'mixed',
          items: ['images', 'video', 'text']
        }
      }
    ];

    setCapsules(mockCapsules);
    setFilteredCapsules(mockCapsules);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...capsules];

    // Apply status filter
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(capsule => capsule?.status === filters?.status);
    }

    // Apply time range filter
    if (filters?.timeRange !== 'all') {
      const now = new Date();
      filtered = filtered?.filter(capsule => {
        const unlockDate = new Date(capsule.unlockDate);
        
        switch (filters?.timeRange) {
          case 'week':
            return unlockDate <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          case 'month':
            return unlockDate <= new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
          case 'quarter':
            return unlockDate <= new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
          case 'year':
            return unlockDate <= new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
          case 'future':
            return unlockDate > now;
          case 'past':
            return unlockDate <= now;
          default:
            return true;
        }
      });
    }

    // Apply category filter
    if (filters?.category !== 'all') {
      filtered = filtered?.filter(capsule => capsule?.category === filters?.category);
    }

    // Apply search query
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(capsule =>
        capsule?.title?.toLowerCase()?.includes(query) ||
        capsule?.description?.toLowerCase()?.includes(query)
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[filters?.sortBy];
      let bValue = b?.[filters?.sortBy];

      if (filters?.sortBy === 'title') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      } else if (filters?.sortBy?.includes('Date') || filters?.sortBy?.includes('At')) {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (filters?.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredCapsules(filtered);
  }, [capsules, filters, searchQuery]);

  const handleCapsuleClick = (capsule) => {
    navigate(`/capsule-orbital-view?id=${capsule?.id}`);
  };

  const handleCapsuleHover = (capsule) => {
    setSelectedCapsule(capsule);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleZoomChange = (level) => {
    setZoomLevel(level);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const recentUnlockedCapsules = capsules?.filter(c => c?.status === 'unlocked')?.slice(0, 3);

  const capsuleStats = {
    total: capsules?.length,
    active: capsules?.filter(c => c?.status === 'unlocked')?.length,
    locked: capsules?.filter(c => c?.status === 'locked')?.length,
    unlocking: capsules?.filter(c => c?.status === 'unlocking')?.length
  };

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Navigation Components */}
      <CosmicBreadcrumb />
      <FloatingActionHub />
      <OrbitalNavigator 
        onZoomChange={handleZoomChange}
        onFilterChange={handleFilterChange}
        capsuleStats={capsuleStats}
      />
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-heading text-primary glow-primary mb-4">
            My Time Orbit
          </h1>
          <p className="text-lg text-text-secondary font-caption max-w-2xl mx-auto">
            Navigate through your cosmic vault of memories, where each capsule orbits through time, 
            waiting for its destined moment to unlock and reveal the treasures within.
          </p>
        </motion.div>

        {/* View Mode Toggle and Stats Toggle */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          {/* View Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glassmorphic p-2 rounded-xl border border-primary/30">
              <div className="flex space-x-2">
                {[
                  { mode: 'orbital', label: 'Orbital View', icon: 'Globe' },
                  { mode: 'grid', label: 'Grid View', icon: 'Grid3x3' },
                  { mode: 'list', label: 'List View', icon: 'List' }
                ]?.map((view) => (
                  <Button
                    key={view?.mode}
                    variant={viewMode === view?.mode ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode(view?.mode)}
                    className={`cosmic-transition ${
                      viewMode === view?.mode ? 'glow-primary' : 'hover-glow-primary'
                    }`}
                    iconName={view?.icon}
                    iconPosition="left"
                    iconSize={16}
                  >
                    {view?.label}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar Toggle Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSidebar}
              className="glassmorphic hover-glow-secondary cosmic-transition"
              iconName={sidebarVisible ? 'PanelLeftClose' : 'PanelLeftOpen'}
              iconPosition="left"
              iconSize={16}
            >
              {sidebarVisible ? 'Hide Stats' : 'Show Stats'}
            </Button>
          </motion.div>
        </div>

        {/* Main Dashboard Layout */}
        <div className={`grid grid-cols-1 gap-4 ${sidebarVisible ? 'lg:grid-cols-12' : ''}`}>
          {/* Left Sidebar - Statistics & Quick Actions */}
          <AnimatePresence>
            {sidebarVisible && (
              <motion.div
                className="lg:col-span-3 xl:col-span-2 space-y-4"
                initial={{ opacity: 0, x: -300, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 'auto' }}
                exit={{ opacity: 0, x: -300, width: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <StatisticsPanel capsules={capsules} />
                <QuickActions 
                  recentCapsules={recentUnlockedCapsules}
                  onCreateCapsule={() => navigate('/memory-forge-creation')}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content Area */}
          <motion.div
            className={`space-y-6 ${sidebarVisible ? 'lg:col-span-9 xl:col-span-10' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            layout
          >
            {/* Filter Controls */}
            <FilterControls
              onFilterChange={handleFilterChange}
              onSearchChange={handleSearchChange}
              filters={filters}
            />

            {/* Orbital Scene */}
            {viewMode === 'orbital' && (
              <div className="glassmorphic rounded-2xl border border-primary/30 overflow-hidden">
                <div className="h-96 md:h-[600px] lg:h-[700px]">
                  <OrbitalScene
                    capsules={filteredCapsules}
                    onCapsuleClick={handleCapsuleClick}
                    onCapsuleHover={handleCapsuleHover}
                    zoomLevel={zoomLevel}
                    filters={filters}
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCapsules?.map((capsule, index) => (
                  <motion.div
                    key={capsule?.id}
                    className={`glassmorphic p-6 rounded-xl border cursor-pointer cosmic-transition ${
                      capsule?.status === 'unlocked' ?'border-success/30 glow-success hover-glow-success' 
                        : capsule?.status === 'unlocking' ?'border-warning/30 glow-warning hover-glow-warning' :'border-error/30 glow-error hover-glow-error'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleCapsuleClick(capsule)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-heading text-text-primary mb-2">
                            {capsule?.title}
                          </h3>
                          <p className="text-sm text-text-secondary font-caption line-clamp-2">
                            {capsule?.description}
                          </p>
                        </div>
                        <div className={`p-2 rounded-full ${
                          capsule?.status === 'unlocked' ? 'bg-success/20' :
                          capsule?.status === 'unlocking' ? 'bg-warning/20' : 'bg-error/20'
                        }`}>
                          <Icon 
                            name={
                              capsule?.status === 'unlocked' ? 'Unlock' :
                              capsule?.status === 'unlocking' ? 'Timer' : 'Lock'
                            } 
                            size={20} 
                            className={
                              capsule?.status === 'unlocked' ? 'text-success' :
                              capsule?.status === 'unlocking' ? 'text-warning' : 'text-error'
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Status:</span>
                          <span className={`font-medium ${
                            capsule?.status === 'unlocked' ? 'text-success' :
                            capsule?.status === 'unlocking' ? 'text-warning' : 'text-error'
                          }`}>
                            {capsule?.status === 'unlocked' ? 'Unlocked' :
                             capsule?.status === 'unlocking' ? 'Soon' : 'Locked'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Unlock:</span>
                          <span className="text-text-primary font-mono">
                            {new Date(capsule.unlockDate)?.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Category:</span>
                          <span className="text-primary capitalize">
                            {capsule?.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="glassmorphic rounded-xl border border-primary/30 overflow-hidden">
                <div className="divide-y divide-border">
                  {filteredCapsules?.map((capsule, index) => (
                    <motion.div
                      key={capsule?.id}
                      className="p-6 hover:bg-surface/50 cursor-pointer cosmic-transition"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleCapsuleClick(capsule)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-full ${
                          capsule?.status === 'unlocked' ? 'bg-success/20 glow-success' :
                          capsule?.status === 'unlocking' ? 'bg-warning/20 glow-warning' : 'bg-error/20 glow-error'
                        }`}>
                          <Icon 
                            name={
                              capsule?.status === 'unlocked' ? 'Unlock' :
                              capsule?.status === 'unlocking' ? 'Timer' : 'Lock'
                            } 
                            size={20} 
                            className={
                              capsule?.status === 'unlocked' ? 'text-success' :
                              capsule?.status === 'unlocking' ? 'text-warning' : 'text-error'
                            }
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-heading text-text-primary mb-1">
                            {capsule?.title}
                          </h3>
                          <p className="text-sm text-text-secondary font-caption truncate">
                            {capsule?.description}
                          </p>
                        </div>

                        <div className="text-right space-y-1">
                          <div className={`text-sm font-medium ${
                            capsule?.status === 'unlocked' ? 'text-success' :
                            capsule?.status === 'unlocking' ? 'text-warning' : 'text-error'
                          }`}>
                            {capsule?.status === 'unlocked' ? 'Unlocked' :
                             capsule?.status === 'unlocking' ? 'Soon' : 'Locked'}
                          </div>
                          <div className="text-xs text-text-secondary font-mono">
                            {new Date(capsule.unlockDate)?.toLocaleDateString()}
                          </div>
                        </div>

                        <Icon name="ChevronRight" size={20} className="text-text-secondary" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredCapsules?.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="space-y-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Icon name="Search" size={64} className="text-text-secondary opacity-50 mx-auto" />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-heading text-text-primary">
                      No Capsules Found
                    </h3>
                    <p className="text-text-secondary font-caption max-w-md mx-auto">
                      {searchQuery ? 
                        `No capsules match your search for "${searchQuery}". Try adjusting your filters or search terms.` :
                        'No capsules match your current filters. Try adjusting your filter settings or create your first capsule.'
                      }
                    </p>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFilters({
                          status: 'all',
                          timeRange: 'all',
                          category: 'all',
                          sortBy: 'createdAt',
                          sortOrder: 'desc'
                        });
                        setSearchQuery('');
                      }}
                      className="hover-glow-secondary cosmic-transition"
                      iconName="RotateCcw"
                      iconPosition="left"
                    >
                      Reset Filters
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => navigate('/memory-forge-creation')}
                      className="glow-primary hover-glow-primary cosmic-transition"
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Create Capsule
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MyTimeOrbitDashboard;