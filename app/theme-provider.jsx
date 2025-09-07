'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children, ...props }) {
  // This component passes all the necessary theme context to your app.
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}