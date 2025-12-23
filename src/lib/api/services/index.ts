/**
 * Services API - Export centralisé
 */

// Auth
export { authService } from './auth.service';

// Editorial
export {
  articlesService,
  videosService,
  categoriesService,
  authorsService,
  homepageService,
} from './editorial.service';

// Search
export {
  searchService,
  createSearchDebounce,
  highlightSearchTerm,
  buildSearchUrl,
} from './search.service';

// Engagement
export {
  newsletterService,
  contactService,
  isValidEmail,
  validateContactForm,
  validateNewsletterEmail,
} from './engagement.service';

export type {
  ContactValidationResult,
  NewsletterValidationResult,
} from './engagement.service';
