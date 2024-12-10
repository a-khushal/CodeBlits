"use client"

import React from 'react';
import AuthButton from './authButton';
import { signIn, signOut, useSession } from 'next-auth/react';

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  const session = useSession()
  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } md:hidden bg-white border-t border-gray-200`}
    >
      <div className="px-4 py-3 space-y-2">
      {
        session?.status === "unauthenticated" ? 
        <div className="w-full">
          <AuthButton onClick={() =>  signIn()} variant="primary" href="">
            Sign in
          </AuthButton>
        </div>
        : 
        session?.status === "authenticated" ?
        <div className="w-full">
          <AuthButton onClick={() => signOut()} variant="danger" href="">
              Log out
          </AuthButton>
        </div>
        :
        ""
      }
      </div>
    </div>
  );
};

export default MobileMenu;