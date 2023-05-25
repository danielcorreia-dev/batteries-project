import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const useRedirect = (redirectPath: string) => {
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleRedirect = () => {
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
    }

    router.push(redirectPath);
  };

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  return { handleRedirect };
};

export default useRedirect;
