import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';


const MemoryContentUpload = ({ 
  memoryContent, 
  onContentChange, 
  className = '' 
}) => {
  const [activeTab, setActiveTab] = useState('text');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const tabs = [
    { id: 'text', label: 'Text Memory', icon: 'FileText' },
    { id: 'image', label: 'Image Memory', icon: 'Image' },
    { id: 'video', label: 'Video Memory', icon: 'Video' }
  ];

  const handleDragEnter = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    handleFileUpload(files?.[0]);
  };

  const handleFileUpload = (file) => {
    if (!file) return;

    const fileSize = (file?.size / 1024 / 1024)?.toFixed(2);
    const fileUrl = URL.createObjectURL(file);

    if (file?.type?.startsWith('image/')) {
      setActiveTab('image');
      onContentChange({
        ...memoryContent,
        type: 'image',
        imageFile: file,
        imageUrl: fileUrl,
        imageSize: fileSize,
        imageName: file?.name
      });
    } else if (file?.type?.startsWith('video/')) {
      setActiveTab('video');
      onContentChange({
        ...memoryContent,
        type: 'video',
        videoFile: file,
        videoUrl: fileUrl,
        videoSize: fileSize,
        videoName: file?.name
      });
    }
  };

  const handleTextChange = (value) => {
    onContentChange({
      ...memoryContent,
      type: 'text',
      textContent: value
    });
  };

  const removeFile = (type) => {
    if (type === 'image') {
      onContentChange({
        ...memoryContent,
        imageFile: null,
        imageUrl: null,
        imageSize: null,
        imageName: null
      });
    } else if (type === 'video') {
      onContentChange({
        ...memoryContent,
        videoFile: null,
        videoUrl: null,
        videoSize: null,
        videoName: null
      });
    }
  };

  return (
    <div className={`glassmorphic p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-heading text-primary glow-primary">
          Memory Content
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="Sparkles" size={20} className="text-accent glow-accent" />
          <span className="text-sm font-caption text-text-secondary">
            Choose your memory format
          </span>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 glassmorphic p-1 rounded-xl">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg cosmic-transition ${
              activeTab === tab?.id
                ? 'bg-primary text-primary-foreground glow-primary'
                : 'text-text-secondary hover:text-primary hover-glow-primary'
            }`}
          >
            <Icon name={tab?.icon} size={18} />
            <span className="font-caption text-sm">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Content Areas */}
      <div className="space-y-6">
        {/* Text Memory */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={memoryContent?.textContent || ''}
                onChange={(e) => handleTextChange(e?.target?.value)}
                placeholder="Write your memory, thoughts, or message to your future self..."
                className="w-full h-48 bg-surface border border-border rounded-xl p-4 text-text-primary placeholder-text-secondary resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cosmic-transition"
                maxLength={5000}
              />
              <div className="absolute bottom-3 right-3 text-xs text-text-secondary">
                {memoryContent?.textContent?.length || 0}/5000
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <Icon name="Type" size={16} className="text-primary" />
                <span>Rich text formatting supported</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-accent" />
                <span>Auto-saved every 30 seconds</span>
              </div>
            </div>
          </div>
        )}

        {/* Image Memory */}
        {activeTab === 'image' && (
          <div className="space-y-4">
            {!memoryContent?.imageUrl ? (
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center cosmic-transition ${
                  dragActive
                    ? 'border-primary bg-primary/10 glow-primary' :'border-border hover:border-primary/50'
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Icon name="Upload" size={48} className="mx-auto mb-4 text-primary glow-primary" />
                <h4 className="text-lg font-heading text-text-primary mb-2">
                  Upload Image Memory
                </h4>
                <p className="text-text-secondary mb-4">
                  Drag and drop your image here, or click to browse
                </p>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef?.current?.click()}
                  className="hover-glow-primary"
                >
                  <Icon name="FolderOpen" size={18} className="mr-2" />
                  Choose Image
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e?.target?.files?.[0])}
                  className="hidden"
                />
                <div className="mt-4 text-xs text-text-secondary">
                  Supported formats: JPG, PNG, GIF, WebP • Max size: 10MB
                </div>
              </div>
            ) : (
              <div className="glassmorphic p-4 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="Image" size={20} className="text-success glow-success" />
                    <div>
                      <div className="font-caption text-text-primary">{memoryContent?.imageName}</div>
                      <div className="text-xs text-text-secondary">{memoryContent?.imageSize} MB</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile('image')}
                    className="text-error hover:text-error hover-glow-error"
                  >
                    <Icon name="Trash2" size={18} />
                  </Button>
                </div>
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src={memoryContent?.imageUrl}
                    alt="Uploaded memory image showing personal moment or meaningful scene"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Video Memory */}
        {activeTab === 'video' && (
          <div className="space-y-4">
            {!memoryContent?.videoUrl ? (
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center cosmic-transition ${
                  dragActive
                    ? 'border-primary bg-primary/10 glow-primary' :'border-border hover:border-primary/50'
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Icon name="Video" size={48} className="mx-auto mb-4 text-secondary glow-secondary" />
                <h4 className="text-lg font-heading text-text-primary mb-2">
                  Upload Video Memory
                </h4>
                <p className="text-text-secondary mb-4">
                  Drag and drop your video here, or click to browse
                </p>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef?.current?.click()}
                  className="hover-glow-secondary"
                >
                  <Icon name="FolderOpen" size={18} className="mr-2" />
                  Choose Video
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileUpload(e?.target?.files?.[0])}
                  className="hidden"
                />
                <div className="mt-4 text-xs text-text-secondary">
                  Supported formats: MP4, WebM, MOV • Max size: 100MB
                </div>
              </div>
            ) : (
              <div className="glassmorphic p-4 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="Video" size={20} className="text-success glow-success" />
                    <div>
                      <div className="font-caption text-text-primary">{memoryContent?.videoName}</div>
                      <div className="text-xs text-text-secondary">{memoryContent?.videoSize} MB</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile('video')}
                    className="text-error hover:text-error hover-glow-error"
                  >
                    <Icon name="Trash2" size={18} />
                  </Button>
                </div>
                <div className="relative rounded-lg overflow-hidden bg-surface">
                  <video
                    src={memoryContent?.videoUrl}
                    controls
                    className="w-full h-48 object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Memory Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="glassmorphic p-3 rounded-lg text-center">
          <Icon name="FileText" size={20} className="mx-auto mb-2 text-primary glow-primary" />
          <div className="text-xs text-text-secondary">Text Length</div>
          <div className="font-mono text-sm text-text-primary">
            {memoryContent?.textContent?.length || 0}
          </div>
        </div>
        <div className="glassmorphic p-3 rounded-lg text-center">
          <Icon name="HardDrive" size={20} className="mx-auto mb-2 text-secondary glow-secondary" />
          <div className="text-xs text-text-secondary">File Size</div>
          <div className="font-mono text-sm text-text-primary">
            {memoryContent?.imageSize || memoryContent?.videoSize || '0'} MB
          </div>
        </div>
        <div className="glassmorphic p-3 rounded-lg text-center">
          <Icon name="Shield" size={20} className="mx-auto mb-2 text-accent glow-accent" />
          <div className="text-xs text-text-secondary">Encryption</div>
          <div className="font-mono text-sm text-text-primary">AES-256</div>
        </div>
      </div>
    </div>
  );
};

export default MemoryContentUpload;