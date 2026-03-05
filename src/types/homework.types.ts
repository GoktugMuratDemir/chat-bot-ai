/**
 * Homework Types - Ödev ve skorlarla ilgili tip tanımlamaları
 */

/**
 * Homework Score Response Type
 */
export interface HomeworkScoreResponse {
  examScore: number;
  quizScore: number;
  skillsScore: number;
  readScore: number;
  writeScore: number;
  speakingScore: number;
  listeningScore: number;
}
