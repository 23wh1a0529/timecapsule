import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Select from './Select';
import { Checkbox } from './Checkbox';

const OrbitalNavigator = ({ 
  className = '',
  onZoomChange = () => {},
  onFilterChange = () => {},
  onCapsuleSelect = () => {},
  capsuleStats = { total: 0, active: 0, locked: 0 }
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(50);
  const [filters, setFilters] = useState({
    status: 'all',
    timeRange: 'all',
    category: 'all'
  });
  const [viewOptions, setViewOptions] = useState({
    showOrbits: true,
    showLabels: true,
    showConnections: false,
    enablePhysics: true
  });

  const statusOptions = [
    { value: 'all', label: 'All Capsules' },
    { value: 'active', label: 'Active' },
    { value: 'locked', label: 'Time Locked' },
    { value: 'unlocking', label: 'Unlocking Soon' }
  ];

  const timeRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
    { value: 'future', label: 'Future Unlocks' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'personal', label: 'Personal' },
    { value: 'family', label: 'Family' },
    { value: 'goals', label: 'Goals' },
    { value: 'memories', label: 'Memories' }
  ];

  const handleZoomChange = (value) => {
    setZoomLevel(value);
    onZoomChange(value);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleViewOptionChange = (key, checked) => {
    const newOptions = { ...viewOptions, [key]: checked };
    setViewOptions(newOptions);
  };

  return (
    <div className={`fixed left-6 top-1/2 transform -translate-y-1/2 z-100 ${className}`}>
      {/* Mobile: Bottom Drawer */}
      <div className="md:hidden">
        {isExpanded && (
          <div className="fixed bottom-0 left-0 right-0 glassmorphic rounded-t-3xl border-t border-border p-6 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-heading text-primary glow-primary">
                Orbital Controls
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(false)}
                className="hover-glow-primary"
              >
                <Icon name="ChevronDown" size={20} />
              </Button>
            </div>
            
            {/* Mobile Content */}
            <div className="space-y-4">
              {/* Zoom Control */}
              <div>
                <label className="text-sm font-caption text-text-secondary mb-2 block">
                  Orbital Zoom
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={zoomLevel}
                  onChange={(e) => handleZoomChange(parseInt(e?.target?.value))}
                  className="w-full accent-primary"
                />
              </div>

              {/* Quick Filters */}
              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Status"
                  options={statusOptions}
                  value={filters?.status}
                  onChange={(value) => handleFilterChange('status', value)}
                />
                <Select
                  label="Time"
                  options={timeRangeOptions}
                  value={filters?.timeRange}
                  onChange={(value) => handleFilterChange('timeRange', value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Toggle */}
        <Button
          variant="default"
          onClick={() => setIsExpanded(!isExpanded)}
          className="fixed bottom-20 left-6 glassmorphic glow-primary hover-glow-primary"
        >
          <Icon name="Navigation" size={20} className="mr-2" />
          Controls
        </Button>
      </div>
      {/* Desktop: Side Panel */}
      <div className="hidden md:block">
        <div className={`glassmorphic transition-all duration-300 ${
          isExpanded ? 'w-80' : 'w-16'
        }`}>
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            {isExpanded && (
              <h3 className="text-lg font-heading text-primary glow-primary">
                Orbital Navigator
              </h3>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="hover-glow-primary"
            >
              <Icon name={isExpanded ? 'ChevronLeft' : 'ChevronRight'} size={20} />
            </Button>
          </div>

          {isExpanded && (
            <div className="p-4 space-y-6">
              {/* Capsule Statistics */}
              <div className="space-y-3">
                <h4 className="text-sm font-heading text-text-primary">Cosmic Statistics</h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="glassmorphic p-3 rounded-lg">
                    <div className="text-lg font-mono text-primary glow-primary">
                      {capsuleStats?.total}
                    </div>
                    <div className="text-xs text-text-secondary">Total</div>
                  </div>
                  <div className="glassmorphic p-3 rounded-lg">
                    <div className="text-lg font-mono text-success glow-success">
                      {capsuleStats?.active}
                    </div>
                    <div className="text-xs text-text-secondary">Active</div>
                  </div>
                  <div className="glassmorphic p-3 rounded-lg">
                    <div className="text-lg font-mono text-warning glow-warning">
                      {capsuleStats?.locked}
                    </div>
                    <div className="text-xs text-text-secondary">Locked</div>
                  </div>
                </div>
              </div>

              {/* Zoom Control */}
              <div className="space-y-3">
                <h4 className="text-sm font-heading text-text-primary">Orbital Zoom</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={zoomLevel}
                    onChange={(e) => handleZoomChange(parseInt(e?.target?.value))}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-text-secondary">
                    <span>Close</span>
                    <span className="text-primary">{zoomLevel}%</span>
                    <span>Far</span>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="space-y-4">
                <h4 className="text-sm font-heading text-text-primary">Orbital Filters</h4>
                
                <Select
                  label="Status Filter"
                  options={statusOptions}
                  value={filters?.status}
                  onChange={(value) => handleFilterChange('status', value)}
                />

                <Select
                  label="Time Range"
                  options={timeRangeOptions}
                  value={filters?.timeRange}
                  onChange={(value) => handleFilterChange('timeRange', value)}
                />

                <Select
                  label="Category"
                  options={categoryOptions}
                  value={filters?.category}
                  onChange={(value) => handleFilterChange('category', value)}
                />
              </div>

              {/* View Options */}
              <div className="space-y-3">
                <h4 className="text-sm font-heading text-text-primary">View Options</h4>
                <div className="space-y-2">
                  <Checkbox
                    label="Show Orbital Paths"
                    checked={viewOptions?.showOrbits}
                    onChange={(e) => handleViewOptionChange('showOrbits', e?.target?.checked)}
                  />
                  <Checkbox
                    label="Show Labels"
                    checked={viewOptions?.showLabels}
                    onChange={(e) => handleViewOptionChange('showLabels', e?.target?.checked)}
                  />
                  <Checkbox
                    label="Show Connections"
                    checked={viewOptions?.showConnections}
                    onChange={(e) => handleViewOptionChange('showConnections', e?.target?.checked)}
                  />
                  <Checkbox
                    label="Enable Physics"
                    checked={viewOptions?.enablePhysics}
                    onChange={(e) => handleViewOptionChange('enablePhysics', e?.target?.checked)}
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <h4 className="text-sm font-heading text-text-primary">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => console.log('Reset view')}
                    className="hover-glow-primary"
                  >
                    <Icon name="RotateCcw" size={16} className="mr-1" />
                    Reset
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => console.log('Center view')}
                    className="hover-glow-secondary"
                  >
                    <Icon name="Target" size={16} className="mr-1" />
                    Center
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrbitalNavigator;