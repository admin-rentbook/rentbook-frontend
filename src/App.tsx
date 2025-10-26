import { RouterProvider } from '@tanstack/react-router';
import { APIProvider } from '@vis.gl/react-google-maps';
import { env } from './config';
import router from './core/router';

function App() {
  return (
    <APIProvider apiKey={env.GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <RouterProvider router={router} />
    </APIProvider>
  );
}

export default App;
