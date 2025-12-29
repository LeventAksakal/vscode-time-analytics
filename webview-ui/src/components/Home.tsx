import { useState } from 'react';
import { Calendar, ChevronDown, ChevronRight, Search, List, TreePine, ArrowUpDown } from 'lucide-react';
import { ProgressStick } from './ProgressStick';
import { mockTreeData } from '../data/mockData';

interface HomeProps {
  onOpenDetail: (detail: { type: 'file' | 'commit' | 'author'; data: any }) => void;
}

export function Home({ onOpenDetail }: HomeProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['repo-1']));
  const [filters, setFilters] = useState({ repo: '', author: '', branch: '', file: '' });
  const [viewMode, setViewMode] = useState<'tree' | 'list'>('tree');
  const [sortBy, setSortBy] = useState<'time' | 'alphabetical' | 'commits'>('time');

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const renderTreeNode = (node: any, depth: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id}>
        <div
          className="group flex items-center gap-2 px-4 py-1.5 hover:bg-[#2a2d2e] cursor-pointer transition-colors"
          style={{ paddingLeft: `${depth * 16 + 16}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleNode(node.id);
            } else if (node.type === 'file') {
              onOpenDetail({ type: 'file', data: node });
            }
          }}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {hasChildren && (
              <button className="text-[#cccccc]">
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            )}
            {!hasChildren && <span className="w-4" />}
            <span className="text-[#cccccc] truncate">{node.name}</span>
            {node.commits && (
              <span className="text-[#858585] text-sm">({node.commits})</span>
            )}
          </div>
          <div className="w-56 flex items-center gap-1">
            <ProgressStick
              active={node.active}
              idle={node.idle}
              total={node.total}
              showTooltip
            />
          </div>
        </div>
        {hasChildren && isExpanded && node.children.map((child: any) => renderTreeNode(child, depth + 1))}
      </div>
    );
  };

  const flattenTree = (nodes: any[]): any[] => {
    let result: any[] = [];
    for (const node of nodes) {
      if (node.type === 'file') {
        result.push(node);
      }
      if (node.children) {
        result = result.concat(flattenTree(node.children));
      }
    }
    return result;
  };

  const sortFiles = (files: any[]) => {
    const sorted = [...files];
    switch (sortBy) {
      case 'time':
        return sorted.sort((a, b) => b.total - a.total);
      case 'alphabetical':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'commits':
        return sorted.sort((a, b) => (b.commits || 0) - (a.commits || 0));
      default:
        return sorted;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Date Picker */}
      <div className="border-b border-[#2d2d2d] px-6 py-4">
        <div className="flex items-center gap-3">
          <Calendar size={18} className="text-[#cccccc]" />
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="bg-[#3c3c3c] border border-[#2d2d2d] rounded px-3 py-1.5 text-[#cccccc] focus:outline-none focus:border-[#007acc]"
          />
        </div>
      </div>

      {/* Summary Card */}
      <div className="border-b border-[#2d2d2d] px-6 py-4 bg-[#252526]">
        <div className="flex items-center gap-8 mb-3">
          <div>
            <div className="text-[#858585] text-sm mb-1">Idle Time</div>
            <div className="flex items-baseline gap-2">
              <span className="text-[#dcdcaa] text-2xl">1h 18m</span>
              <span className="text-[#f48771] text-sm">+12m</span>
            </div>
          </div>
          <div>
            <div className="text-[#858585] text-sm mb-1">Active Time</div>
            <div className="flex items-baseline gap-2">
              <span className="text-[#4ec9b0] text-2xl">5h 42m</span>
              <span className="text-[#4ec9b0] text-sm">+23m</span>
            </div>
          </div>
          <div>
            <div className="text-[#858585] text-sm mb-1">Total Time</div>
            <div className="text-[#cccccc] text-2xl">7h 0m</div>
          </div>
        </div>
        <div className="w-full">
          <ProgressStick active={342} idle={78} total={420} maxTotal={480} />
        </div>
      </div>

      {/* Quick Filters & Controls */}
      <div className="border-b border-[#2d2d2d] px-6 py-3 bg-[#252526]">
        <div className="flex items-center gap-3">
          <Search size={16} className="text-[#858585]" />
          <input
            type="text"
            placeholder="Filter files..."
            value={filters.file}
            onChange={(e) => setFilters({ ...filters, file: e.target.value })}
            className="flex-1 bg-[#3c3c3c] border border-[#2d2d2d] rounded px-3 py-1 text-[#cccccc] placeholder-[#858585] focus:outline-none focus:border-[#007acc]"
          />
          <select
            value={filters.repo}
            onChange={(e) => setFilters({ ...filters, repo: e.target.value })}
            className="bg-[#3c3c3c] border border-[#2d2d2d] rounded px-3 py-1 text-[#cccccc] focus:outline-none focus:border-[#007acc]"
          >
            <option value="">All Repos</option>
            <option value="vscode-extension">vscode-extension</option>
            <option value="web-app">web-app</option>
          </select>
          <div className="w-px h-5 bg-[#2d2d2d]" />
          <button
            onClick={() => setViewMode(viewMode === 'tree' ? 'list' : 'tree')}
            className={`flex items-center gap-2 px-3 py-1 rounded transition-colors ${
              viewMode === 'tree' ? 'bg-[#37373d] text-[#ffffff]' : 'text-[#cccccc] hover:bg-[#2a2d2e]'
            }`}
          >
            {viewMode === 'tree' ? <TreePine size={16} /> : <List size={16} />}
          </button>
          <div className="flex items-center gap-2">
            <ArrowUpDown size={16} className="text-[#858585]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#3c3c3c] border border-[#2d2d2d] rounded px-3 py-1 text-[#cccccc] focus:outline-none focus:border-[#007acc]"
            >
              <option value="time">Time</option>
              <option value="alphabetical">A-Z</option>
              <option value="commits">Commits</option>
            </select>
          </div>
        </div>
      </div>

      {/* View */}
      <div className="flex-1 overflow-auto">
        {viewMode === 'tree' ? (
          mockTreeData.map((node) => renderTreeNode(node))
        ) : (
          <div>
            {sortFiles(flattenTree(mockTreeData)).map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-4 px-6 py-2 hover:bg-[#2a2d2e] cursor-pointer transition-colors border-b border-[#2d2d2d]"
                onClick={() => onOpenDetail({ type: 'file', data: file })}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[#cccccc] truncate">{file.name}</div>
                  <div className="text-[#858585] text-sm truncate">{file.path}</div>
                </div>
                {file.commits && (
                  <span className="text-[#858585] text-sm">{file.commits} commits</span>
                )}
                <div className="w-56">
                  <ProgressStick
                    active={file.active}
                    idle={file.idle}
                    total={file.total}
                    maxTotal={480}
                    showTooltip
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}