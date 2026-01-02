import { Auth } from '@/features/auth';
import { AuthStoreProvider } from '@/features/auth/providers';
import { useTokenVerification } from '../hooks';
import { ListingsFilterProvider } from '../providers';
import { GetStartedModal } from './GetStartedModal';
import { Header } from './Header';
import { Listings } from './Listings';

export const LandingPage = () => {
  // Handle token verification from URL search params
  useTokenVerification();

  return (
    <>
      <GetStartedModal />
      <AuthStoreProvider>
        <Auth />
      </AuthStoreProvider>
      <ListingsFilterProvider>
        <div className="h-screen px-4 lg:px-8 flex flex-col py-5 gap-6">
          <Header />
          <Listings />
        </div>
      </ListingsFilterProvider>
    </>
  );
};
