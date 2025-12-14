import { StarIcon } from 'hugeicons-react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
}

export const StarRating = ({
  rating,
  maxStars = 5,
  size = 20,
}: StarRatingProps) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: maxStars }, (_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= Math.floor(rating);

        return (
          <StarIcon
            key={index}
            size={size}
            className={`${
              isFilled
                ? 'fill-custom-gray-900 text-custom-gray-900'
                : 'fill-custom-gray-300 text-custom-gray-300'
            }`}
          />
        );
      })}
    </div>
  );
};
