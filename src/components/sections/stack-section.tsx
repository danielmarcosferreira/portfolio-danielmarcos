import { Code2, Server, Users } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

const columnKeys = ["languages", "fullStack", "leadership"] as const;
const icons = {
  languages: Code2,
  fullStack: Server,
  leadership: Users,
} as const;

export async function StackSection({ locale }: { locale: string }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "stack" });

  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">
            {t("kicker")}
          </p>
          <h2
            id="stack-heading"
            className="mt-4 font-heading text-4xl tracking-tight text-foreground sm:text-5xl"
          >
            {t("title")}
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          {columnKeys.map((key) => {
            const Icon = icons[key];
            const col = t.raw(`columns.${key}`) as {
              title: string;
              items: string[];
            };
            return (
              <div
                key={key}
                className="border border-border/80 bg-card/30 p-6 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <Icon className="size-5 text-accent" aria-hidden />
                  <h3 className="font-heading text-2xl tracking-tight text-foreground">
                    {col.title}
                  </h3>
                </div>
                <ul className="mt-6 space-y-3 font-mono text-sm text-muted-foreground">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 border-l border-border pl-3 text-foreground/90"
                    >
                      <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                        —
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
