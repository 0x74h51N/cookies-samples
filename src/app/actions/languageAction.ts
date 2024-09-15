"use server";

import { cookies } from "next/headers";

const languages = ["en", "de", "tr"] as const;
export type Languages = (typeof languages)[number];

export async function setLanguage(
  language: Languages
): Promise<{ success: boolean }> {
  try {
    if (languages.includes(language)) {
      cookies().set("userLanguage", language, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        secure: process.env.NODE_ENV === "production",
      });
      return { success: true };
    } else return { success: false };
  } catch (error) {
    console.log("Set language error:", error);
    return { success: false };
  }
}

export async function getLanguage(): Promise<Languages | null> {
  try {
    const cookie = cookies().get("userLanguage");
    if (languages.includes(cookie?.value as Languages)) {
      return cookie!.value as Languages;
    } else return null;
  } catch (error) {
    console.log("Language cookie error", error);
    return null;
  }
}
