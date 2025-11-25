import { SessionProvider, useSession } from '../contexts/SessionContext';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

const AppLayout = () => {
  const { session, isLoading } = useSession();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inTabsGroup = segments[0] === '(tabs)';

    if (session && !inTabsGroup) {
      router.replace('/home');
    } else if (!session && inTabsGroup) {
      router.replace('/login');
    }
  }, [session, isLoading, segments, router]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <SessionProvider>
      <AppLayout />
    </SessionProvider>
  );
}
