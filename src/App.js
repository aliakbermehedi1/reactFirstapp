import { RouterProvider, createBrowserRouter } from "react-router-dom";
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme CSS
import 'primereact/resources/primereact.min.css'; // PrimeReact CSS
import 'primeicons/primeicons.css'; // PrimeIcons CSS

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Booking from "./components/Booking";
import './index.css'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar /> <Home />
        </>
      ),
    },
    {
      path: "/booking",
      element: (
        <>
          <Navbar /> <Booking />
        </>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
