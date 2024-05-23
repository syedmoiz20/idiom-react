import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nspmbhsngphumvuueknv.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY as string;
const storiesBucket = process.env.STORIES_BUCKET as string;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export async function listStoriesRDB(generated: boolean) {
  const { data: stories, error } = await supabase
    .from(storiesBucket)
    .select("story_title")
    .eq("generated", generated);
  if (error) console.error(error);
  if (!stories) return [];
  return stories.map((story) => story.story_title);
}

export async function getStoryRDB(storyTitle: string): Promise<string> {
  const { data: stories, error } = await supabase
    .from(storiesBucket)
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
  const { error } = await supabase.from(storiesBucket).insert([
    {
      story_title: title,
      story_text: text,
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
