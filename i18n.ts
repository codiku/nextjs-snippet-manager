import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const LOCALES = ["en", "fr"];
export const DEFAULT_LOCALE = "en";

export default getRequestConfig(async ({ locale }) => {
  if (!LOCALES.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
