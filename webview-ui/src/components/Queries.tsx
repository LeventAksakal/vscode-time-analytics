import { useState } from 'react';
import {
  Download,
  Table as TableIcon,
  TreePine,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { ProgressStick } from './ProgressStick';
import { mockQueryResults } from '../data/mockData';

interface QueriesProps {
  onOpenDetail: (detail: {
    type: 'file' | 'commit' | 'author';
    data: any;
  }) => void;
}

export function Queries({ onOpenDetail }: QueriesProps) {
  const [viewMode, setViewMode] = useState<'table' | 'tree'>('table');
  const [commitView, setCommitView] = useState(false);
  const [expandedCommits, setExpandedCommits] = useState<Set<string>>(
    new Set(),
  );
  const [filters, setFilters] = useState({
    dateStart: '2025-12-20',
    dateEnd: '2025-12-25',
    repo: '',
    branch: '',
    commit: '',
    author: '',
    fileInclude: '',
    fileExclude: '',
  });

  const toggleCommit = (commitId: string) => {
    const newExpanded = new Set(expandedCommits);
    if (newExpanded.has(commitId)) {
      newExpanded.delete(commitId);
    } else {
      newExpanded.add(commitId);
    }
    setExpandedCommits(newExpanded);
  };

  const handleExport = (format: 'csv' | 'json') => {
    console.log(`Exporting as ${format}...`);
    // Mock export functionality
  };

  return (
    <div className="h-full flex flex-col">
      {/* Filter Bar */}
      <div className="border-b border-[#2d2d2d] px-6 py-4 bg-[#252526] space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[#858585] text-sm">From:</span>
            <input
              type="date"
              value={filters.dateStart}
              onChange={(e) =>
                setFilters({ ...filters, dateStart: e.target.value })
              }
              className="bg-[#3c3c3c] border border-[#2d2d2d] rounded px-2 py-1 text-[#cccccc] text-sm focus:outline-none focus:border-[#007acc]"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#858585] text-sm">To:</span>
            <input
              type="date"
              value={filters.dateEnd}
              onChange={(e) =>
                setFilters({ ...filters, dateEnd: e.target.value })
              }
              className="bg-[#3c3c3c] border border-[#2d2d2d] rounded px-2 py-1 text-[#cccccc] text-sm focus:outline-none focus:border-[#007acc]"
            />
          </div>
          <input
            type="text"
            placeholder="Repo"
            value={filters.repo}
            onChange={(e) => setFilters({ ...filters, repo: e.target.value })}
            className="bg-[#3c3c3c] border border-[#2d2d2d] rounded px-3 py-1 text-[#cccccc] placeholder-[#858585] text-sm focus:outline-none focus:border-[#007acc]"
          />
          <input
            type="text"
            placeholder="Branch"
            value={filters.branch}
            onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
            className="bg-[#3c3c3c] border border-[#2d2d2d] rounded px-3 py-1 text-[#cccccc] placeholder-[#858585] text-sm focus:outline-none focus:border-[#007acc]"
          />
          <input
            type="text"
            placeholder="Commit hash"
            value={filters.commit}
            onChange={(e) => setFilters({ ...filters, commit: e.target.value })}
            className="bg-[#3c3c3c] border border-[#2d2d2d] rounded px-3 py-1 text-[#cccccc] placeholder-[#858585] text-sm focus:outline-none focus:border-[#007acc]"
          />
          <input
            type="text"
            placeholder="Author"
            value={filters.author}
            onChange={(e) => setFilters({ ...filters, author: e.target.value })}
            className="bg-[#3c3c3c] border border-[#2d2d2d] rounded px-3 py-1 text-[#cccccc] placeholder-[#858585] text-sm focus:outline-none focus:border-[#007acc]"
          />
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Include files (glob pattern)"
            value={filters.fileInclude}
            onChange={(e) =>
              setFilters({ ...filters, fileInclude: e.target.value })
            }
            className="flex-1 bg-[#3c3c3c] border border-[#2d2d2d] rounded px-3 py-1 text-[#cccccc] placeholder-[#858585] text-sm focus:outline-none focus:border-[#007acc]"
          />
          <input
            type="text"
            placeholder="Exclude files (glob pattern)"
            value={filters.fileExclude}
            onChange={(e) =>
              setFilters({ ...filters, fileExclude: e.target.value })
            }
            className="flex-1 bg-[#3c3c3c] border border-[#2d2d2d] rounded px-3 py-1 text-[#cccccc] placeholder-[#858585] text-sm focus:outline-none focus:border-[#007acc]"
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b border-[#2d2d2d] px-6 py-2 bg-[#252526] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1 rounded transition-colors ${
              viewMode === 'table'
                ? 'bg-[#37373d] text-[#ffffff]'
                : 'text-[#cccccc] hover:bg-[#2a2d2e]'
            }`}
          >
            <TableIcon size={16} />
          </button>
          <button
            onClick={() => setViewMode('tree')}
            className={`px-3 py-1 rounded transition-colors ${
              viewMode === 'tree'
                ? 'bg-[#37373d] text-[#ffffff]'
                : 'text-[#cccccc] hover:bg-[#2a2d2e]'
            }`}
          >
            <TreePine size={16} />
          </button>
          <div className="w-px h-5 bg-[#2d2d2d] mx-2" />
          <label className="flex items-center gap-2 text-[#cccccc] text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={commitView}
              onChange={(e) => setCommitView(e.target.checked)}
              className="accent-[#007acc]"
            />
            Commit-centric view
          </label>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('csv')}
            className="flex items-center gap-2 px-3 py-1 text-[#cccccc] hover:bg-[#2a2d2e] rounded transition-colors text-sm"
          >
            <Download size={14} />
            CSV
          </button>
          <button
            onClick={() => handleExport('json')}
            className="flex items-center gap-2 px-3 py-1 text-[#cccccc] hover:bg-[#2a2d2e] rounded transition-colors text-sm"
          >
            <Download size={14} />
            JSON
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-auto">
        {viewMode === 'table' && !commitView && (
          <table className="w-full">
            <thead className="sticky top-0 bg-[#252526] border-b border-[#2d2d2d]">
              <tr className="text-left">
                <th className="px-6 py-2 text-[#858585] text-sm">
                  File/Folder
                </th>
                <th className="px-6 py-2 text-[#858585] text-sm w-64">
                  Activity
                </th>
                <th className="px-6 py-2 text-[#858585] text-sm">Total</th>
                <th className="px-6 py-2 text-[#858585] text-sm">Repo</th>
                <th className="px-6 py-2 text-[#858585] text-sm">Branch</th>
                <th className="px-6 py-2 text-[#858585] text-sm">Author</th>
              </tr>
            </thead>
            <tbody>
              {mockQueryResults.files.map((file, idx) => (
                <tr
                  key={idx}
                  className="border-b border-[#2d2d2d] hover:bg-[#2a2d2e] cursor-pointer transition-colors"
                  onClick={() => onOpenDetail({ type: 'file', data: file })}
                >
                  <td className="px-6 py-2 text-[#cccccc]">{file.path}</td>
                  <td className="px-6 py-2">
                    <ProgressStick
                      active={file.active}
                      idle={file.idle}
                      total={file.total}
                      maxTotal={600}
                    />
                  </td>
                  <td className="px-6 py-2 text-[#cccccc]">
                    {Math.floor(file.total / 60)}h {file.total % 60}m
                  </td>
                  <td className="px-6 py-2 text-[#858585]">{file.repo}</td>
                  <td className="px-6 py-2 text-[#858585]">{file.branch}</td>
                  <td
                    className="px-6 py-2 text-[#858585] cursor-pointer hover:text-[#4ec9b0]"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDetail({
                        type: 'author',
                        data: { name: file.author },
                      });
                    }}
                  >
                    {file.author}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {viewMode === 'table' && commitView && (
          <div className="divide-y divide-[#2d2d2d]">
            {mockQueryResults.commits.map((commit) => {
              const isExpanded = expandedCommits.has(commit.hash);
              return (
                <div key={commit.hash}>
                  <div
                    className="flex items-center gap-4 px-6 py-3 hover:bg-[#2a2d2e] cursor-pointer transition-colors"
                    onClick={() => toggleCommit(commit.hash)}
                  >
                    <button className="text-[#cccccc]">
                      {isExpanded ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[#cccccc]">{commit.message}</span>
                        <span className="text-[#858585] text-sm">
                          {commit.hash.slice(0, 7)}
                        </span>
                      </div>
                      <div className="text-[#858585] text-sm">
                        {commit.author} · {commit.date}
                      </div>
                    </div>
                    <div className="w-64">
                      <ProgressStick
                        active={commit.active}
                        idle={commit.idle}
                        total={commit.total}
                        maxTotal={600}
                      />
                    </div>
                    <div className="text-[#cccccc] w-20 text-right">
                      {Math.floor(commit.total / 60)}h {commit.total % 60}m
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="bg-[#252526] pl-16 pr-6 py-2">
                      {commit.files.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 py-1.5 hover:bg-[#2a2d2e] cursor-pointer"
                        >
                          <span className="flex-1 text-[#cccccc] text-sm">
                            {file.path}
                          </span>
                          <div className="w-48">
                            <ProgressStick
                              active={file.active}
                              idle={file.idle}
                              total={file.total}
                              maxTotal={400}
                            />
                          </div>
                          <div className="text-[#858585] text-sm w-20 text-right">
                            {Math.floor(file.total / 60)}h {file.total % 60}m
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
