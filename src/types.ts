export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Platform = 'LeetCode' | 'Codeforces' | 'HackerRank' | 'GeeksForGeeks' | 'Aizu OJ' | 'AtCoder' | 'CodeChef' | 'CSES' | 'USACO' | 'VJudge' | 'Online Judge';

export interface Problem {
  id: string;
  name: string;
  difficulty: Difficulty;
  platform: Platform;
  link: string;
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  problems: Problem[];
}

export interface CertificateInfo {
  status: 'pending' | 'issued';
  recipientName: string;
  vjudgeId?: string;
  issuedAt?: number;
  topicSlug: string;
}

export interface UserStats {
  solvedIds: string[];
  solvedAt?: Record<string, number>; // problemId -> timestamp
  vjudgeId?: string;
  certificates: Record<string, CertificateInfo>;
  isAdmin?: boolean;
  xp: number;
  completedLessonIds: string[];
}

export type ExerciseType = 'multiple-choice' | 'fill-in-the-blank' | 'code-challenge';

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  options?: string[]; // For multiple-choice
  correctAnswer: string;
  inputTemplate?: string; // For code-challenge
  testCases?: { input: string; output: string }[]; // For code-challenge
  hint?: string;
}

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  content: string; // Markdown
  codeExample?: {
    language: string;
    code: string;
  };
  exercises: Exercise[];
  xpReward: number;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  lessons: Lesson[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}
