import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  const sections = [
    "controller",
    "data",
    "purpose",
    "retention",
    "rights",
    "security",
    "contact",
  ] as const;

  return (
    <div>
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden px-4 text-center">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, oklch(55% 0.12 190 / 0.08), oklch(55% 0.12 190 / 0.02))" }} />
        <div className="relative z-10 max-w-2xl">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl" style={{ color: "var(--color-primary-dark)" }}>{t("title")}</h1>
          <p className="text-sm opacity-60">{t("updated")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s}>
              <h2 className="mb-3 text-xl font-semibold" style={{ color: "var(--color-primary-dark)" }}>{t(`${s}_title`)}</h2>
              <p className="whitespace-pre-line leading-relaxed opacity-70">{t(`${s}_text`)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
