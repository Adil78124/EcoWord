import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProblemDetailView } from "@/components/problems/ProblemDetailView";
import {
  PROBLEMS_BY_SLUG,
  PROBLEM_SLUGS,
  type ProblemSlug,
} from "@/lib/problems-detail";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROBLEM_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const problem = PROBLEMS_BY_SLUG[slug as ProblemSlug];
  if (!problem) {
    return { title: "EcoWorld" };
  }
  return {
    title: problem.metaTitle,
    description: problem.metaDescription,
  };
}

export default async function ProblemDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (!PROBLEM_SLUGS.includes(slug as ProblemSlug)) {
    notFound();
  }
  return <ProblemDetailView slug={slug as ProblemSlug} />;
}
