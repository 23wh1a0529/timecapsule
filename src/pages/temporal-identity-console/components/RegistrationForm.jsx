import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RegistrationForm = ({ onInspireMe, className = '' }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    avatar: null
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validatePassword = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[A-Z]/?.test(password)) strength++;
    if (/[a-z]/?.test(password)) strength++;
    if (/[0-9]/?.test(password)) strength++;
    if (/[^A-Za-z0-9]/?.test(password)) strength++;
    return strength;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      setPasswordStrength(validatePassword(value));
    }
    
    // Clear errors on input change
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, avatar: file }));
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e?.target?.result);
      reader?.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Temporal signature required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Invalid cosmic address format';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Encryption key required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Minimum 8 characters for temporal security';
    }
    
    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Encryption keys do not align';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate blockchain encryption process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store user data in localStorage
    localStorage.setItem('kalchakra_user', JSON.stringify({
      email: formData?.email,
      avatar: avatarPreview,
      createdAt: new Date()?.toISOString(),
      isVerified: false
    }));
    
    setIsLoading(false);
    navigate('/holographic-otp-verification');
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-error';
    if (passwordStrength <= 3) return 'bg-warning';
    return 'bg-success';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Avatar Upload */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full glassmorphic glow-subtle overflow-hidden flex items-center justify-center">
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt="User avatar preview showing uploaded profile image"
                className="w-full h-full object-cover"
              />
            ) : (
              <Icon name="User" size={32} className="text-text-secondary" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Upload avatar image"
          />
          <div className="absolute -bottom-2 -right-2 glassmorphic w-8 h-8 rounded-full flex items-center justify-center glow-primary">
            <Icon name="Camera" size={16} className="text-primary" />
          </div>
        </div>
      </div>
      {/* Email Input */}
      <Input
        label="Temporal Signature"
        type="email"
        name="email"
        value={formData?.email}
        onChange={handleInputChange}
        placeholder="your.identity@cosmos.realm"
        error={errors?.email}
        required
        className="cosmic-transition"
      />
      {/* Password Input */}
      <div className="space-y-2">
        <Input
          label="Encryption Key"
          type="password"
          name="password"
          value={formData?.password}
          onChange={handleInputChange}
          placeholder="Enter your cosmic encryption key"
          error={errors?.password}
          required
          className="cosmic-transition"
        />
        
        {/* Password Strength Indicator */}
        {formData?.password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary font-caption">Encryption Strength:</span>
              <span className={`font-mono ${
                passwordStrength <= 1 ? 'text-error' : 
                passwordStrength <= 3 ? 'text-warning' : 'text-success'
              }`}>
                {getStrengthText()}
              </span>
            </div>
            <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
              <div
                className={`h-full cosmic-transition ${getStrengthColor()}`}
                style={{ width: `${(passwordStrength / 5) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
      {/* Confirm Password Input */}
      <Input
        label="Confirm Encryption Key"
        type="password"
        name="confirmPassword"
        value={formData?.confirmPassword}
        onChange={handleInputChange}
        placeholder="Re-enter your encryption key"
        error={errors?.confirmPassword}
        required
        className="cosmic-transition"
      />
      {/* Inspire Me Button */}
      <Button
        type="button"
        variant="outline"
        onClick={onInspireMe}
        className="w-full hover-glow-accent cosmic-transition"
      >
        <Icon name="Sparkles" size={20} className="mr-2" />
        Inspire Me
      </Button>
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        loading={isLoading}
        className="w-full glow-primary hover-glow-primary cosmic-transition"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
            Forging Identity...
          </>
        ) : (
          <>
            <Icon name="Rocket" size={20} className="mr-2" />
            Create Temporal Identity
          </>
        )}
      </Button>
    </form>
  );
};

export default RegistrationForm;