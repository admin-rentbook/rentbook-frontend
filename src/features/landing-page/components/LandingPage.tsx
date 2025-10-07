import { Hero } from './Hero';
import { MapComponent } from './MapComponent';

export const LandingPage = () => {
  return (
    <div className="h-screen px-5 flex flex-col items-center py-5 gap-3">
      <Hero />
      {/* <MapComponent /> */}
    </div>
  );
};
