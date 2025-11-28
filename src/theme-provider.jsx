import { ThemeProvider } from 'next-themes'
import React, { children } from 'react'

const AppThemeProvider = ({children}) => {
  return (
    <ThemeProvider attribute="class" defaultTheme='light' enableSystem>
        {children}
    </ThemeProvider>
  );
}

export default AppThemeProvider