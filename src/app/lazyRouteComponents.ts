import { lazy } from 'react';

export const TalkToUs = lazy(() => import('../pages/TalkToUs').then((module) => ({ default: module.TalkToUs })));
