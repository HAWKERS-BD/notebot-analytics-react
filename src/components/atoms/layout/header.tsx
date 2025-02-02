import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { APP_CONFIG, APP_HEADER_MENU } from "@/constants/app-config";
import { Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";

import BrandLogo from "@/components/atoms/brand-logo";
import HeaderLinkMobile from "@/components/atoms/header-link-mobile";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Box } from "./box";

const menuItems = APP_HEADER_MENU;

function Header() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const handleCloseSheet = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 flex items-center h-16 gap-4 px-4 border-b bg-background md:px-6">
      <BrandLogo className="block w-12 h-12 mr-auto" />
      <Box className="flex items-center gap-4 ml-auto md:ml-auto md:gap-2 lg:gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="ml-auto shrink-0">
              <Menu className="w-5 h-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className={cn("grid gap-6 text-lg")}>
              <BrandLogo
                className="w-auto h-auto mb-10"
                logo={APP_CONFIG.logoIcon}
                width={92}
                height={92}
              />
              {menuItems.map(item => (
                <HeaderLinkMobile
                  key={item?.label}
                  item={item}
                  onSelect={handleCloseSheet}
                />
              ))}
            </nav>
            {/* <Box className="absolute flex items-center gap-1 bottom-5 right-5">
              <TextEffect>Platform Status: </TextEffect>
              {botStatus}
            </Box> */}
          </SheetContent>
        </Sheet>
      </Box>
    </header>
  );
}

export default Header;
