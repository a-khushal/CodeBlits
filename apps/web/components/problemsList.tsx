import React from 'react';
import ProblemCard, { Problem } from './ui/problemCard';

interface ProblemsListProps {
  problems: Problem[];
}

const ProblemsList: React.FC<ProblemsListProps> = ({ problems }) => {
  return (
    <div className="space-y-4">
      {problems.map((problem) => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  );
};

export default ProblemsList;