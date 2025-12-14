import type { ReviewDTO } from '@/shared/types';
import { StarIcon } from 'hugeicons-react';
import { Button } from '../ui';
import { ReviewCard } from './RatingsCard';

type ReviewComponentProps = {
  reviewData: ReviewDTO;
};

export const ReviewComponent = ({ reviewData }: ReviewComponentProps) => {
  const formattedRating =
    reviewData.averageRating % 1 === 0
      ? reviewData.averageRating.toFixed(0)
      : reviewData.averageRating.toFixed(1);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex text-custom-gray-900 items-center gap-2">
        <StarIcon className="size-5 fill-custom-gray-900 text-custom-gray-900" />
        <h3 className="text-heading-3-semibold text-custom-gray-900">
          {`${formattedRating} ${reviewData.totalReviews} reviews`}
        </h3>
      </div>
      <div className="flex flex-col  md:flex-row gap-3">
        {reviewData.reviews.map((review, index) => (
          <div
            key={`${review.reviewerName}-${index}`}
            className=" w-full lg:w-1/2 2xl:w-1/5"
          >
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
      <div>
        <Button variant="tertiary" size="sm">
          See all {reviewData.reviews.length} reviews{' '}
        </Button>
      </div>
    </div>
  );
};
