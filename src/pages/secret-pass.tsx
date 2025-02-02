import BrandLogo from "@/components/atoms/brand-logo";
import { Box } from "@/components/atoms/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_CONFIG } from "@/constants/app-config";
import { setCookie } from "@/utils/cookie-utils";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SecretPassPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  console.log(APP_CONFIG.secretPass);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === APP_CONFIG.secretPass) {
      setCookie(APP_CONFIG.secretPassCookie, password);
      navigate("/");
    } else {
      toast.error("Invalid password");
    }
  };

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen gap-4 px-6">
      <BrandLogo className="size-16" />
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <Input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter secret password"
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Box>
  );
}
