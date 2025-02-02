import { APP_CONFIG } from "@/constants/app-config";
import { getCookie } from "@/utils/cookie-utils";
import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const auth = getCookie(APP_CONFIG.secretPassCookie);
    if (!auth && location.pathname !== "/secret-pass") {
      navigate("/secret-pass");
    } else if (auth && auth !== APP_CONFIG.secretPass) {
      navigate("/secret-pass");
    }
  }, [navigate, location]);

  return <>{children}</>;
}
