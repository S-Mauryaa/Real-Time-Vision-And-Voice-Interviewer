import type { InterviewScore } from '@/types';

export const mockScores: Record<string, InterviewScore> = {
  'int-001': {
    interviewId: 'int-001',
    overall: 82,
    technical: 85,
    communication: 80,
    problemSolving: 88,
    confidence: 75,
    feedback:
      "Alex demonstrated strong React expertise and excellent problem-solving skills. Communication was clear and well-structured. To improve, work on system design articulation and reducing hesitation when discussing trade-offs.",
    strengths: [
      'Deep React & TypeScript knowledge',
      'Clean, efficient problem-solving approach',
      'Strong algorithmic thinking',
    ],
    improvements: [
      'Expand system design articulation',
      'Improve confidence when discussing unfamiliar topics',
    ],
    recommendation: 'yes',
    breakdown: [
      { category: 'React & Frontend', score: 43, maxScore: 50, notes: 'Excellent component architecture knowledge' },
      { category: 'Algorithms', score: 22, maxScore: 25, notes: 'Solved all problems efficiently' },
      { category: 'System Design', score: 17, maxScore: 25, notes: 'Good fundamentals, needs more depth' },
    ],
  },
  'int-003': {
    interviewId: 'int-003',
    overall: 68,
    technical: 72,
    communication: 65,
    problemSolving: 70,
    confidence: 65,
    feedback:
      'Jordan showed solid Python fundamentals and good SQL knowledge. Communication could be more concise. Recommend additional practice with complex joins and query optimization.',
    strengths: ['Solid Python skills', 'Good understanding of data pipelines'],
    improvements: ['SQL query optimization', 'More concise communication'],
    recommendation: 'maybe',
    breakdown: [
      { category: 'Python', score: 36, maxScore: 50, notes: 'Good fundamentals' },
      { category: 'SQL', score: 18, maxScore: 25, notes: 'Needs more practice with complex queries' },
      { category: 'Data Engineering', score: 14, maxScore: 25, notes: 'Basic understanding demonstrated' },
    ],
  },
};
