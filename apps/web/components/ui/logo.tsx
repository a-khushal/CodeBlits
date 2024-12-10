"use client"
import React from 'react';
import { Code2Icon } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <Code2Icon className="h-8 w-8 text-blue-600" />
      <span className="ml-2 text-xl font-bold text-gray-900">CodeBlits</span>
    </div>
  );
};

export default Logo;