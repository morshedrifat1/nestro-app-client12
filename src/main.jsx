import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/authcontext/AuthProvider.jsx";
import ThemeProvider from "./context/themeContext/ThemeProvider.jsx";
import "./index.css";
import { router } from "./routes/Routes.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
