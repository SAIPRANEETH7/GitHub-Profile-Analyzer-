import { Star, GitFork, ExternalLink } from 'lucide-react';
import { GitHubRepo } from '../types/github';

interface RepositoryListProps {
  repos: GitHubRepo[];
}

export function RepositoryList({ repos }: RepositoryListProps) {
  if (repos.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Repositories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

interface RepoCardProps {
  repo: GitHubRepo;
}

function RepoCard({ repo }: RepoCardProps) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          {repo.name}
          <ExternalLink className="w-4 h-4 text-gray-400" />
        </h3>
      </div>

      {repo.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{repo.description}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="w-4 h-4" />
            <span>{repo.forks_count}</span>
          </div>
        </div>

        {repo.language && (
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            {repo.language}
          </span>
        )}
      </div>
    </a>
  );
}
