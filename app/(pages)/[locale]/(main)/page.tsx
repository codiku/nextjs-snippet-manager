import { readAllSnippet } from "@/app/api/snippet/service";
import { SnippetSearch } from "@/app/components/SnippetSearch/SnippetSearch";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
export default async function MainPage() {
  const { data: snippets } = await readAllSnippet();
  const messages = await getMessages();
  const t = await getTranslations("main");
  return (
    <NextIntlClientProvider messages={messages}>
      <SnippetSearch snippets={snippets} placeholder={t("searchPlaceholder")} />
    </NextIntlClientProvider>
  );
}
