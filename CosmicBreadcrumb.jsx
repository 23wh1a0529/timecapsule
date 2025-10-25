import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Icon from '../AppIcon';

const CosmicBreadcrumb = ({ className = '' }) => {
  const location = useLocation();
  
  const routeMap = {
    '/kal-chakra-gateway-landing': 'Gateway',
    '/temporal-identity-console': 'Identity',
    '/holographic-otp-verification': 'Verification',
    '/my-time-orbit-dashboard': 'Dashboard',
    '/memory-forge-creation': 'Create Capsule',
    '/capsule-orbital-view': 'Capsule View'
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [];

    if (pathSegments?.length === 0) return breadcrumbs;

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeName = routeMap?.[currentPath];
      
      if (routeName) {
        breadcrumbs?.push({
          path: currentPath,
          name: routeName,
          isLast: index === pathSegments?.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) return null;

  return (
    <nav 
      className={`fixed top-6 left-6 z-100 glassmorphic px-4 py-2 ${className}`}
      aria-label="Cosmic navigation breadcrumb"
    >
      <ol className="flex items-center space-x-2 text-sm font-caption">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="mx-2 text-primary glow-primary" 
              />
            )}
            {crumb?.isLast ? (
              <span className="text-primary font-medium glow-primary">
                {crumb?.name}
              </span>
            ) : (
              <Link
                to={crumb?.path}
                className="text-text-secondary hover:text-primary cosmic-transition hover-glow-primary px-2 py-1 rounded-lg"
              >
                {crumb?.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CosmicBreadcrumb;