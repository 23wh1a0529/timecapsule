import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ 
  onFilterChange = () => {},
  onSortChange = () => {},
  onSearchChange = () => {},
  filters = {},
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [localFilters, setLocalFilters] = useState({
    status: 'all',
    timeRange: 'all',
    category: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    ...filters
  });

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'unlocked', label: 'Unlocked' },
    { value: 'locked', label: 'Time Locked' },
    { value: 'unlocking', label: 'Unlocking Soon' }
  ];

  const timeRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'future', label: 'Future Unlocks' },
    { value: 'past', label: 'Past Unlocks' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'personal', label: 'Personal' },
    { value: 'family', label: 'Family' },
    { value: 'goals', label: 'Goals & Dreams' },
    { value: 'memories', label: 'Memories' },
    { value: 'achievements', label: 'Achievements' },
    { value: 'letters', label: 'Letters to Future' }
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Creation Date' },
    { value: 'unlockDate', label: 'Unlock Date' },
    { value: 'title', label: 'Title (A-Z)' },
    { value: 'status', label: 'Status' },
    { value: 'category', label: 'Category' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    onSearchChange(value);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      status: 'all',
      timeRange: 'all',
      category: 'all',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    };
    setLocalFilters(resetFilters);
    setSearchQuery('');
    onFilterChange(resetFilters);
    onSearchChange('');
  };

  const hasActiveFilters = () => {
    return localFilters?.status !== 'all' || 
           localFilters?.timeRange !== 'all' || 
           localFilters?.category !== 'all' ||
           searchQuery?.length > 0;
  };

  return (
    <div className={`glassmorphic rounded-xl border border-primary/30 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary glow-primary" />
          <h3 className="text-lg font-heading text-primary glow-primary">
            Orbital Filters
          </h3>
          {hasActiveFilters() && (
            <div className="px-2 py-1 rounded-full bg-primary/20 text-xs text-primary glow-primary">
              Active
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {hasActiveFilters() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="hover-glow-error cosmic-transition"
              iconName="X"
              iconSize={16}
            >
              Clear
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover-glow-primary cosmic-transition"
          >
            <Icon 
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
              size={20} 
            />
          </Button>
        </div>
      </div>
      {/* Search Bar - Always Visible */}
      <div className="p-4 border-b border-border">
        <Input
          type="search"
          placeholder="Search capsules by title, description, or content..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Expandable Filters */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="p-4 space-y-6">
          {/* Primary Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Status Filter"
              options={statusOptions}
              value={localFilters?.status}
              onChange={(value) => handleFilterChange('status', value)}
            />
            
            <Select
              label="Time Range"
              options={timeRangeOptions}
              value={localFilters?.timeRange}
              onChange={(value) => handleFilterChange('timeRange', value)}
            />
            
            <Select
              label="Category"
              options={categoryOptions}
              value={localFilters?.category}
              onChange={(value) => handleFilterChange('category', value)}
            />
          </div>

          {/* Sorting Controls */}
          <div className="space-y-4">
            <h4 className="text-sm font-heading text-text-primary">
              Sort & Order
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Sort By"
                options={sortOptions}
                value={localFilters?.sortBy}
                onChange={(value) => handleFilterChange('sortBy', value)}
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  Sort Order
                </label>
                <div className="flex space-x-2">
                  <Button
                    variant={localFilters?.sortOrder === 'asc' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleFilterChange('sortOrder', 'asc')}
                    className="flex-1 hover-glow-primary cosmic-transition"
                    iconName="ArrowUp"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Ascending
                  </Button>
                  <Button
                    variant={localFilters?.sortOrder === 'desc' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleFilterChange('sortOrder', 'desc')}
                    className="flex-1 hover-glow-primary cosmic-transition"
                    iconName="ArrowDown"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Descending
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="space-y-4">
            <h4 className="text-sm font-heading text-text-primary">
              Advanced Options
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Checkbox
                  label="Show only favorites"
                  checked={localFilters?.favoritesOnly || false}
                  onChange={(e) => handleFilterChange('favoritesOnly', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Include archived"
                  checked={localFilters?.includeArchived || false}
                  onChange={(e) => handleFilterChange('includeArchived', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Show empty capsules"
                  checked={localFilters?.showEmpty || false}
                  onChange={(e) => handleFilterChange('showEmpty', e?.target?.checked)}
                />
              </div>
              
              <div className="space-y-3">
                <Checkbox
                  label="Group by category"
                  checked={localFilters?.groupByCategory || false}
                  onChange={(e) => handleFilterChange('groupByCategory', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Show unlock previews"
                  checked={localFilters?.showPreviews || true}
                  onChange={(e) => handleFilterChange('showPreviews', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Enable auto-refresh"
                  checked={localFilters?.autoRefresh || false}
                  onChange={(e) => handleFilterChange('autoRefresh', e?.target?.checked)}
                />
              </div>
            </div>
          </div>

          {/* Quick Filter Presets */}
          <div className="space-y-4">
            <h4 className="text-sm font-heading text-text-primary">
              Quick Presets
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { 
                  label: 'Recent', 
                  filters: { timeRange: 'week', sortBy: 'createdAt', sortOrder: 'desc' },
                  icon: 'Clock'
                },
                { 
                  label: 'Unlocked', 
                  filters: { status: 'unlocked', sortBy: 'unlockDate', sortOrder: 'desc' },
                  icon: 'Unlock'
                },
                { 
                  label: 'Coming Soon', 
                  filters: { status: 'unlocking', sortBy: 'unlockDate', sortOrder: 'asc' },
                  icon: 'Timer'
                },
                { 
                  label: 'Favorites', 
                  filters: { favoritesOnly: true, sortBy: 'createdAt', sortOrder: 'desc' },
                  icon: 'Heart'
                }
              ]?.map((preset) => (
                <Button
                  key={preset?.label}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newFilters = { ...localFilters, ...preset?.filters };
                    setLocalFilters(newFilters);
                    onFilterChange(newFilters);
                  }}
                  className="hover-glow-secondary cosmic-transition"
                  iconName={preset?.icon}
                  iconPosition="left"
                  iconSize={14}
                >
                  {preset?.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FilterControls;