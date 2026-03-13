import axios from "axios";

const USERNAME = "Praveen-Singh0";

const headers = {
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

// ── GraphQL query for real contribution calendar ──
const CONTRIBUTIONS_QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

export const getGithubOverview = async (req, res) => {
  try {
    // 1️⃣ Get user profile
    const userRes = await axios.get(
      `https://api.github.com/users/${USERNAME}`,
      { headers },
    );

    // 2️⃣ Get repositories
    const repoRes = await axios.get(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
      { headers },
    );

    const repos = repoRes.data;

    const topRepos = repos.slice(0, 6);

    // 4️⃣ Get commits for each repo
    const commits = await Promise.all(
      topRepos.map(async (repo) => {
        const commitRes = await axios.get(
          `https://api.github.com/repos/${USERNAME}/${repo.name}/commits?per_page=10`,
          { headers },
        );

        return commitRes.data.map((commit) => ({
          ...commit,
          repoName: repo.name,
          commitDate: commit.commit.author.date,
        }));
      }),
    );

    const allCommits = commits.flat();

    const latestCommits = allCommits
      .sort((a, b) => new Date(b.commitDate) - new Date(a.commitDate))
      .slice(0, 20);

    const graphqlRes = await axios.post(
      "https://api.github.com/graphql",
      {
        query: CONTRIBUTIONS_QUERY,
        variables: { login: USERNAME },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    const contributionCalendar =
      graphqlRes.data.data.user.contributionsCollection.contributionCalendar;

    res.status(200).json({
      success: true,
      user: userRes.data,
      repos,
      commits: latestCommits,
      contributionCalendar,
    });
  } catch (error) {
    console.error("GitHub API Error:", error.message);

    res.status(500).json({
      success: false,
      message: "GitHub API failed",
    });
  }
};
