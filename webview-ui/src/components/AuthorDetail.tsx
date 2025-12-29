import { X } from 'lucide-react';
import { ProgressStick } from './ProgressStick';

interface AuthorDetailProps {
  data: any;
  onClose: () => void;
}

const mockAuthorStats = {
  topFiles: [
    { path: 'src/components/Queries.tsx', active: 156, idle: 32, commits: 8 },
    { path: 'src/components/Home.tsx', active: 142, idle: 28, commits: 6 },
    { path: 'src/components/ProgressStick.tsx', active: 98, idle: 18, commits: 5 },
    { path: 'src/data/mockData.ts', active: 76, idle: 14, commits: 4 }
  ],
  topRepos: [
    { name: 'vscode-extension', active: 432, idle: 86, commits: 24 },
    { name: 'web-app', active: 278, idle: 52, commits: 16 }
  ],
  topBranches: [
    { name: 'feature/analytics', active: 312, idle: 64, commits: 18 },
    { name: 'main', active: 198, idle: 38, commits: 12 },
    { name: 'feature/export', active: 142, idle: 28, commits: 8 }
  ]
};

export function AuthorDetail({ data, onClose }: AuthorDetailProps) {
  return (
    <div className="w-96 bg-[#252526] border-l border-[#2d2d2d] flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2d2d2d]">
        <div className="flex-1 min-w-0">
          <div className="text-[#cccccc] truncate">Author Detail</div>
          <div className="text-[#858585] text-sm truncate">{data?.name || 'john.dev'}</div>
        </div>
        <button
          onClick={onClose}
          className="ml-2 text-[#858585] hover:text-[#cccccc] transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Top Files */}
        <div>
          <div className="text-[#858585] text-sm mb-3">Top Files</div>
          <div className="space-y-2">
            {mockAuthorStats.topFiles.map((file, idx) => (
              <div key={idx} className="bg-[#1e1e1e] rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[#cccccc] text-sm truncate flex-1">{file.path}</div>
                  <div className="text-[#858585] text-xs ml-2">{file.commits} commits</div>
                </div>
                <ProgressStick active={file.active} idle={file.idle} total={file.active + file.idle} />
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#4ec9b0] rounded-sm" />
                    <span className="text-[#858585]">{Math.floor(file.active / 60)}h {file.active % 60}m</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#dcdcaa] rounded-sm" />
                    <span className="text-[#858585]">{file.idle}m</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Repos */}
        <div>
          <div className="text-[#858585] text-sm mb-3">Top Repositories</div>
          <div className="space-y-2">
            {mockAuthorStats.topRepos.map((repo, idx) => (
              <div key={idx} className="bg-[#1e1e1e] rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[#cccccc] text-sm">{repo.name}</div>
                  <div className="text-[#858585] text-xs">{repo.commits} commits</div>
                </div>
                <ProgressStick active={repo.active} idle={repo.idle} total={repo.active + repo.idle} maxTotal={1200} />
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#4ec9b0] rounded-sm" />
                    <span className="text-[#858585]">{Math.floor(repo.active / 60)}h {repo.active % 60}m</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#dcdcaa] rounded-sm" />
                    <span className="text-[#858585]">{Math.floor(repo.idle / 60)}h {repo.idle % 60}m</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Branches */}
        <div>
          <div className="text-[#858585] text-sm mb-3">Top Branches</div>
          <div className="space-y-2">
            {mockAuthorStats.topBranches.map((branch, idx) => (
              <div key={idx} className="bg-[#1e1e1e] rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[#cccccc] text-sm">{branch.name}</div>
                  <div className="text-[#858585] text-xs">{branch.commits} commits</div>
                </div>
                <ProgressStick active={branch.active} idle={branch.idle} total={branch.active + branch.idle} maxTotal={800} />
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#4ec9b0] rounded-sm" />
                    <span className="text-[#858585]">{Math.floor(branch.active / 60)}h {branch.active % 60}m</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#dcdcaa] rounded-sm" />
                    <span className="text-[#858585]">{branch.idle}m</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Stats */}
        <div>
          <div className="text-[#858585] text-sm mb-3">Overall Statistics</div>
          <div className="bg-[#1e1e1e] rounded p-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#858585]">Total commits:</span>
              <span className="text-[#cccccc]">48</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#858585]">Total active:</span>
              <span className="text-[#cccccc]">11h 50m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#858585]">Total idle:</span>
              <span className="text-[#cccccc]">2h 18m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#858585]">Avg. time/commit:</span>
              <span className="text-[#cccccc]">18m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}