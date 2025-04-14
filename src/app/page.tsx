'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 🛠️ 로그인 기능이 생기면 아래 조건문으로 분기 가능
    // const isLoggedIn = checkLogin(); // 예: localStorage, session, cookie 등
    // if (isLoggedIn) {
    //   router.replace('/map');
    // } else {
    //   router.replace('/login');
    // }

    // 🔁 현재는 로그인 고려 없이 무조건 /map으로 이동
    router.replace('/map');
  }, [router]);

  return null;
}