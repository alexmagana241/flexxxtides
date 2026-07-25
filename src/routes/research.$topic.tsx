import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, FileText, FlaskConical, HardHat, Recycle, ShieldCheck, TestTube } from "lucide-react";
import type { ComponentType } from "react";
import { Layout } from "@/components/Layout";
import { ResearchUseNotice } from "@/components/ResearchUseNotice";
import { BRAND } from "@/lib/compliance";
import { articles, getArticle, type LibraryArticle, type LibraryIcon, type LibrarySection } from "@/data/library";

const iconMap: Record<LibraryIcon, ComponentType<{ className?: string }>> = {
  FileText, TestTube, ShieldCheck, HardHat, FlaskConical, Recycle, BookOpen,
};

export const Route = createFileRoute("/research/$topic")({
  loader: ({ params }): { article: LibraryArticle } => {
    const article = getArticle(params.topic);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    const a = loaderData?.article;
    const title = a ? `${a.title} — Research Library | BIOHACKERS` : "Research Library";
    const desc = a ? a.summary : "BIOHACKERS Research Library article.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${BRAND.domain}/research-library/${params.topic}` },
      ],
      links: [{ rel: "canonical", href: `${BRAND.domain}/research-library/${params.topic}` }],
    };
  },
  component: TopicPage,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <Link to="/research-library" className="mt-6 inline-block text-primary hover:underline">← Back to Research Library</Link>
      </div>
    </Layout>
  ),
});

function TopicPage() {
  const { article: a } = Route.useLoaderData() as { article: LibraryArticle };
  const Icon = iconMap[a.icon];
  const others = articles.filter((x) => x.slug !== a.slug).slice(0, 4);

  return (
    <Layout>
      <article>
        <section className="bg-hero border-b border-border">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14">
            <Link to="/research-library" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3 w-3" /> Back to Research Library
            </Link>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-10 w-10 rounded-md bg-primary/10 text-primary grid place-items-center">
                <Icon className="h-5 w-5" />
              </span>
              <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Research Library article</p>
            </div>
            <h1 className="mt-3 text-4xl font-bold tracking-tight">{a.title}</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">{a.summary}</p>
            <div className="mt-6"><ResearchUseNotice variant="callout" /></div>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          {a.sections.map((s: LibrarySection) => (
            <section key={s.heading}>
              <h2 className="text-xl font-bold tracking-tight">{s.heading}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {s.paragraphs.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {s.bullets && (
                <ul className="mt-4 grid gap-2 text-sm">
                  {s.bullets.map((b: string) => (
                    <li key={b} className="rounded-md border border-border bg-card p-3">{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {a.furtherReading && (
            <section className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider">Further reading</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {a.furtherReading.map((r: string) => (
                  <li key={r} className="border-l-2 border-border pl-3">{r}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-muted-foreground italic">
                These references are provided for laboratory-practice context and are not
                claims about the safety, efficacy, or suitability of any specific material
                for use in or on humans or animals.
              </p>
            </section>
          )}

          <section className="border-t border-border pt-8">
            <h3 className="text-sm font-semibold mb-4">Other articles</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {others.map((x) => (
                <Link
                  key={x.slug}
                  to="/research/$topic"
                  params={{ topic: x.slug }}
                  className="rounded-md border border-border bg-card p-3 text-sm hover:bg-muted"
                >
                  {x.title}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </Layout>
  );
}
