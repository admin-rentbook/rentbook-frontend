import { Cancel01Icon, AlertCircleIcon, Loading03Icon } from 'hugeicons-react';
import { useState } from 'react';

type ImagePreviewCardProps = {
  url: string;
  index: number;
  onRemove: (index: number) => void;
  isDeleting?: boolean;
  mediaId?: number;
};

export const ImagePreviewCard = ({
  url,
  index,
  onRemove,
  isDeleting = false,
}: ImagePreviewCardProps) => {
  const [imageLoading, setImageLoading] = useState(!!url);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative group h-[200px] rounded-[1.25em] border-none overflow-hidden">
      {imageLoading && !imageError && url && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      )}

      {imageError && (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center gap-2">
          <AlertCircleIcon className="h-8 w-8 text-red-500" />
          <p className="text-xs text-gray-500">Failed to load image</p>
          <button
            onClick={() => {
              setImageError(false);
              setImageLoading(true);
            }}
            className="text-xs text-primary underline"
          >
            Retry
          </button>
        </div>
      )}

      {url && (
        <img
          src={url}
          alt={`Upload ${index + 1}`}
          className={`w-full h-full object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageLoading(false);
            setImageError(true);
          }}
        />
      )}

      {!url && !imageLoading && (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center gap-2">
          <AlertCircleIcon className="h-8 w-8 text-red-500" />
          <p className="text-xs text-gray-500">No URL available</p>
        </div>
      )}

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all">
        <button
          onClick={() => onRemove(index)}
          disabled={isDeleting}
          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isDeleting ? (
            <Loading03Icon className="h-4 w-4 animate-spin" />
          ) : (
            <Cancel01Icon className="h-4 w-4" />
          )}
        </button>
      </div>

      {isDeleting && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loading03Icon className="h-8 w-8 text-white animate-spin" />
            <p className="text-xs text-white">Deleting...</p>
          </div>
        </div>
      )}
    </div>
  );
};
