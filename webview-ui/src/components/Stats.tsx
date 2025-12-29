import { useState } from 'react';
import {
  Calendar,
  TrendingUp,
  Clock,
  GitCommit,
  FileCode,
  Users,
} from 'lucide-react';

export function Stats() {
  const [dateRange, setDateRange] = useState({
    start: '2025-12-01',
    end: '2025-12-25',
  });

  // Mock data for visualizations
  const dailyData = [
    { date: '12/19', idle: 65, active: 245 },
    { date: '12/20', idle: 82, active: 298 },
    { date: '12/21', idle: 58, active: 215 },
    { date: '12/22', idle: 91, active: 342 },
    { date: '12/23', idle: 74, active: 268 },
    { date: '12/24', idle: 69, active: 232 },
    { date: '12/25', idle: 78, active: 342 },
  ];

  const fileTypeData = [
    { type: '.tsx', active: 1245, idle: 312, percentage: 42 },
    { type: '.ts', active: 892, idle: 198, percentage: 30 },
    { type: '.css', active: 324, idle: 86, percentage: 11 },
    { type: '.json', active: 189, idle: 52, percentage: 7 },
    { type: 'other', active: 298, idle: 74, percentage: 10 },
  ];

  const authorData = [
    { name: 'john.dev', active: 1842, idle: 428, commits: 48 },
    { name: 'jane.dev', active: 1106, idle: 294, commits: 32 },
  ];

  const maxDailyTotal = Math.max(...dailyData.map((d) => d.idle + d.active));

  const totalActive = dailyData.reduce((sum, d) => sum + d.active, 0);
  const totalIdle = dailyData.reduce((sum, d) => sum + d.idle, 0);
  const totalTime = totalActive + totalIdle;

  return (
    <div className="h-full overflow-auto">
      {/* Date Range Selector */}
      <div className="border-b border-[#2d2d2d] px-6 py-4 bg-[#252526]">
        <div className="flex items-center gap-4">
          <Calendar size={18} className="text-[#cccccc]" />
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
              className="bg-[#3c3c3c] border border-[#2d2d2d] rounded px-3 py-1.5 text-[#cccccc] focus:outline-none focus:border-[#007acc]"
            />
            <span className="text-[#858585]">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
              className="bg-[#3c3c3c] border border-[#2d2d2d] rounded px-3 py-1.5 text-[#cccccc] focus:outline-none focus:border-[#007acc]"
            />
          </div>
          <button className="ml-auto px-4 py-1.5 bg-[#0e639c] hover:bg-[#1177bb] text-[#ffffff] rounded transition-colors">
            Export Report
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#252526] rounded-lg p-4 border border-[#2d2d2d]">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-[#858585]" />
              <span className="text-[#858585] text-sm">Total Time</span>
            </div>
            <div className="text-[#cccccc] text-2xl">
              {Math.floor(totalTime / 60)}h {totalTime % 60}m
            </div>
            <div className="text-[#4ec9b0] text-sm mt-1">Last 7 days</div>
          </div>

          <div className="bg-[#252526] rounded-lg p-4 border border-[#2d2d2d]">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-[#858585]" />
              <span className="text-[#858585] text-sm">Active Time</span>
            </div>
            <div className="text-[#4ec9b0] text-2xl">
              {Math.floor(totalActive / 60)}h {totalActive % 60}m
            </div>
            <div className="text-[#858585] text-sm mt-1">
              {Math.round((totalActive / totalTime) * 100)}% of total
            </div>
          </div>

          <div className="bg-[#252526] rounded-lg p-4 border border-[#2d2d2d]">
            <div className="flex items-center gap-2 mb-2">
              <GitCommit size={16} className="text-[#858585]" />
              <span className="text-[#858585] text-sm">Commits</span>
            </div>
            <div className="text-[#cccccc] text-2xl">80</div>
            <div className="text-[#858585] text-sm mt-1">Avg 11.4/day</div>
          </div>

          <div className="bg-[#252526] rounded-lg p-4 border border-[#2d2d2d]">
            <div className="flex items-center gap-2 mb-2">
              <FileCode size={16} className="text-[#858585]" />
              <span className="text-[#858585] text-sm">Files Modified</span>
            </div>
            <div className="text-[#cccccc] text-2xl">247</div>
            <div className="text-[#858585] text-sm mt-1">Across 2 repos</div>
          </div>
        </div>

        {/* Daily Activity Chart */}
        <div className="bg-[#252526] rounded-lg p-6 border border-[#2d2d2d]">
          <h3 className="text-[#cccccc] mb-4">Daily Activity</h3>
          <div className="flex items-end gap-3 h-64">
            {dailyData.map((day, idx) => {
              const idleHeight = (day.idle / maxDailyTotal) * 100;
              const activeHeight = (day.active / maxDailyTotal) * 100;
              const totalMinutes = day.idle + day.active;

              // Color intensity based on duration
              const getIdleColor = (duration: number) => {
                const intensity = Math.min(duration / 120, 1);
                const lightness = 75 - intensity * 25;
                return `hsl(48, 82%, ${lightness}%)`;
              };

              const getActiveColor = (duration: number) => {
                const intensity = Math.min(duration / 120, 1);
                const lightness = 75 - intensity * 17;
                return `hsl(169, 54%, ${lightness}%)`;
              };

              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center gap-2 group relative"
                >
                  <div className="w-full flex flex-col-reverse gap-1 h-full">
                    <div
                      className="w-full rounded-t transition-all cursor-pointer hover:opacity-80"
                      style={{
                        height: `${idleHeight}%`,
                        backgroundColor: getIdleColor(day.idle),
                      }}
                    />
                    <div
                      className="w-full rounded-t transition-all cursor-pointer hover:opacity-80"
                      style={{
                        height: `${activeHeight}%`,
                        backgroundColor: getActiveColor(day.active),
                      }}
                    />
                  </div>
                  <div className="text-[#858585] text-xs">{day.date}</div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 bg-[#1e1e1e] border border-[#2d2d2d] rounded shadow-lg px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 whitespace-nowrap">
                    <div className="space-y-1 text-sm">
                      <div className="text-[#cccccc]">{day.date}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#858585]">Idle:</span>
                        <span className="text-[#cccccc]">
                          {Math.floor(day.idle / 60)}h {day.idle % 60}m
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#858585]">Active:</span>
                        <span className="text-[#cccccc]">
                          {Math.floor(day.active / 60)}h {day.active % 60}m
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#858585]">Total:</span>
                        <span className="text-[#cccccc]">
                          {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: 'hsl(48, 82%, 62%)' }}
              />
              <span className="text-[#858585]">Idle Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: 'hsl(169, 54%, 58%)' }}
              />
              <span className="text-[#858585]">Active Time</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* File Type Distribution */}
          <div className="bg-[#252526] rounded-lg p-6 border border-[#2d2d2d]">
            <h3 className="text-[#cccccc] mb-4">File Type Distribution</h3>
            <div className="space-y-3">
              {fileTypeData.map((file, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#cccccc] text-sm">{file.type}</span>
                    <span className="text-[#858585] text-sm">
                      {file.percentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-[#3c3c3c] rounded-sm overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${file.percentage}%`,
                        background: `linear-gradient(to right, hsl(48, 82%, ${75 - (file.idle / 500) * 25}%), hsl(169, 54%, ${75 - (file.active / 2000) * 17}%))`,
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs">
                    <span className="text-[#858585]">
                      Idle: {Math.floor(file.idle / 60)}h {file.idle % 60}m
                    </span>
                    <span className="text-[#858585]">
                      Active: {Math.floor(file.active / 60)}h {file.active % 60}
                      m
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Author Contribution */}
          <div className="bg-[#252526] rounded-lg p-6 border border-[#2d2d2d]">
            <h3 className="text-[#cccccc] mb-4 flex items-center gap-2">
              <Users size={16} />
              Author Contribution
            </h3>
            <div className="space-y-4">
              {authorData.map((author, idx) => {
                const authorTotal = author.active + author.idle;
                const activePercent = (author.active / authorTotal) * 100;
                const idlePercent = (author.idle / authorTotal) * 100;

                return (
                  <div key={idx} className="bg-[#1e1e1e] rounded p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#cccccc]">{author.name}</span>
                      <span className="text-[#858585] text-sm">
                        {author.commits} commits
                      </span>
                    </div>
                    <div className="h-3 bg-[#3c3c3c] rounded-sm overflow-hidden flex mb-2">
                      <div
                        className="transition-all"
                        style={{
                          width: `${idlePercent}%`,
                          backgroundColor: `hsl(48, 82%, ${75 - (author.idle / 500) * 25}%)`,
                        }}
                      />
                      <div
                        className="transition-all"
                        style={{
                          width: `${activePercent}%`,
                          backgroundColor: `hsl(169, 54%, ${75 - (author.active / 2000) * 17}%)`,
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-[#858585]">Idle:</span>
                        <span className="text-[#cccccc]">
                          {Math.floor(author.idle / 60)}h {author.idle % 60}m
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#858585]">Active:</span>
                        <span className="text-[#cccccc]">
                          {Math.floor(author.active / 60)}h {author.active % 60}
                          m
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Productivity Patterns */}
        <div className="bg-[#252526] rounded-lg p-6 border border-[#2d2d2d]">
          <h3 className="text-[#cccccc] mb-4">Productivity Insights</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-[#858585] text-sm mb-2">
                Most Productive Day
              </div>
              <div className="text-[#4ec9b0] text-xl">Thursday</div>
              <div className="text-[#858585] text-sm">Avg 6h 15m active</div>
            </div>
            <div>
              <div className="text-[#858585] text-sm mb-2">Peak Hours</div>
              <div className="text-[#4ec9b0] text-xl">10am - 2pm</div>
              <div className="text-[#858585] text-sm">42% of active time</div>
            </div>
            <div>
              <div className="text-[#858585] text-sm mb-2">Avg Session</div>
              <div className="text-[#4ec9b0] text-xl">1h 24m</div>
              <div className="text-[#858585] text-sm">
                Before idle threshold
              </div>
            </div>
          </div>
        </div>

        {/* Commit Activity Heatmap */}
        <div className="bg-[#252526] rounded-lg p-6 border border-[#2d2d2d]">
          <h3 className="text-[#cccccc] mb-4">Commit Frequency</h3>
          <div className="flex gap-2">
            {Array.from({ length: 52 }).map((_, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-2">
                {Array.from({ length: 7 }).map((_, dayIdx) => {
                  const intensity = Math.random();
                  const hasActivity = intensity > 0.3;
                  const color = hasActivity
                    ? `hsl(169, 54%, ${75 - intensity * 45}%)`
                    : '#2d2d2d';

                  return (
                    <div
                      key={dayIdx}
                      className="w-3 h-3 rounded-sm transition-colors hover:ring-1 hover:ring-[#4ec9b0] cursor-pointer"
                      style={{ backgroundColor: color }}
                      title={
                        hasActivity
                          ? `${Math.floor(intensity * 15)} commits`
                          : 'No activity'
                      }
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4 text-xs text-[#858585]">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-[#2d2d2d]" />
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: 'hsl(169, 54%, 70%)' }}
              />
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: 'hsl(169, 54%, 58%)' }}
              />
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: 'hsl(169, 54%, 45%)' }}
              />
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: 'hsl(169, 54%, 32%)' }}
              />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
