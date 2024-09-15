"use client";

import {
  setLanguage,
  Languages,
  getLanguage,
} from "@/app/actions/languageAction";
import { useEffect, useState } from "react";

export default function LangMenu() {
  const [selectedLanguage, setSelectedLanguage] = useState<Languages | null>();

  useEffect(() => {
    /**
     * For client side get cookie example
     * Take the cookie with server action
     * If it not return null, set that cookie as a selectedLanguage
     * Else set the fallback language ('en')
     */
    const getCookie = async () => {
      const res = await getLanguage();
      if (res) {
        setSelectedLanguage(res);
      } else setSelectedLanguage("en");
    };
    /**
     * This function only run when first rendering
     */
    getCookie();
  }, []);

  const handleLang = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value as Languages;
    const res = await setLanguage(language);
    //We used the server action as a regular promise-returning function with await
    if (res.success) {
      /**
       * If the selected language input is processed by the server
       * correctly, you can handle i18n language changes or
       * [lang] routing operations after this check.
       */
      setSelectedLanguage(language);
    }
  };

  return (
    <select
      className="bg-transparent"
      id="language"
      value={selectedLanguage || "en"}
      onChange={handleLang}
    >
      <option value="en">English</option>
      <option value="tr">Türkçe</option>
      <option value="de">Deutsch</option>
    </select>
  );
}
