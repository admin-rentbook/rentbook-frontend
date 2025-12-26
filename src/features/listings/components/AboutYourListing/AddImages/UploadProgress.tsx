import { Progress } from '@/shared/components/ui/progress';
import { CloudUploadIcon } from 'hugeicons-react';

type UploadProgressProps = {
  progress: number;
};

export const UploadProgress = ({ progress }: UploadProgressProps) => {
  const getStatusMessage = () => {
    if (progress < 90) {
      return 'Uploading images...';
    }
    if (progress < 100) {
      return 'Saving to database...';
    }
    return 'Upload complete!';
  };

  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <CloudUploadIcon className="size-4 text-primary animate-pulse" />
          <span className="text-black-500 font-medium">
            {getStatusMessage()}
          </span>
        </div>
        <span className="text-body">{progress}%</span>
      </div>
      <Progress value={progress} className="h-1" />
    </div>
  );
};