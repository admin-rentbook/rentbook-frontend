import { PasswordRequirementBadge } from './PasswordRequirementBadge';

export type PasswordRequirement = {
  label: string;
  test: (pwd: string) => boolean;
  met: boolean;
};
interface PasswordRequirementsProps {
  password: string;
  isVisible: boolean;
}

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
  password,
  isVisible,
}) => {
  console.log('isVidi', isVisible)
  const requirements: PasswordRequirement[] = [
    {
      label: 'Lowercase letters',
      test: (pwd) => /[a-z]/.test(pwd),
      met: /[a-z]/.test(password),
    },
    {
      label: 'Uppercase letter',
      test: (pwd) => /[A-Z]/.test(pwd),
      met: /[A-Z]/.test(password),
    },
    {
      label: 'Number',
      test: (pwd) => /[0-9]/.test(pwd),
      met: /[0-9]/.test(password),
    },
    {
      label: '8 characters minimum',
      test: (pwd) => pwd.length >= 8,
      met: password.length >= 8,
    },
    {
      label: '1 special character',
      test: (pwd) => /[^a-zA-Z0-9]/.test(pwd),
      met: /[^a-zA-Z0-9]/.test(password),
    },
  ];

  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex gap-3 flex-wrap">
      {requirements.map((requirement, index) => (
        <PasswordRequirementBadge key={index} requirement={requirement} />
      ))}
    </div>
  );
};
