import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onInspireMe, className = '' }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for demonstration
  const mockCredentials = {
    email: 'cosmic.traveler@kalchakra.realm',
    password: 'TimeVault2025!'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors on input change
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate authentication process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check credentials
    if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
      // Store user session
      localStorage.setItem('kalchakra_user', JSON.stringify({
        email: formData?.email,
        isVerified: true,
        loginAt: new Date()?.toISOString(),
        rememberMe: formData?.rememberMe
      }));
      
      setIsLoading(false);
      navigate('/my-time-orbit-dashboard');
    } else {
      setErrors({
        general: `Invalid credentials. Use: ${mockCredentials?.email} / ${mockCredentials?.password}`
      });
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* General Error */}
      {errors?.general && (
        <div className="glassmorphic p-4 border border-error glow-error rounded-xl">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={20} className="text-error" />
            <span className="text-error font-caption text-sm">{errors?.general}</span>
          </div>
        </div>
      )}
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
      {/* Remember Me Checkbox */}
      <Checkbox
        label="Remember my temporal signature"
        checked={formData?.rememberMe}
        onChange={handleInputChange}
        name="rememberMe"
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
            Accessing Vault...
          </>
        ) : (
          <>
            <Icon name="Unlock" size={20} className="mr-2" />
            Access Temporal Vault
          </>
        )}
      </Button>
      {/* Forgot Password Link */}
      <div className="text-center">
        <Button
          type="button"
          variant="link"
          onClick={() => console.log('Forgot password')}
          className="text-text-secondary hover:text-primary cosmic-transition"
        >
          Forgotten your encryption key?
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;