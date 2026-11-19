import { useRouter } from 'expo-router';
import { SplashAnimation } from '@/components/splash/SplashAnimation';

export default function SplashScreen() {
  const router = useRouter();

  const handleComplete = () => {
    router.replace('/(auth)/welcome');
  };

  return <SplashAnimation onComplete={handleComplete} />;
}
