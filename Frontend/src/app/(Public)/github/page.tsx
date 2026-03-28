import GitHubPageClient from "./GitHubPageClient";

export const dynamic = "force-dynamic"; //
export const revalidate = 3600;

async function getGithubData() {
  try {
    const API = process.env.NEXT_PUBLIC_API_URL;

    if (!API) {
      throw new Error("API URL not defined");
    }

    const res = await fetch(`${API}/github/overview`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("GitHub API error:", text);

      return null;
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("GitHub fetch failed:", error);

    // 🔥 fallback
    return null;
  }
}

export default async function Page() {
  const data = await getGithubData();

  return (
    <GitHubPageClient
      initialUser={data?.user || null}
      initialRepos={data?.repos || []}
      initialCommits={data?.commits || []}
      initialContributionCalendar={data?.contributionCalendar || []}
    />
  );
}