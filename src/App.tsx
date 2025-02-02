import { Box } from "@/components/atoms/layout";
import Footer from "@/components/atoms/layout/footer";
import Header from "@/components/atoms/layout/header";
import FrontPage from "@/pages/front-page";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// Lazy load the QBankPage
const UsersPage = lazy(() => import("@/pages/users"));
const MissedWordsPage = lazy(() => import("@/pages/missed-words"));
const GameScorePage = lazy(() => import("@/pages/game-score"));

// Create a client
const queryClient = new QueryClient();

import { AuthProvider } from "@/components/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";
import TableSkeleton from "./components/atoms/skeletons/table-skeleton";
import SecretPassPage from "./pages/secret-pass";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Header />
            <Box className="min-h-[calc(100vh-100px)]">
              <Routes>
                <Route path="/secret-pass" element={<SecretPassPage />} />
                <Route path="/" element={<FrontPage />} />
                <Route
                  path="/users"
                  element={
                    <Suspense fallback={<TableSkeleton />}>
                      <UsersPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/missed-words"
                  element={
                    <Suspense fallback={<TableSkeleton />}>
                      <MissedWordsPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/game-score"
                  element={
                    <Suspense fallback={<TableSkeleton />}>
                      <GameScorePage />
                    </Suspense>
                  }
                />
              </Routes>
            </Box>
            <Footer />
            <Toaster />
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
