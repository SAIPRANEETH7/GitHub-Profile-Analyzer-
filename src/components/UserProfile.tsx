import { MapPin, Link as LinkIcon, Calendar, Users, GitFork, Star } from 'lucide-react';
import { GitHubUser } from '../types/github';

interface UserProfileProps {
  user: GitHubUser;
}

export function UserProfile({ user }: UserProfileProps) {
  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-4xl">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <img
            src={user.avatar_url}
            alt={user.name}
            className="w-40 h-40 rounded-3xl shadow-md object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{user.name || user.login}</h1>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              @{user.login}
            </a>
          </div>

          {user.bio && <p className="text-gray-700 mb-4 leading-relaxed">{user.bio}</p>}

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
            {user.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
            )}
            {user.blog && (
              <a
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-blue-600 transition-colors"
              >
                <LinkIcon className="w-4 h-4" />
                <span>{user.blog}</span>
              </a>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Joined {joinDate}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={GitFork} label="Repositories" value={user.public_repos} />
            <StatCard icon={Users} label="Followers" value={user.followers} />
            <StatCard icon={Star} label="Following" value={user.following} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
}

function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 text-center">
      <Icon className="w-5 h-5 mx-auto mb-2 text-blue-600" />
      <div className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</div>
      <div className="text-xs text-gray-600 font-medium">{label}</div>
    </div>
  );
}
