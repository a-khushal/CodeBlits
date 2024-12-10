import React from 'react';
import { Brain } from 'lucide-react';
import ProblemsList from '../../components/problemsList';
import { Problem } from '../../components/ui/problemCard';

const mockProblems: Problem[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    createdAt: '2024-03-15T10:00:00Z',
    slug: 'two-sum'
  },
  {
    id: '2',
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    createdAt: '2024-03-14T15:30:00Z',
    slug: 'add-two-numbers'
  },
  {
    id: '3',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    createdAt: '2024-03-13T09:15:00Z',
    slug: 'median-of-two-sorted-arrays'
  }
];

const ProblemsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center">
          <Brain className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Coding Problems</h1>
        </div>
        <p className="mt-2 text-gray-600">
          Explore our collection of coding challenges to improve your skills
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">All Problems</h2>
            <div className="flex space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-600">
                Easy
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-50 text-yellow-600">
                Medium
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-600">
                Hard
              </span>
            </div>
          </div>
        </div>
        
        <ProblemsList problems={mockProblems} />
      </div>
    </div>
  );
};

export default ProblemsPage;