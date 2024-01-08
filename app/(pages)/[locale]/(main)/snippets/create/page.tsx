import { FormCreateSnippet } from "@/app/components/FormCreateSnippet/FormCreateSnippet";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function CreateSnippetPage(p: {}) {
  const messages = useMessages() as IntlMessages;
  return (
    <NextIntlClientProvider messages={messages}>
      <FormCreateSnippet />
    </NextIntlClientProvider>
  );
}
