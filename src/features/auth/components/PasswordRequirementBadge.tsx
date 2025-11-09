import { Cancel01Icon } from 'hugeicons-react';
import { Check } from 'lucide-react';
import type { PasswordRequirement } from './PasswordRequirements';

interface PasswordRequirementBadgeProps {
  requirement: PasswordRequirement;
}

export const PasswordRequirementBadge: React.FC<
  PasswordRequirementBadgeProps
> = ({ requirement }) => {
  return (
    <>
      <div className="flex items-center justify-center gap-2 p-[5px] border border-custom-neutral-150 rounded-full">
        {requirement.met ? (
          <div className="flex items-center p-0.5 justify-center size-4 rounded-full bg-success-400">
            <Check className="text-white" />
          </div>
        ) : (
          <div className="flex items-center p-[0.23em] justify-center size-4 rounded-full bg-custom-gray-400">
            <Cancel01Icon className=" text-white stroke-3" />
          </div>
        )}
        <p className="text-medium-contrast text-body-small">
          {requirement.label}
        </p>
      </div>
    </>
  );
};
