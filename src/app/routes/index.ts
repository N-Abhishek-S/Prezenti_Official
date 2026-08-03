import { registerRoutes } from './routeRegistry';
import { serviceRoutes } from './serviceRoutes';
import { knowledgeRoutes } from './knowledgeRoutes';
import { blogRoutes } from './blogRoutes';
import { industryRoutes } from './industryRoutes';
import { locationRoutes } from './locationRoutes';

// Run registration
registerRoutes(serviceRoutes);
registerRoutes(knowledgeRoutes);
registerRoutes(blogRoutes);
registerRoutes(industryRoutes);
registerRoutes(locationRoutes);

// We will add industryRoutes, locationRoutes as we build them.
