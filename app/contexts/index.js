import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom'
import {ThemeProvider} from './theme';

const AppProviders = ({children}) => {
  return (
    <Router>
       <ThemeProvider>
         {children}
       </ThemeProvider>
    </Router>
  )
}

export default AppProviders;
