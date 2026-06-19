import { getTranslations } from "next-intl/server";
import { RealisationsGallery } from "@/components/RealisationsGallery";

type Props = { params: Promise<{ locale: string }> };
type RealisationItem = { title: string; desc: string; badge: string; img: string };

export default async function GaleriePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <div className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="mb-2 inline-block text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--color-primary)" }}>
            {locale === "fr" ? "Galerie" : "معرض"}
          </span>
          <h1 className="text-4xl font-bold md:text-5xl" style={{ color: "var(--color-primary-dark)" }}>
            {locale === "fr" ? "Nos Réalisations" : "إنجازاتنا"}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed opacity-70">
            {locale === "fr"
              ? "Découvrez l'ensemble de nos transformations dentaires. Chaque sourire est unique et chaque cas est traité avec la plus grande attention."
              : "اكتشف جميع تحولاتنا السنية. كل ابتسامة فريدة وكل حالة تعالج بأقصى عناية."}
          </p>
        </div>
        <RealisationsGallery items={t.raw("realisations") as RealisationItem[]} locale={locale} showViewAll={false} />
      </div>
    </div>
  );
}
