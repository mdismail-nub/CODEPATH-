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
  vjudgeId: string;
  issuedAt?: number;
  topicSlug: string;
}

export interface UserStats {
  solvedIds: string[];
  solvedAt?: Record<string, number>; // problemId -> timestamp
  vjudgeId?: string;
  certificates: Record<string, CertificateInfo>;
  isAdmin?: boolean;
}
