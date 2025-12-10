import { Cancel01Icon } from 'hugeicons-react';

type ImagePreviewCardProps = {
  url: string;
  index: number;
  onRemove: (index: number) => void;
};

export const ImagePreviewCard = ({
  url,
  index,
  onRemove,
}: ImagePreviewCardProps) => {
  return (
    <div className="relative group h-[200px] rounded-[1.25em] border-none overflow-hidden">
      <img
        src={url}
        alt={`Upload ${index + 1}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all">
        <button
          onClick={() => onRemove(index)}
          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
        >
          <Cancel01Icon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
