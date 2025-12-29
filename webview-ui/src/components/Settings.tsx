import { useState } from 'react';
import { Trash2 } from 'lucide-react';

export function Settings() {
  const [settings, setSettings] = useState({
    idleThreshold: 300000, // 5 minutes in ms
    autoStartTracking: true,
  });

  const handleClearTracking = () => {
    if (
      confirm(
        'Are you sure you want to clear all tracking data? This cannot be undone.',
      )
    ) {
      console.log('Clearing tracking data...');
    }
  };

  return (
    <div className="h-full overflow-auto p-6 space-y-8">
      <div>
        <h2 className="text-[#cccccc] mb-4 pb-2 border-b border-[#2d2d2d]">
          Tracking
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-[#cccccc] mb-2 text-sm">
              Idle Threshold (milliseconds)
            </label>
            <input
              type="number"
              value={settings.idleThreshold}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  idleThreshold: parseInt(e.target.value),
                })
              }
              step="1000"
              className="w-full bg-[#3c3c3c] border border-[#2d2d2d] rounded px-3 py-2 text-[#cccccc] focus:outline-none focus:border-[#007acc]"
            />
            <p className="text-[#858585] text-sm mt-1">
              Mark activity as idle after this duration of inactivity
            </p>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoStartTracking}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  autoStartTracking: e.target.checked,
                })
              }
              className="mt-1 accent-[#007acc]"
            />
            <div>
              <div className="text-[#cccccc] text-sm">
                Auto-start tracking on workspace open
              </div>
              <div className="text-[#858585] text-sm">
                Automatically begin tracking when you open a workspace
              </div>
            </div>
          </label>
        </div>
      </div>

      <div>
        <h2 className="text-[#cccccc] mb-4 pb-2 border-b border-[#2d2d2d]">
          Data Management
        </h2>
        <div className="space-y-4">
          <div className="bg-[#252526] rounded p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#858585]">Database size:</span>
              <span className="text-[#cccccc]">47.2 MB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#858585]">Total active time:</span>
              <span className="text-[#cccccc]">342h 18m</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#858585]">Total idle time:</span>
              <span className="text-[#cccccc]">89h 42m</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#858585]">Oldest record:</span>
              <span className="text-[#cccccc]">2024-09-15</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-[#0e639c] hover:bg-[#1177bb] text-[#ffffff] rounded transition-colors">
              Export All Data
            </button>
            <button className="px-4 py-2 bg-[#3c3c3c] hover:bg-[#4a4a4a] text-[#cccccc] rounded transition-colors">
              Import Data
            </button>
          </div>

          <button
            onClick={handleClearTracking}
            className="flex items-center gap-2 px-4 py-2 bg-[#f48771]/10 hover:bg-[#f48771]/20 text-[#f48771] rounded transition-colors w-full justify-center"
          >
            <Trash2 size={16} />
            Clear All Tracking Data
          </button>
        </div>
      </div>
    </div>
  );
}
