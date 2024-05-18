import { RouterProvider, createBrowserRouter } from "react-router-dom";
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme CSS
import 'primereact/resources/primereact.min.css'; // PrimeReact CSS
import 'primeicons/primeicons.css'; // PrimeIcons CSS

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Booking from "./components/Booking";
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

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
      <ToastContainer />
    </div>
  );
}

export default App;
