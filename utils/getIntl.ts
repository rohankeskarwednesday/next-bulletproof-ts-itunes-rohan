import { createIntl, createIntlCache } from "react-intl";
import en from "../translations/en.json";
import hi from "../translations/hi.json";

export default function getIntl() {
  const userLang = navigator.language;

  console.log(userLang);

  return createIntl(
    {
      locale: "en",
      messages: en,
    },

    createIntlCache()
  );
}
