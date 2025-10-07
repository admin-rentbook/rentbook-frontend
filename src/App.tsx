import { RouterProvider } from '@tanstack/react-router';
import { APIProvider } from '@vis.gl/react-google-maps';
import router from './routes';
import { env } from './config';

function App() {
  return (
    <APIProvider apiKey={env.GOOGLE_MAPS_API_KEY}>
      <RouterProvider router={router} />
    </APIProvider>
  );
}

export default App;
