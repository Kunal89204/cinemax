import { useEffect } from "react";
import { router } from "expo-router";
import { useStore } from "@/context/store";

export default function Index() {
  const loadSessionId = useStore((s) => s.loadSessionId);
  const sessionId = useStore((s) => s.sessionId);
  const isSessionLoading = useStore((s) => s.isSessionLoading);

  // Load session on mount
  useEffect(() => {
    loadSessionId();
  }, []);

  // Redirect when session state changes
  useEffect(() => {
    if (!isSessionLoading) {
      router.replace(sessionId ? "/(tabs)" : "/auth/login");
    }
  }, [sessionId, isSessionLoading]);

  // Render nothing — this acts as a redirect screen
  return null;
}
