import { useState } from 'react';
import { Github } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { UserProfile } from './components/UserProfile';
import { RepositoryList } from './components/RepositoryList';
import { fetchGitHubUser, fetchUserRepos } from './services/github';
import { GitHubUser, GitHubRepo } from './types/github';

function App() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (username: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const [userData, reposData] = await Promise.all([
        fetchGitHubUser(username),
        fetchUserRepos(username),
      ]);

      setUser(userData);
      setRepos(reposData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setUser(null);
      setRepos([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex flex-col">
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Github className="w-12 h-12 text-gray-900" />
            <h1 className="text-5xl font-bold text-gray-900">GitHub Profile Analyzer</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Discover and analyze GitHub profiles with detailed insights
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl max-w-2xl w-full">
              <p className="font-medium">{error}</p>
            </div>
          )}

          {user && (
            <>
              <UserProfile user={user} />
              <RepositoryList repos={repos} />
            </>
          )}

          {!user && !error && !isLoading && (
            <div className="text-center text-gray-400 mt-12">
              <p className="text-base">Search for a GitHub username to view their profile</p>
            </div>
          )}
        </div>
      </div>

      <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-gray-600 text-sm">© 2025 Praneeth. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
