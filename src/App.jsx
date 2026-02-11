import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Router/Router";

// Main App component
function App() {
  return (
    <div className="min-vh-100 bg-light">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
