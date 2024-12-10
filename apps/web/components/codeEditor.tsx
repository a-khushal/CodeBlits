import React from 'react';
import Editor from "@monaco-editor/react";
import { Play, Send } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
  onRun: () => void;
  onSubmit: () => void;
  output: string;
  isRunning: boolean;
  isSubmitting: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  onSubmit,
  output,
  isRunning,
  isSubmitting
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex space-x-2">
          <select
            className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            defaultValue="javascript"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onRun}
            disabled={isRunning}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <Play className="h-4 w-4 mr-2" />
            Run
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            <Send className="h-4 w-4 mr-2" />
            Submit
          </button>
        </div>
      </div>

      <div className="flex-1">
        <Editor
          height="60vh"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={onChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            tabSize: 2,
          }}
        />
      </div>

      <div className="h-48 border-t border-gray-200 bg-gray-50 p-4 overflow-y-auto">
        <pre className="font-mono text-sm text-gray-700 whitespace-pre-wrap">
          {output || 'Console output will appear here...'}
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor;