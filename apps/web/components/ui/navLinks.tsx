"use client"

import React from 'react';
import AuthButton from './authButton';
import { signIn, signOut, useSession } from 'next-auth/react';

const NavLinks = () => {
  const session = useSession()

  return (
    <div className="flex items-center space-x-4">
      {/* {JSON.stringify(session)} */}
      {
        session?.status === "unauthenticated" ? 
          <AuthButton onClick={() =>  signIn()} variant="primary" href="">
            Sign in
          </AuthButton>
        : 
        session?.status === "authenticated" ?
          <AuthButton onClick={() => signOut()} variant="danger" href="">
              Log out
          </AuthButton> :
        ""
      }
    </div>
  );
};

export default NavLinks;