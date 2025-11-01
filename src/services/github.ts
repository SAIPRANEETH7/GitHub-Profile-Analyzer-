import { GitHubUser, GitHubRepo } from '../types/github';

const GITHUB_API = 'https://api.github.com';

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`${GITHUB_API}/users/${username}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch user data');
  }

  return response.json();
}

export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(
    `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=6`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }

  return response.json();
}
