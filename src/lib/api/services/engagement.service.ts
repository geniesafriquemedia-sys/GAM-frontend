/**
 * Service Engagement
 * Newsletter et Contact
 */

import { apiClient } from '../client';
import { ENDPOINTS } from '../config';
import type {
  NewsletterSubscribeRequest,
  NewsletterSubscribeResponse,
  ContactRequest,
  ContactResponse,
} from '@/types';

// =============================================================================
// NEWSLETTER SERVICE
// =============================================================================

export const newsletterService = {
  /**
   * Inscription à la newsletter
   */
  async subscribe(email: string, source?: string): Promise<NewsletterSubscribeResponse> {
    const data: NewsletterSubscribeRequest = {
      email: email.toLowerCase().trim(),
      source,
    };

    return apiClient.post<NewsletterSubscribeResponse>(
      ENDPOINTS.ENGAGEMENT.NEWSLETTER_SUBSCRIBE,
      data
    );
  },

  /**
   * Inscription avec nom (optionnel)
   */
  async subscribeWithName(
    email: string,
    firstName?: string,
    lastName?: string,
    source?: string
  ): Promise<NewsletterSubscribeResponse> {
    const data: NewsletterSubscribeRequest = {
      email: email.toLowerCase().trim(),
      first_name: firstName,
      last_name: lastName,
      source,
    };

    return apiClient.post<NewsletterSubscribeResponse>(
      ENDPOINTS.ENGAGEMENT.NEWSLETTER_SUBSCRIBE,
      data
    );
  },
};

// =============================================================================
// CONTACT SERVICE
// =============================================================================

export const contactService = {
  /**
   * Envoyer un message de contact
   */
  async send(data: ContactRequest): Promise<ContactResponse> {
    const sanitizedData: ContactRequest = {
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      subject: data.subject.trim(),
      message: data.message.trim(),
    };

    return apiClient.post<ContactResponse>(
      ENDPOINTS.ENGAGEMENT.CONTACT,
      sanitizedData
    );
  },
};

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

/**
 * Valide un email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

/**
 * Valide les données de contact
 */
export interface ContactValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactRequest, string>>;
}

export function validateContactForm(data: ContactRequest): ContactValidationResult {
  const errors: Partial<Record<keyof ContactRequest, string>> = {};

  // Nom
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Le nom doit contenir au moins 2 caractères';
  }

  // Email
  if (!data.email) {
    errors.email = 'L\'email est requis';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Veuillez entrer un email valide';
  }

  // Sujet
  if (!data.subject || data.subject.trim().length < 5) {
    errors.subject = 'Le sujet doit contenir au moins 5 caractères';
  }

  // Message
  if (!data.message || data.message.trim().length < 20) {
    errors.message = 'Le message doit contenir au moins 20 caractères';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Valide un email pour la newsletter
 */
export interface NewsletterValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateNewsletterEmail(email: string): NewsletterValidationResult {
  if (!email) {
    return { isValid: false, error: 'L\'email est requis' };
  }

  if (!isValidEmail(email)) {
    return { isValid: false, error: 'Veuillez entrer un email valide' };
  }

  return { isValid: true };
}
