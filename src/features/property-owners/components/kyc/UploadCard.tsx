import { Button } from '@/shared/components';
import { Delete02Icon, PassportIcon } from 'hugeicons-react';
import { useRef } from 'react';

type UploadCardProps = {
  label: string;
  file: { file: File; preview: string } | null;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
  disabled?: boolean;
};

export const UploadCard = ({
  label,
  file,
  onFileSelect,
  onRemove,
  disabled = false,
}: UploadCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') {
      return '📄';
    }
    return '🖼️';
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="border-2 border-dashed border-custom-gray-500/50 rounded-lg p-6 flex flex-col items-center justify-center gap-4 min-h-[200px] bg-sidebar">
        {!file ? (
          <>
            <div className="size-[50px] rounded-full bg-white flex items-center justify-center">
              <PassportIcon className="size-6 text-black-400" />
            </div>
            <Button
              variant="outline"
              onClick={handleUploadClick}
              disabled={disabled}
              type="button"
            >
              {label}
            </Button>
            <p className="text-body-small text-black-500/50 text-center">
              PDF, JPG, PNG. File must be smaller than 20MB.
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 w-full">
            {file.file.type.startsWith('image/') ? (
              <img
                src={file.preview}
                alt="ID Card preview"
                className="max-h-32 rounded-md object-contain"
              />
            ) : (
              <div className="text-5xl">{getFileIcon(file.file.name)}</div>
            )}
            <p className="text-body-small text-black-500 text-center truncate max-w-full px-2">
              {file.file.name}
            </p>
            <p className="text-caption text-black-400">
              {(file.file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            {onRemove && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRemove}
                disabled={disabled}
                type="button"
                className="gap-2"
              >
                <Delete02Icon className="size-4" />
                Remove
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={onFileSelect}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
};
