import { View, Text } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import { useStore } from "@/context/store";

export default function Index() {
  const loadSessionId = useStore((s) => s.loadSessionId);
  const sessionId = useStore((s) => s.sessionId);

  useEffect(() => {
    const init = async () => {
      await loadSessionId();
    };
    init();
  }, []);

  useEffect(() => {
    if (sessionId !== null) {
      if (sessionId) {
        router.replace("/(tabs)"); // logged in
      } else {
        router.replace("/auth/login"); // not logged in
      }
    }
  }, [sessionId]);

  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}
