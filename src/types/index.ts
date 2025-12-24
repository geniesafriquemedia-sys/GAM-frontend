/**
 * GAM Types - Export Centralisé
 *
 * Structure:
 * - api.ts        : Types API de base (pagination, erreurs)
 * - auth.ts       : Authentification (JWT, User)
 * - editorial/    : Module éditorial (Author, Category, Article, Video)
 * - engagement.ts : Newsletter, Contact
 * - search.ts     : Recherche globale
 * - homepage.ts   : Page d'accueil
 */

// =============================================================================
// API BASE
// =============================================================================
export type {
  PaginatedResponse,
  PaginationParams,
  ApiResponse,
  ApiSuccessResponse,
  ApiError,
  ValidationError,
  HttpMethod,
  RequestConfig,
  OrderDirection,
  OrderingParam,
} from './api';

export { buildOrdering } from './api';

// =============================================================================
// AUTH
// =============================================================================
export type {
  UserRole,
  User,
  UserProfile,
  AuthTokens,
  DecodedToken,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshRequest,
  RefreshResponse,
  ChangePasswordRequest,
  ResetPasswordRequest,
  ResetPasswordConfirmRequest,
  AuthState,
} from './auth';

// =============================================================================
// EDITORIAL
// =============================================================================
export * from './editorial';

// =============================================================================
// ENGAGEMENT
// =============================================================================
export type {
  NewsletterStatus,
  NewsletterSubscription,
  NewsletterSubscribeRequest,
  NewsletterSubscribeResponse,
  NewsletterUnsubscribeRequest,
  ContactStatus,
  ContactMessage,
  ContactRequest,
  ContactResponse,
  NewsletterValidation,
  ContactValidation,
  NewsletterFormState,
  ContactFormState,
} from './engagement';

export {
  newsletterValidation,
  contactValidation,
  initialNewsletterFormState,
  initialContactFormState,
} from './engagement';

// =============================================================================
// SEARCH
// =============================================================================
export type {
  SearchContentType,
  SearchParams,
  SearchResultArticle,
  SearchResultVideo,
  SearchResultCategory,
  SearchResultAuthor,
  SearchResultItem,
  SearchResponse,
  SearchPaginatedResponse,
  SuggestionsParams,
  SuggestionsResponse,
  TrendingTagsResponse,
  SearchState,
  SearchFilters,
} from './search';

export {
  initialSearchState,
  getSearchResultUrl,
  getSearchResultIcon,
  getSearchResultLabel,
  getTotalResultsCount,
  hasResults,
  defaultSearchFilters,
} from './search';

// =============================================================================
// HOMEPAGE
// =============================================================================
export type {
  HomepageResponse,
  CategoryWithContent,
  HeroSection,
  NewsSection,
  VideoSection,
  CategorySection,
  HomepageState,
} from './homepage';

export {
  initialHomepageState,
  buildHeroSection,
  groupArticlesByCategory,
  getLatestContent,
} from './homepage';

// =============================================================================
// KPI
// =============================================================================
export type {
  PlatformKPI,
} from './kpi';

export {
  formatKPINumber,
  formatKPIWithPlus,
} from './kpi';
