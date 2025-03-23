import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  attribute?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  systemTheme: "dark" | "light"
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  systemTheme: "light",
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  enableSystem = true,
  disableTransitionOnChange = false,
  attribute = "class",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme
  })

  const [systemTheme, setSystemTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "light"
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })

  // Handle system theme changes
  useEffect(() => {
    if (!enableSystem) return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light")
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [enableSystem])

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement

    // Remove transition class if disabled
    if (disableTransitionOnChange) {
      root.classList.add("no-transition")
    }

    // Remove existing theme classes
    root.classList.remove("light", "dark")

    // Apply new theme
    const currentTheme = theme === "system" ? systemTheme : theme
    root.classList.add(currentTheme)

    // Add theme attribute for CSS variables
    root.setAttribute(attribute, currentTheme)

    // Cleanup
    return () => {
      if (disableTransitionOnChange) {
        root.classList.remove("no-transition")
      }
      root.removeAttribute(attribute)
    }
  }, [theme, systemTheme, disableTransitionOnChange, attribute])

  // Handle theme changes
  const handleThemeChange = useCallback((newTheme: Theme) => {
    try {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    } catch (error) {
      console.error("Failed to save theme preference:", error)
      // Fallback to system theme if storage fails
      setTheme("system")
    }
  }, [storageKey])

  const value = {
    theme,
    setTheme: handleThemeChange,
    systemTheme,
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeProviderContext)
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  
  return context
} 