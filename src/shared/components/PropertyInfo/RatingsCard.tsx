import { useExpandableText } from '@/shared/hooks';
import type { Review } from '@/shared/types';
import { getRelativeTime } from '@/shared/utils';
import { StarRating } from './StarRating';

type ReviewCardProps = {
  review: Review;
};

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const { displayText } = useExpandableText(review.comment, { maxLength: 150 });
  return (
    <div className="flex flex-col gap-3 justify-between h-full">
      <div className='flex gap-1 items-center'>
        <StarRating rating={review.rating} size={10} />
        <p className="text-11 text-custom-neutral-900/40">
          {getRelativeTime(review.date)}
        </p>
      </div>
      <p className="text-body-small text-icons-black">{displayText}</p>

      <div className="flex items-center gap-4">
        <img
          src={review.image || 'https://via.placeholder.com/48'}
          alt={review.reviewerName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <p className="text-body-xs text-icons-black">{review.reviewerName}</p>
      </div>
    </div>
  );
};
