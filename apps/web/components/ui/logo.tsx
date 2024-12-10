"use client"

import React from 'react';
import { Code2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter()

  return (
    <div className="flex items-center hover:cursor-pointer" onClick={() => router.push("/")}>
      <Code2Icon className="h-8 w-8 text-blue-600" />
      <span className="ml-2 text-xl font-bold text-gray-900">CodeBlits</span>
    </div>
  );
};

export default Logo;