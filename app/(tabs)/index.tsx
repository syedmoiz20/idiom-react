import { StyleSheet } from "react-native";

import HomePage from "../../components/HomePage";
import { Text, View } from "../../components/Themed";
import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "../../components/supabaseClient";
import Auth from "../../components/Auth";
import { Session } from "@supabase/supabase-js";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      {session && session.user && <Text>{session.user.email}</Text>}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <HomePage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
