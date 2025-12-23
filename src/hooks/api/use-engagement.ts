/**
 * Hooks Engagement
 * Newsletter et Contact
 */

import { useState, useCallback } from 'react';
import { useMutation } from './use-fetch';
import { api } from '@/lib/api';
import { validateNewsletterEmail, validateContactForm } from '@/lib/api/services/engagement.service';
import type {
  NewsletterSubscribeResponse,
  ContactRequest,
  ContactResponse,
} from '@/types';

// =============================================================================
// useNewsletter - Inscription newsletter
// =============================================================================

export interface UseNewsletterOptions {
  source?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export interface UseNewsletterResult {
  email: string;
  setEmail: (email: string) => void;
  subscribe: () => Promise<boolean>;
  isLoading: boolean;
  isSuccess: boolean;
  isAlreadySubscribed: boolean;
  error: string | null;
  reset: () => void;
}

export function useNewsletter(options: UseNewsletterOptions = {}): UseNewsletterResult {
  const { source, onSuccess, onError } = options;

  const [email, setEmail] = useState('');
  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);

  const mutation = useMutation<NewsletterSubscribeResponse, string>(
    (emailToSubscribe) => api.newsletter.subscribe(emailToSubscribe, source),
    {
      onSuccess: (data) => {
        if (data.already_subscribed) {
          setIsAlreadySubscribed(true);
        }
        onSuccess?.();
      },
      onError,
    }
  );

  const subscribe = useCallback(async (): Promise<boolean> => {
    // Validation
    const validation = validateNewsletterEmail(email);
    if (!validation.isValid) {
      mutation.reset();
      onError?.(validation.error || 'Email invalide');
      return false;
    }

    const result = await mutation.mutate(email);
    return result !== null;
  }, [email, mutation, onError]);

  const reset = useCallback(() => {
    setEmail('');
    setIsAlreadySubscribed(false);
    mutation.reset();
  }, [mutation]);

  return {
    email,
    setEmail,
    subscribe,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isAlreadySubscribed,
    error: mutation.error,
    reset,
  };
}

// =============================================================================
// useContact - Formulaire de contact
// =============================================================================

export interface UseContactOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export interface UseContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface UseContactResult {
  formData: UseContactFormData;
  setFormData: (data: Partial<UseContactFormData>) => void;
  setField: <K extends keyof UseContactFormData>(field: K, value: UseContactFormData[K]) => void;
  submit: () => Promise<boolean>;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  fieldErrors: Partial<Record<keyof ContactRequest, string>>;
  reset: () => void;
}

const initialFormData: UseContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function useContact(options: UseContactOptions = {}): UseContactResult {
  const { onSuccess, onError } = options;

  const [formData, setFormDataState] = useState<UseContactFormData>(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactRequest, string>>>({});

  const mutation = useMutation<ContactResponse, ContactRequest>(
    (data) => api.contact.send(data),
    {
      onSuccess: () => {
        onSuccess?.();
      },
      onError,
    }
  );

  const setFormData = useCallback((data: Partial<UseContactFormData>) => {
    setFormDataState(prev => ({ ...prev, ...data }));
    // Clear field errors for updated fields
    const updatedFields = Object.keys(data) as (keyof UseContactFormData)[];
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      updatedFields.forEach(field => {
        delete newErrors[field];
      });
      return newErrors;
    });
  }, []);

  const setField = useCallback(<K extends keyof UseContactFormData>(
    field: K,
    value: UseContactFormData[K]
  ) => {
    setFormData({ [field]: value });
  }, [setFormData]);

  const submit = useCallback(async (): Promise<boolean> => {
    // Validation
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      const firstError = Object.values(validation.errors)[0];
      onError?.(firstError || 'Veuillez corriger les erreurs');
      return false;
    }

    setFieldErrors({});
    const result = await mutation.mutate(formData);
    return result !== null;
  }, [formData, mutation, onError]);

  const reset = useCallback(() => {
    setFormDataState(initialFormData);
    setFieldErrors({});
    mutation.reset();
  }, [mutation]);

  return {
    formData,
    setFormData,
    setField,
    submit,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    fieldErrors,
    reset,
  };
}

// =============================================================================
// useNewsletterForm - Version avec gestion complète du formulaire
// =============================================================================

export interface UseNewsletterFormResult extends UseNewsletterResult {
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function useNewsletterForm(options: UseNewsletterOptions = {}): UseNewsletterFormResult {
  const newsletter = useNewsletter(options);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    await newsletter.subscribe();
  }, [newsletter]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    newsletter.setEmail(e.target.value);
  }, [newsletter]);

  return {
    ...newsletter,
    handleSubmit,
    handleChange,
  };
}
