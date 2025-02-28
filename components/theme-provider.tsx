"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

/**
 * ThemeProvider component that wraps the application to provide theme context
 * Features include:
 * - System theme detection
 * - Theme persistence across page reloads
 * - Smooth theme transitions
 * - Support for light/dark modes
 *
 * This component is a wrapper around next-themes' ThemeProvider with client-side rendering
 * enabled through the "use client" directive.
 *
 * @component
 * @param {ThemeProviderProps} props - Props from next-themes including children and theme options
 * @param {React.ReactNode} props.children - Child components that will have access to theme context
 * @returns {JSX.Element} A theme provider wrapper component
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
