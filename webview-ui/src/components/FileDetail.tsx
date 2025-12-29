import { X } from 'lucide-react';
import { ProgressStick } from './ProgressStick';

interface FileDetailProps {
  data: any;
  onClose: () => void;
}

const mockDailyActivity = [
  { date: '12/19', active: 45, idle: 12 },
  { date: '12/20', active: 62, idle: 18 },
  { date: '12/21', active: 38, idle: 8 },
  { date: '12/22', active: 71, idle: 15 },
  { date: '12/23', active: 54, idle: 22 },
  { date: '12/24', active: 49, idle: 11 },
  { date: '12/25', active: 58, idle: 14 },
];

const mockCommits = [
  {
    hash: 'a3f7c2e',
    message: 'Add query filters',
    active: 42,
    idle: 8,
    date: '2025-12-25 14:30',
  },
  {
    hash: '9d2e1f4',
    message: 'Update table layout',
    active: 28,
    idle: 6,
    date: '2025-12-25 11:15',
  },
  {
    hash: 'c5a8b3d',
    message: 'Fix export bug',
    active: 35,
    idle: 5,
    date: '2025-12-24 16:45',
  },
];

export function FileDetail({ data, onClose }: FileDetailProps) {
  const maxValue = Math.max(...mockDailyActivity.map((d) => d.active + d.idle));

  return (
    <div className="w-96 bg-[#252526] border-l border-[#2d2d2d] flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2d2d2d]">
        <div className="flex-1 min-w-0">
          <div className="text-[#cccccc] truncate">
            {data?.name || 'File Detail'}
          </div>
          <div className="text-[#858585] text-sm truncate">
            {data?.path || '/src/components/file.tsx'}
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-2 text-[#858585] hover:text-[#cccccc] transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Sparkline */}
        <div>
          <div className="text-[#858585] text-sm mb-3">7-Day Activity</div>
          <div className="flex items-end gap-2 h-24">
            {mockDailyActivity.map((day, idx) => {
              const activeHeight = (day.active / maxValue) * 100;
              const idleHeight = (day.idle / maxValue) * 100;
              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <div className="w-full flex flex-col-reverse gap-0.5">
                    <div
                      className="w-full bg-[#4ec9b0] rounded-t"
                      style={{ height: `${activeHeight}%` }}
                    />
                    <div
                      className="w-full bg-[#dcdcaa] rounded-t"
                      style={{ height: `${idleHeight}%` }}
                    />
                  </div>
                  <div className="text-[#858585] text-xs">{day.date}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Commits */}
        <div>
          <div className="text-[#858585] text-sm mb-3">Recent Commits</div>
          <div className="space-y-3">
            {mockCommits.map((commit) => (
              <div key={commit.hash} className="bg-[#1e1e1e] rounded p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-[#cccccc] text-sm truncate mb-1">
                      {commit.message}
                    </div>
                    <div className="text-[#858585] text-xs">
                      {commit.hash} · {commit.date}
                    </div>
                  </div>
                </div>
                <ProgressStick
                  active={commit.active}
                  idle={commit.idle}
                  total={commit.active + commit.idle}
                  maxTotal={300}
                />
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#4ec9b0] rounded-sm" />
                    <span className="text-[#858585]">{commit.active}m</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#dcdcaa] rounded-sm" />
                    <span className="text-[#858585]">{commit.idle}m</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div>
          <div className="text-[#858585] text-sm mb-3">Statistics</div>
          <div className="bg-[#1e1e1e] rounded p-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#858585]">Total commits:</span>
              <span className="text-[#cccccc]">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#858585]">Avg. time/commit:</span>
              <span className="text-[#cccccc]">38m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#858585]">First activity:</span>
              <span className="text-[#cccccc]">12/19/2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#858585]">Last activity:</span>
              <span className="text-[#cccccc]">12/25/2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
