/**
 * Validate KYC document file
 */
export const validateKycFile = (file: File): { valid: boolean; error?: string } => {
  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
  const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `${file.name} exceeds 20MB. Please choose a smaller file.`,
    };
  }

  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `${file.name} is not a valid file type. Only PDF, JPG, and PNG files are accepted.`,
    };
  }

  return { valid: true };
};