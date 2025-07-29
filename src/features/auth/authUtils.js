// Utility functions for authentication

export const encryptRecaptchaToken = (email) => {
  if (!email) {
    console.warn('Email is required for recaptcha token generation');
    return 'any'; // Fallback value
  }
  try {
    return btoa(`recaptcha-${email}`);
  } catch (error) {
    console.error('Error encrypting recaptcha token:', error);
    return 'any'; // Fallback value
  }
};