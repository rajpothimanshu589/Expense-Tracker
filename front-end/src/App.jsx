import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Toaster } from "./components/ui/sonner";


const appRouter = createBrowserRouter([
  {
    path: "/", 
    element: <Home />
  },
  {
    path: "/Login", 
    element: <Login />
  },
  {
    path: "/Signup", 
    element: <Signup />
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
      <Toaster />
    </div>
  )

}

export default App
