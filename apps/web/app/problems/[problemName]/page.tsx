"use client"

import React, { useState } from 'react';
import Split from 'react-split';
import { mockProblem } from './mockData';
import CodeEditor from '../../../components/codeEditor';
import ProblemDescription from '../../../components/problemDescription';

const ProblemPage: React.FC = () => {
  const [userCode, setUserCode] = useState(mockProblem.starterCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCodeChange = (value: string | undefined) => {
    setUserCode(value || '');
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running...');
    // Simulate code execution
    setTimeout(() => {
      setOutput('Test Case 1: Passed\nTest Case 2: Passed');
      setIsRunning(false);
    }, 1000);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setOutput('Submitting...');
    // Simulate submission
    setTimeout(() => {
      setOutput('All test cases passed! Solution accepted.');
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-4rem)] pt-3">
      <Split 
        className="split"
        sizes={[40, 60]}
        minSize={400}
        expandToMin={false}
        gutterSize={4}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
      >
        <div className="bg-white overflow-y-auto">
          <ProblemDescription problem={mockProblem} />
        </div>
        <div className="bg-white">
          <CodeEditor
            code={userCode}
            onChange={handleCodeChange}
            onRun={handleRun}
            onSubmit={handleSubmit}
            output={output}
            isRunning={isRunning}
            isSubmitting={isSubmitting}
          />
        </div>
      </Split>
    </div>
  );
};

export default ProblemPage;