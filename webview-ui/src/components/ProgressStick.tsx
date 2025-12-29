interface ProgressStickProps {
  active: number; // minutes
  idle: number; // minutes
  total: number; // minutes
  maxTotal?: number; // max value for scaling
  showTooltip?: boolean;
}

export function ProgressStick({
  active,
  idle,
  total,
  maxTotal,
  showTooltip = false,
}: ProgressStickProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Calculate percentages for the bar segments
  const idlePercent = (idle / total) * 100;
  const activePercent = (active / total) * 100;

  // Calculate width scale (if maxTotal provided, scale the entire bar)
  const widthScale = maxTotal ? (total / maxTotal) * 100 : 100;

  // Calculate color intensity based on duration (normalize to reasonable ranges)
  // Short duration = weak color, long duration = strong color
  const getColorIntensity = (duration: number, baseColor: string) => {
    // Normalize to 0-1 range, assuming 120 minutes as "full strength"
    const intensity = Math.min(duration / 120, 1);

    if (baseColor === 'idle') {
      // Yellow idle color: weak to strong
      const minLightness = 75; // Very light yellow
      const maxLightness = 50; // Rich yellow
      const lightness =
        minLightness - intensity * (minLightness - maxLightness);
      return `hsl(48, 82%, ${lightness}%)`;
    } else {
      // Green active color: weak to strong
      const minLightness = 75; // Very light green
      const maxLightness = 58; // Rich green
      const lightness =
        minLightness - intensity * (minLightness - maxLightness);
      return `hsl(169, 54%, ${lightness}%)`;
    }
  };

  const idleColor = getColorIntensity(idle, 'idle');
  const activeColor = getColorIntensity(active, 'active');

  return (
    <div className="relative group">
      <div className="h-2 bg-[#3c3c3c] rounded-sm overflow-hidden">
        <div className="h-full flex" style={{ width: `${widthScale}%` }}>
          {/* Idle (yellow) on the left */}
          <div
            className="transition-all relative"
            style={{
              width: `${idlePercent}%`,
              background: `linear-gradient(to right, ${idleColor}, ${idleColor} 70%, ${activeColor})`,
            }}
          />
          {/* Active (green) on the right */}
          <div
            className="transition-all"
            style={{
              width: `${activePercent}%`,
              backgroundColor: activeColor,
            }}
          />
        </div>
      </div>

      {showTooltip && (
        <div className="absolute left-0 top-full mt-2 bg-[#1e1e1e] border border-[#2d2d2d] rounded shadow-lg px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 whitespace-nowrap">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: idleColor }}
              />
              <span className="text-[#858585]">Idle:</span>
              <span className="text-[#cccccc]">{formatTime(idle)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: activeColor }}
              />
              <span className="text-[#858585]">Active:</span>
              <span className="text-[#cccccc]">{formatTime(active)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#858585]">Total:</span>
              <span className="text-[#cccccc]">{formatTime(total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
