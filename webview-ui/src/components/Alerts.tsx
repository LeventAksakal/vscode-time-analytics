import { X, AlertTriangle, Github } from 'lucide-react';

interface AlertsProps {
  onClose: () => void;
}

const mockAlerts = [
  {
    id: 1,
    type: 'info',
    title: 'Sign in with GitHub',
    message: 'Enable author tracking and commit attribution',
    action: 'Connect GitHub',
    icon: 'github'
  },
  {
    id: 2,
    type: 'warning',
    title: '.gitignore Missing',
    message: 'Tracking data not ignored in repo "vscode-extension"',
    action: 'Add to .gitignore'
  }
];

export function Alerts({ onClose }: AlertsProps) {
  const getIcon = (alert: any) => {
    if (alert.icon === 'github') {
      return <Github size={16} className="text-[#4ec9b0]" />;
    }
    return <AlertTriangle size={16} className="text-[#dcdcaa]" />;
  };

  return (
    <div className="w-80 border-b border-[#2d2d2d] bg-[#252526]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#2d2d2d]">
        <span className="text-[#cccccc] text-sm">Alerts</span>
        <button
          onClick={onClose}
          className="text-[#858585] hover:text-[#cccccc] transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      <div className="max-h-80 overflow-auto">
        {mockAlerts.map((alert) => (
          <div key={alert.id} className="px-4 py-3 border-b border-[#2d2d2d] hover:bg-[#2a2d2e] transition-colors">
            <div className="flex items-start gap-2 mb-2">
              {getIcon(alert)}
              <div className="flex-1 min-w-0">
                <div className="text-[#cccccc] text-sm mb-1">{alert.title}</div>
                <div className="text-[#858585] text-sm">{alert.message}</div>
              </div>
            </div>
            <button className="text-[#4ec9b0] hover:text-[#6cd9bf] text-sm transition-colors">
              {alert.action} →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}