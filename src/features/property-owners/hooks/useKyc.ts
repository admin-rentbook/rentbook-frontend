import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { uploadKycDocuments } from '../apis/requests';
import { kycSchema } from '../constants';
import { validateKycFile } from '../utils/kycUploadHelpers';

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
  const [uploadProgress, setUploadProgress] = useState(0);

  const form = useForm<KycFormData>({
    resolver: zodResolver(kycSchema),
    mode: 'onChange',
    defaultValues: {
      namibianRegNo: '',
    },
  });

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'front' | 'back'
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateKycFile(file);
    if (!validation.valid) {
      setUploadError(validation.error || 'Invalid file');
      toast.error('Invalid file', {
        description: validation.error,
      });
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
      setUploadError(
        'Please upload both front and back images of your identity card'
      );
      return;
    }

    setIsSubmitting(true);
    setUploadError(null);
    setUploadProgress(0);

    try {
      // Upload KYC documents with 3-step flow
      await uploadKycDocuments({
        frontIdCard: frontIdCard.file,
        backIdCard: backIdCard.file,
        namibianRegNo: data.namibianRegNo,
        onProgress: (progress) => {
          setUploadProgress(progress);
        },
      });

      // Success - clean up and reset
      if (frontIdCard?.preview) URL.revokeObjectURL(frontIdCard.preview);
      if (backIdCard?.preview) URL.revokeObjectURL(backIdCard.preview);

      setFrontIdCard(null);
      setBackIdCard(null);
      form.reset();

      toast.success('KYC submitted successfully!', { id: 'kyc-suc' });
    } catch (error: any) {
      const errorMessage =
        error.message || 'Failed to submit KYC. Please try again.';
      toast.error(errorMessage, {
        id: 'kyc-err',
        duration: 5000,
      });
      setUploadError(errorMessage);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  // Cleanup on unmount
  const cleanup = () => {
    if (frontIdCard?.preview) URL.revokeObjectURL(frontIdCard.preview);
    if (backIdCard?.preview) URL.revokeObjectURL(backIdCard.preview);
  };

  const isButtonDisabled =
    !form.formState.isValid || isSubmitting || !frontIdCard || !backIdCard;

  return {
    form,
    frontIdCard,
    backIdCard,
    isSubmitting,
    uploadError,
    uploadProgress,
    handleFileSelect,
    removeFile,
    onSubmit,
    cleanup,
    isButtonDisabled,
  };
};
