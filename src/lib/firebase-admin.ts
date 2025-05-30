// IDトークンを検証

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const adminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (!getApps().length) {
  initializeApp({
    credential: cert(adminConfig),
    // storageBucket: '프로젝트-id.appspot.com' // 필요 시 추가
  });
}

export const adminAuth = getAuth(); // ID 토큰 검증용
