"use client";

import { useEffect, useState } from "react";

function getThemeForTime(): "light" | "dark" {
  const hour = new Date().getHours();
  // 5am-5pm = light, 5pm-5am = dark
  return hour >= 5 && hour < 17 ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getThemeForTime());
    setMounted(true);

    // Check every minute for theme changes
    const interval = setInterval(() => {
      setTheme(getThemeForTime());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      {children}
    </div>
  );
}
