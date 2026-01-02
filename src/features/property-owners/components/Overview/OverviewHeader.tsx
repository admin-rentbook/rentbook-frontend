import { useAppStore } from '@/core/store';
import { useNavigate } from '@tanstack/react-router';
import {
  ArrowRight01Icon,
  Cancel01Icon,
  UserCheck02Icon,
} from 'hugeicons-react';
import { useState } from 'react';
import { Links } from '../../constants';

export const OverviewHeader = () => {
  const navigate = useNavigate();
  const kycStatus = useAppStore((s) => s.authUser)?.user.kyc_status;
  const [isKycBannerDismissed, setIsKycBannerDismissed] = useState(false);

  // If KYC is verified and banner is dismissed, show white/blank header
  if (kycStatus === 'active' && isKycBannerDismissed) {
    return <div className="p-3 lg:p-5 bg-white"></div>;
  }

  // Show verification complete message if KYC is active
  if (kycStatus === 'active') {
    return (
      <div className="p-3 lg:p-5">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-3 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="size-[40px] rounded-xl grid place-items-center bg-white/20">
              <UserCheck02Icon className="text-white size-4" />
            </div>
            <div>
              <p className="text-body-medium text-success-500">
                Verification complete
              </p>
              <p className="text-body-small text-white">
                Your profile has been verified and all your listings are now live
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsKycBannerDismissed(true)}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Dismiss verification banner"
          >
            <Cancel01Icon className="size-5 text-white" />
          </button>
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
