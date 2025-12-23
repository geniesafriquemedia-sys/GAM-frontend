/**
 * Types Engagement
 * Newsletter et Contact
 */

// =============================================================================
// NEWSLETTER
// =============================================================================

export type NewsletterStatus = 'pending' | 'confirmed' | 'unsubscribed';

export interface NewsletterSubscription {
  email: string;
  status: NewsletterStatus;
  created_at: string;
  confirmed_at: string | null;
}

// Request
export interface NewsletterSubscribeRequest {
  email: string;
  first_name?: string;
  last_name?: string;
  source?: string;        // Page d'origine
}

// Response
export interface NewsletterSubscribeResponse {
  success: boolean;
  message: string;
  already_subscribed?: boolean;
}

export interface NewsletterUnsubscribeRequest {
  email: string;
  token?: string;         // Token de désabonnement
}

// =============================================================================
// CONTACT
// =============================================================================

export type ContactStatus = 'new' | 'read' | 'replied' | 'archived';

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  created_at: string;
}

// Request
export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Response
export interface ContactResponse {
  success: boolean;
  message: string;
  id?: number;
}

// =============================================================================
// VALIDATION
// =============================================================================

export interface NewsletterValidation {
  email: {
    required: string;
    pattern: RegExp;
    message: string;
  };
}

export const newsletterValidation: NewsletterValidation = {
  email: {
    required: 'L\'email est requis',
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Veuillez entrer un email valide',
  },
};

export interface ContactValidation {
  name: { required: string; minLength: { value: number; message: string } };
  email: { required: string; pattern: { value: RegExp; message: string } };
  subject: { required: string; minLength: { value: number; message: string } };
  message: { required: string; minLength: { value: number; message: string } };
}

export const contactValidation: ContactValidation = {
  name: {
    required: 'Le nom est requis',
    minLength: { value: 2, message: 'Le nom doit contenir au moins 2 caractères' },
  },
  email: {
    required: 'L\'email est requis',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Veuillez entrer un email valide',
    },
  },
  subject: {
    required: 'Le sujet est requis',
    minLength: { value: 5, message: 'Le sujet doit contenir au moins 5 caractères' },
  },
  message: {
    required: 'Le message est requis',
    minLength: { value: 20, message: 'Le message doit contenir au moins 20 caractères' },
  },
};

// =============================================================================
// FORM STATE
// =============================================================================

export interface NewsletterFormState {
  email: string;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

export interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

export const initialNewsletterFormState: NewsletterFormState = {
  email: '',
  isSubmitting: false,
  isSuccess: false,
  error: null,
};

export const initialContactFormState: ContactFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
  isSubmitting: false,
  isSuccess: false,
  error: null,
};
