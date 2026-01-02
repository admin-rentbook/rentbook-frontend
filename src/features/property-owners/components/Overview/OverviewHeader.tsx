import { Button } from '@/shared/components';
import { useNavigate } from '@tanstack/react-router';
import {
  ArrowRight01Icon,
  Cancel01Icon,
  UserCheck02Icon,
  UserStoryIcon,
} from 'hugeicons-react';
import { useState } from 'react';
import { useGetKycStatus } from '../../apis/requests';
import { Links } from '../../constants';

export const OverviewHeader = () => {
  const navigate = useNavigate();
  const { data: kycStatusData, isLoading } = useGetKycStatus();
  const [isKycBannerDismissed, setIsKycBannerDismissed] = useState(false);

  const kycStatus = kycStatusData?.status;
  const isVerified = kycStatusData?.is_verified;

  if (isLoading) {
    return <div className="p-3 lg:p-5 bg-white"></div>;
  }

  if (kycStatus === 'approved' && isVerified && isKycBannerDismissed) {
    return <div className="p-3 lg:p-5 bg-white"></div>;
  }

  if (kycStatus === 'approved' && isVerified) {
    return (
      <div className="p-3 lg:p-5">
        <div className="bg-white rounded-2xl p-3 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="size-[40px] rounded-xl grid place-items-center bg-red-400">
              <UserStoryIcon className="text-white size-5" />
            </div>
            <div>
              <p className="text-body-medium text-success-600">
                Verification complete
              </p>
              <p className="text-body-small text-black-300">
                Your profile has been verified and all your listings are now
                live
              </p>
            </div>
          </div>

          <Button onClick={() => setIsKycBannerDismissed(true)} variant="ghost">
            <Cancel01Icon className="size-5 text-black-400" />
          </Button>
        </div>
      </div>
    );
  }

  // Show verification prompt if KYC is not active
  return (
    <div className="p-3 lg:p-5">
      <div
        className="bg-white rounded-2xl p-3 flex justify-between items-center hover:cursor-pointer"
        onClick={() => navigate({ to: Links.KYC })}
      >
        <div className="flex gap-2 items-center">
          <div className="size-[40px] rounded-xl grid place-items-center bg-red-400">
            <UserCheck02Icon className="text-white size-4" />
          </div>
          <div>
            <p className="text-body-medium text-icons-black">
              Verify your account
            </p>
            <p className="text-body-small text-black-400">
              Required before your listings can be live
            </p>
          </div>
        </div>

        <ArrowRight01Icon />
      </div>
    </div>
  );
};
