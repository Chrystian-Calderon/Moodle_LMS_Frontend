import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router";
import { ErrorBoundary } from "@/components/common/app/ErrorBoundary";

import { ToastContainer } from "react-toastify"

function App() {
  return (
    <ErrorBoundary>
      <div className="overflow-auto font-sans">
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </ErrorBoundary>
  )
}

export default App