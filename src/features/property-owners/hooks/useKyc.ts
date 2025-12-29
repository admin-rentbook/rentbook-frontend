import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Zod schema for KYC form validation
const kycSchema = z.object({
  namibianRegNo: z
    .string()
    .min(1, 'Registration number is required')
    .min(5, 'Registration number must be at least 5 characters'),
});

type KycFormData = z.infer<typeof kycSchema>;

type KycFile = {
  file: File;
  preview: string;
  type: 'front' | 'back';
};

export const useKyc = () => {
  const [frontIdCard, setFrontIdCard] = useState<KycFile | null>(null);
  const [backIdCard, setBackIdCard] = useState<KycFile | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const form = useForm<KycFormData>({
    resolver: zodResolver(kycSchema),
    mode: 'onChange',
    defaultValues: {
      namibianRegNo: '',
    },
  });

  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB in bytes
  const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be smaller than 20MB';
    }
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return 'Only PDF, JPG, and PNG files are accepted';
    }
    return null;
  };

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'front' | 'back'
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      setUploadError(error);
      return;
    }

    setUploadError(null);

    // Create preview URL
    const preview = URL.createObjectURL(file);
    const kycFile: KycFile = { file, preview, type };

    if (type === 'front') {
      // Clean up previous preview URL if exists
      if (frontIdCard?.preview) {
        URL.revokeObjectURL(frontIdCard.preview);
      }
      setFrontIdCard(kycFile);
    } else {
      if (backIdCard?.preview) {
        URL.revokeObjectURL(backIdCard.preview);
      }
      setBackIdCard(kycFile);
    }

    // Reset the input so the same file can be selected again if removed
    event.target.value = '';
  };

  const removeFile = (type: 'front' | 'back') => {
    if (type === 'front' && frontIdCard) {
      URL.revokeObjectURL(frontIdCard.preview);
      setFrontIdCard(null);
    } else if (type === 'back' && backIdCard) {
      URL.revokeObjectURL(backIdCard.preview);
      setBackIdCard(null);
    }
  };

  const onSubmit = async (data: KycFormData) => {
    // Validate that both ID card images are uploaded
    if (!frontIdCard || !backIdCard) {
      setUploadError('Please upload both front and back images of your identity card');
      return;
    }

    setIsSubmitting(true);
    setUploadError(null);

    try {
      // Prepare FormData for API call (similar to media upload)
      const formData = new FormData();
      formData.append('front_id_card', frontIdCard.file);
      formData.append('back_id_card', backIdCard.file);
      formData.append('namibian_reg_no', data.namibianRegNo);

      // TODO: Call API here
      // await submitKyc(formData);
      console.log('KYC Form Data:', {
        namibianRegNo: data.namibianRegNo,
        frontIdCard: frontIdCard.file.name,
        backIdCard: backIdCard.file.name,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success - clean up and reset
      if (frontIdCard?.preview) URL.revokeObjectURL(frontIdCard.preview);
      if (backIdCard?.preview) URL.revokeObjectURL(backIdCard.preview);

      setFrontIdCard(null);
      setBackIdCard(null);
      form.reset();

      // TODO: Show success message or redirect
      console.log('KYC submitted successfully!');
    } catch (error) {
      console.error('Error submitting KYC:', error);
      setUploadError('Failed to submit KYC. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cleanup on unmount
  const cleanup = () => {
    if (frontIdCard?.preview) URL.revokeObjectURL(frontIdCard.preview);
    if (backIdCard?.preview) URL.revokeObjectURL(backIdCard.preview);
  };

  const isButtonDisabled = !form.formState.isValid || isSubmitting;

  return {
    form,
    frontIdCard,
    backIdCard,
    isSubmitting,
    uploadError,
    handleFileSelect,
    removeFile,
    onSubmit,
    cleanup,
    isButtonDisabled,
  };
};