import { Box } from "@/components/atoms/layout";
import Footer from "@/components/atoms/layout/footer";
import Header from "@/components/atoms/layout/header";
import { Spinner } from "@/components/atoms/spinner/spinner";
import AboutPage from "@/pages/about";
import FrontPage from "@/pages/front-page";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Lazy load the QBankPage

// Create a client
const queryClient = new QueryClient();

import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Box className="min-h-[calc(100vh-100px)]">
            <Suspense fallback={<Spinner className={`text-[#377fcc]`} />}>
              <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </Suspense>
          </Box>
          <Footer />
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
