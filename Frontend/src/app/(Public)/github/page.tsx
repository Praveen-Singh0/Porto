import GitHubPageClient from "./GitHubPageClient";

export const revalidate = 3600;

async function getGithubData() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API}/github/overview`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("GitHub API error:", text);
    throw new Error("Failed to fetch GitHub data");
  }

  const data = await res.json();
  console.log("GitHub API response:", data);

  return data;
}

export default async function Page() {
  const data = await getGithubData();

  return (
    <GitHubPageClient
      initialUser={data.user}
      initialRepos={data.repos}
      initialCommits={data.commits}
      initialContributionCalendar={data.contributionCalendar}
    />
  );
}