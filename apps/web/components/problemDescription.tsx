import React from 'react';
import { Problem } from '../types/problem';

interface ProblemDescriptionProps {
  problem: Problem;
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  const difficultyColor = {
    Easy: 'text-green-600',
    Medium: 'text-yellow-600',
    Hard: 'text-red-600'
  };

  return (
    <div className="px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">{problem.title}</h1>
        <span className={`font-medium ${difficultyColor[problem.difficulty]}`}>
          {problem.difficulty}
        </span>
      </div>

      <div className="prose max-w-none">
        <div className="mb-8">
          <p className="text-gray-700 whitespace-pre-wrap">{problem.description}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Examples:</h3>
          {problem.examples.map((example, index) => (
            <div key={index} className="mb-6">
              <p className="font-medium text-gray-700">Example {index + 1}:</p>
              <div className="bg-gray-50 p-4 rounded-lg mt-2 space-y-2">
                <p><span className="font-medium">Input:</span> {example.input}</p>
                <p><span className="font-medium">Output:</span> {example.output}</p>
                {example.explanation && (
                  <p><span className="font-medium">Explanation:</span> {example.explanation}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Constraints:</h3>
          <ul className="list-disc pl-5 space-y-2">
            {problem.constraints.map((constraint, index) => (
              <li key={index} className="text-gray-700">{constraint}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;