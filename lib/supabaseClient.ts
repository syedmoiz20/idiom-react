import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Buffer } from "buffer";

const supabaseUrl = "https://nspmbhsngphumvuueknv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zcG1iaHNuZ3BodW12dXVla252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwNTI4NTMsImV4cCI6MjAzMDYyODg1M30.VFyroKtMFKc5scQmqYdQvP1akgVW_3EUwov-Lzk4Vg8";

const STORIES_BUCKET = "stories";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export async function listStoriesRDB(generated: boolean) {
  const { data: stories, error } = await supabase
    .from("stories")
    .select("story_title")
    .eq("generated", generated);
  if (error) console.error(error);
  if (!stories) return [];
  return stories.map((story) => story.story_title);
}

export async function getStoryRDB(storyTitle: string): Promise<string> {
  const { data: stories, error } = await supabase
    .from("stories")
    .select("story_text")
    .eq("story_title", storyTitle);
  if (error) console.error(error);
  if (!stories) return "";
  return stories[0].story_text;
}

export async function uploadStoryRDB(
  text: string,
  title: string,
  generated: boolean
) {
  const uid = (await supabase.auth.getUser()).data.user?.id as string;
  const { error } = await supabase.from("stories").insert([
    {
      story_title: text,
      story_text: title,
      generated: generated,
      user_id: uid,
    },
  ]);
  if (error) console.error(error);
}

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
