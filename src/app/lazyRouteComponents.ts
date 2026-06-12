import { lazy } from 'react';

export const TalkToUs = lazy(() => import('../pages/TalkToUs').then((module) => ({ default: module.TalkToUs })));
export const ServiceLandingPage = lazy(() => import('../pages/ServiceLandingPage').then((module) => ({ default: module.ServiceLandingPage })));
export const ServicesHubPage = lazy(() => import('../pages/ServicesHubPage').then((module) => ({ default: module.ServicesHubPage })));
export const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy').then((module) => ({ default: module.PrivacyPolicy })));
export const TermsAndConditions = lazy(() => import('../pages/TermsAndConditions').then((module) => ({ default: module.TermsAndConditions })));
export const LocationServiceLandingPage = lazy(() => import('../pages/LocationServiceLandingPage').then((module) => ({ default: module.LocationServiceLandingPage })));
export const LocationLandingPage = lazy(() => import('../pages/LocationLandingPage').then((module) => ({ default: module.LocationLandingPage })));
export const IndustryLandingPage = lazy(() => import('../pages/IndustryLandingPage').then((module) => ({ default: module.IndustryLandingPage })));
