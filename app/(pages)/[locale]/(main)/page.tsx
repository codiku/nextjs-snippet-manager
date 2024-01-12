import { readAllSnippet } from "@/app/api/snippet/service";
import { SnippetSearch } from "@/app/components/SnippetSearch/SnippetSearch";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

export default async function MainPage() {
  const { data: snippets } = await readAllSnippet();
  const t = await getTranslations("main");
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <SnippetSearch snippets={snippets} placeholder={t("searchPlaceholder")} />
    </NextIntlClientProvider>
  );
}
