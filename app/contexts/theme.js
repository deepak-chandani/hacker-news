import React from 'react'

const ThemeContext = React.createContext(null);

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = React.useState("light");

  const toggleTheme = React.useCallback(() => {
    setTheme((theme) => {
      return theme === 'light' ? 'dark': 'light';
    })
  }, [theme]);

  const value = React.useMemo(() => {
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


