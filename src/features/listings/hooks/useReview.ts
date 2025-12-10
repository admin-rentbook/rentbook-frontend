import { toast } from 'sonner';
import { useListingDraft } from '../providers';

export const useReview = (onNext: (() => void) | undefined) => {
      const { draft, markStepComplete, markMainStepComplete } = useListingDraft();
    
  const handleReviewSubmit = () => {
    markStepComplete(4, 0)
    markMainStepComplete(4)
    onNext?.();
    toast.success('Listing published!', { id: 'review-success' });
  };

  return {
    handleReviewSubmit,
    draft
  };
};
