import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes'
import React from 'react'

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
  return (
    <button
    onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
    className='p-2 rounded-full hover:bg-black/70 dark:hover:bg-white/70 transition-colors duration-300 '
    >
     {
        theme == "dark" ? (
        <Sun className='w-5 h-5 text-yellow-400'/> )
        : (
        <Moon className='w-5 h-5 text-black' />
        )
     }
    </button>
  )
}

export default ThemeToggle