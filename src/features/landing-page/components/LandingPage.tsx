import { Auth } from '@/features/auth';
import { Header } from './Header';
import { Listings } from './Listings';

export const LandingPage = () => {
  return (
    <>
      <Auth />
      <div className="h-screen px-8 flex flex-col py-5 gap-6">
        <Header />
        <Listings />
      </div>
    </>
  );
};
   