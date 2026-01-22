'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { SignInModal } from './auth/sign-in-modal'
import { usePathname } from 'next/navigation'
import { Menu, Moon, Sun, X } from 'lucide-react'

export function Navbar() {
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldUseDark = storedTheme ? storedTheme === 'dark' : prefersDark
    document.documentElement.classList.toggle('dark', shouldUseDark)
    setIsDarkMode(shouldUseDark)
  }, [])

  const toggleTheme = () => {
    const nextIsDark = !isDarkMode
    document.documentElement.classList.toggle('dark', nextIsDark)
    localStorage.setItem('theme', nextIsDark ? 'dark' : 'light')
    setIsDarkMode(nextIsDark)
  }

  return (
    <nav className="bg-white/80 dark:bg-white/5 backdrop-blur-lg border-b border-slate-200/60 dark:border-white/10 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-slate-900 dark:text-white text-xl font-bold">
              BlockEstate
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/properties" 
              className={`text-slate-600 hover:text-slate-900 dark:text-gray-200 dark:hover:text-white font-medium transition-colors ${isActive('/properties') ? 'text-slate-900 dark:text-white' : ''}`}
            >
              Properties
            </Link>
            <Link 
              href="/how-it-works" 
              className={`text-slate-600 hover:text-slate-900 dark:text-gray-200 dark:hover:text-white font-medium transition-colors ${isActive('/how-it-works') ? 'text-slate-900 dark:text-white' : ''}`}
            >
              How it Works
            </Link>
            <Link 
              href="/about" 
              className={`text-slate-600 hover:text-slate-900 dark:text-gray-200 dark:hover:text-white font-medium transition-colors ${isActive('/about') ? 'text-slate-900 dark:text-white' : ''}`}
            >
              About
            </Link>
            
            <Button 
              variant="outline" 
              className="bg-slate-900/5 border-slate-200 hover:bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:border-white/20 dark:hover:bg-white/20 dark:text-white font-medium"
              onClick={() => setIsSignInOpen(true)}
            >
              Sign In
            </Button>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="relative inline-flex h-8 w-14 items-center rounded-full bg-slate-200 dark:bg-slate-700 transition-colors duration-300"
            >
              <span className="absolute left-2 text-amber-500">
                <Sun className="h-4 w-4" />
              </span>
              <span className="absolute right-2 text-slate-200">
                <Moon className="h-4 w-4" />
              </span>
              <span
                className={`inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow transition-transform duration-300 ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 dark:text-gray-200 dark:hover:text-white p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-t border-slate-200/60 dark:border-white/10">
          <div className="px-4 pt-2 pb-3 space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-slate-600 dark:text-gray-200">Theme</span>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="relative inline-flex h-8 w-14 items-center rounded-full bg-slate-200 dark:bg-slate-700 transition-colors duration-300"
              >
                <span className="absolute left-2 text-amber-500">
                  <Sun className="h-4 w-4" />
                </span>
                <span className="absolute right-2 text-slate-200">
                  <Moon className="h-4 w-4" />
                </span>
                <span
                  className={`inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow transition-transform duration-300 ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <Link 
              href="/properties" 
              className={`block text-slate-600 hover:text-slate-900 dark:text-gray-200 dark:hover:text-white font-medium transition-colors py-2 ${isActive('/properties') ? 'text-slate-900 dark:text-white' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Properties
            </Link>
            <Link 
              href="/how-it-works" 
              className={`block text-slate-600 hover:text-slate-900 dark:text-gray-200 dark:hover:text-white font-medium transition-colors py-2 ${isActive('/how-it-works') ? 'text-slate-900 dark:text-white' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link 
              href="/about" 
              className={`block text-slate-600 hover:text-slate-900 dark:text-gray-200 dark:hover:text-white font-medium transition-colors py-2 ${isActive('/about') ? 'text-slate-900 dark:text-white' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Button 
              variant="outline" 
              className="w-full bg-slate-900/5 border-slate-200 hover:bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:border-white/20 dark:hover:bg-white/20 dark:text-white font-medium mt-2"
              onClick={() => {
                setIsSignInOpen(true)
                setIsMobileMenuOpen(false)
              }}
            >
              Sign In
            </Button>
          </div>
        </div>
      )}

      <SignInModal 
        isOpen={isSignInOpen} 
        onClose={() => setIsSignInOpen(false)} 
      />
    </nav>
  )
} 