import axios from "axios";
const USERNAME = "Praveen-Singh0";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});

const getUserProfile = async () => {
  const res = await githubApi.get(`/users/${USERNAME}`);
  return res.data;
};

const getRepos = async () => {
  const res = await githubApi.get(
    `/users/${USERNAME}/repos?per_page=100&sort=updated`
  );
  return res.data;
};

const getRepoCommits = async (repoName ) => {
  const res = await githubApi.get(
    `/repos/${USERNAME}/${repoName}/commits?per_page=10`
  );
  return res.data;
};

export {
  getUserProfile,
  getRepos,
  getRepoCommits,
};