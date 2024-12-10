"use client"

import React from 'react';
import Logo from './ui/logo';
import NavLinks from './ui/navLinks';
import Link from 'next/link';

const AppBar = () => {
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // const toggleMobileMenu = () => {
  //   setIsMobileMenuOpen(!isMobileMenuOpen);
  // };

  return (
    <nav className="bg-white shadow-md border border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className='flex justify-center items-center gap-10'>
            <Logo />
            <Link
                href="/problems"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Problems
              </Link>
          </div>
          {/* Desktop Navigation */}
          <div>
            <NavLinks />
          </div>

          {/* Mobile Menu Button */}
          {/* <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div> */}
        </div>
      </div>

      {/* Mobile Menu */}
      {/* <MobileMenu isOpen={isMobileMenuOpen} /> */}
    </nav>
  );
};

export default AppBar;