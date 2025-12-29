import { X } from 'lucide-react';
import { ProgressStick } from './ProgressStick';

interface CommitDetailProps {
  data: any;
  onClose: () => void;
}

const mockCommitFiles = [
  { path: 'src/components/Queries.tsx', active: 42, idle: 8 },
  { path: 'src/components/ProgressStick.tsx', active: 28, idle: 6 },
  { path: 'src/data/mockData.ts', active: 18, idle: 4 },
  { path: 'src/types/index.ts', active: 12, idle: 2 },
];

export function CommitDetail({ data, onClose }: CommitDetailProps) {
  const totalActive = mockCommitFiles.reduce((sum, f) => sum + f.active, 0);
  const totalIdle = mockCommitFiles.reduce((sum, f) => sum + f.idle, 0);

  return (
    <div className="w-96 bg-[#252526] border-l border-[#2d2d2d] flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2d2d2d]">
        <div className="flex-1 min-w-0">
          <div className="text-[#cccccc] truncate">Commit Detail</div>
          <div className="text-[#858585] text-sm truncate">a3f7c2e</div>
        </div>
        <button
          onClick={onClose}
          className="ml-2 text-[#858585] hover:text-[#cccccc] transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Commit Info */}
        <div>
          <div className="text-[#858585] text-sm mb-3">Info</div>
          <div className="bg-[#1e1e1e] rounded p-3 space-y-2 text-sm">
            <div className="text-[#cccccc] mb-2">Add query filters</div>
            <div className="flex justify-between">
              <span className="text-[#858585]">Author:</span>
              <span className="text-[#cccccc]">john.dev</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#858585]">Date:</span>
              <span className="text-[#cccccc]">2025-12-25 14:30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#858585]">Branch:</span>
              <span className="text-[#cccccc]">feature/analytics</span>
            </div>
          </div>
        </div>

        {/* Total Time */}
        <div>
          <div className="text-[#858585] text-sm mb-3">Total Time</div>
          <div className="bg-[#1e1e1e] rounded p-3">
            <ProgressStick
              active={totalActive}
              idle={totalIdle}
              total={totalActive + totalIdle}
              maxTotal={300}
            />
            <div className="flex items-center gap-6 mt-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#4ec9b0] rounded-sm" />
                <span className="text-[#858585]">Active:</span>
                <span className="text-[#cccccc]">{totalActive}m</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#dcdcaa] rounded-sm" />
                <span className="text-[#858585]">Idle:</span>
                <span className="text-[#cccccc]">{totalIdle}m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Files */}
        <div>
          <div className="text-[#858585] text-sm mb-3">
            Modified Files ({mockCommitFiles.length})
          </div>
          <div className="space-y-2">
            {mockCommitFiles.map((file, idx) => (
              <div key={idx} className="bg-[#1e1e1e] rounded p-3">
                <div className="text-[#cccccc] text-sm mb-2 truncate">
                  {file.path}
                </div>
                <ProgressStick
                  active={file.active}
                  idle={file.idle}
                  total={file.active + file.idle}
                  maxTotal={200}
                />
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#4ec9b0] rounded-sm" />
                    <span className="text-[#858585]">{file.active}m</span>
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
      </div>
    </div>
  );
}
