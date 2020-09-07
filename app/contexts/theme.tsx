import * as React from 'react'

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType>(null);

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = React.useState("light");

  const toggleTheme = React.useCallback(() => {
    setTheme((theme) => {
      return theme === 'light' ? 'dark': 'light';
    })
  }, [theme]);

  const value = React.useMemo<ThemeContextType>(() => {
    return {
      theme,
      toggleTheme,
    }
  }, [theme, toggleTheme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
};

/**
 * hook to consume theme & register for changes
 */
const useTheme = () => {
  return React.useContext(ThemeContext);
}

const ThemeConsumer = ThemeContext.Consumer;
export {
  useTheme,
  ThemeProvider,
  ThemeConsumer
}


