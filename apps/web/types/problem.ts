export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  createdAt: string;
  slug: string;
  description: string;
  examples: Example[];
  constraints: string[];
  starterCode: string;
  handlerFunction: string;
}