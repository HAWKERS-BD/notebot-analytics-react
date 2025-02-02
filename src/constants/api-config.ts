export const BASE_URL = import.meta.env.VITE_API_URL;
export const API_CONFIG = {
  PLATFORM_STATUS: `${BASE_URL}`,
  BOT_STATUS: `https://notebot-eng-v1.onrender.com`,
  NOTES_ROOT: `${BASE_URL}/app/notes`,
  NOTES_LEVEL: (level: number | string) => `${API_CONFIG.NOTES_ROOT}/${level}`,
  NOTES_SUBJECT_DETAILS: (level: number | string, subject: string) =>
    `${API_CONFIG.NOTES_LEVEL(level)}/${subject}`,
  NOTES_SUBJECT_TOPIC_DETAILS: (
    level: number | string,
    subject: string,
    topic: string
  ) => `${API_CONFIG.NOTES_SUBJECT_DETAILS(level, subject)}/${topic}`,
  LAB_REPORTS_ROOT: `${BASE_URL}/app/labs`,
  LAB_REPORTS_LEVEL: (level: number | string) =>
    `${API_CONFIG.LAB_REPORTS_ROOT}/${level}`,
  LAB_REPORTS_SUBJECT_DETAILS: (level: number | string, subject: string) =>
    `${API_CONFIG.LAB_REPORTS_LEVEL(level)}/${subject}`,
  LAB_REPORTS_SUBJECT_TOPIC_DETAILS: (
    level: number | string,
    subject: string,
    topic: string
  ) => `${API_CONFIG.LAB_REPORTS_SUBJECT_DETAILS(level, subject)}/${topic}`,
  SYLLABUS_ROOT: `${BASE_URL}/app/syllabus`,
  SYLLABUS_BATCH: (batch: number | string) =>
    `${API_CONFIG.SYLLABUS_ROOT}/${batch}`,
  SYLLABUS_BATCH_DEPT: (batch: number | string, dept: string) =>
    `${API_CONFIG.SYLLABUS_BATCH(batch)}/${dept}`,
  RESULTS: `${BASE_URL}/results`,
  JOKES: `${BASE_URL}/app/jokes`,
  DAILY_REPORT_SUMMARY: `${BASE_URL}/daily_report/summary`,
  DAILY_REPORT: `${BASE_URL}/daily_report`,
  TOP_NOTES: `${BASE_URL}/notes/top`,
  TOP_LABS: `${BASE_URL}/labs/top`,
  GAME_SCORES: `${BASE_URL}/games/notebird`,
  APP_USERS: `${BASE_URL}/users/app`,
  MISSED_WORDS: `${BASE_URL}/missed`,
};
