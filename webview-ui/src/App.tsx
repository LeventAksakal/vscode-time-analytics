import { useState } from 'react';
import { Home } from './components/Home';
import { Queries } from './components/Queries';
import { Stats } from './components/Stats';
import { Settings } from './components/Settings';
import { Alerts } from './components/Alerts';
import { FileDetail } from './components/FileDetail';
import { CommitDetail } from './components/CommitDetail';
import { AuthorDetail } from './components/AuthorDetail';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'queries' | 'stats' | 'settings'>('home');
  const [detailView, setDetailView] = useState<{
    type: 'file' | 'commit' | 'author' | null;
    data?: any;
  }>({ type: null });
  const [showAlerts, setShowAlerts] = useState(true);
  const [isTracking, setIsTracking] = useState(true);

  const renderDetailPanel = () => {
    if (!detailView.type) return null;

    switch (detailView.type) {
      case 'file':
        return <FileDetail data={detailView.data} onClose={() => setDetailView({ type: null })} />;
      case 'commit':
        return <CommitDetail data={detailView.data} onClose={() => setDetailView({ type: null })} />;
      case 'author':
        return <AuthorDetail data={detailView.data} onClose={() => setDetailView({ type: null })} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e] text-[#cccccc]">
      {/* Header */}
      <header className="border-b border-[#2d2d2d] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-[#cccccc] tracking-tight">Time Analytics</h1>
          <nav className="flex gap-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-1.5 rounded transition-colors ${
                activeTab === 'home'
                  ? 'bg-[#37373d] text-[#ffffff]'
                  : 'text-[#cccccc] hover:bg-[#2a2d2e]'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setActiveTab('queries')}
              className={`px-4 py-1.5 rounded transition-colors ${
                activeTab === 'queries'
                  ? 'bg-[#37373d] text-[#ffffff]'
                  : 'text-[#cccccc] hover:bg-[#2a2d2e]'
              }`}
            >
              Queries
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-1.5 rounded transition-colors ${
                activeTab === 'stats'
                  ? 'bg-[#37373d] text-[#ffffff]'
                  : 'text-[#cccccc] hover:bg-[#2a2d2e]'
              }`}
            >
              Stats
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-1.5 rounded transition-colors ${
                activeTab === 'settings'
                  ? 'bg-[#37373d] text-[#ffffff]'
                  : 'text-[#cccccc] hover:bg-[#2a2d2e]'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded ${isTracking ? 'bg-[#4ec9b0]/10' : 'bg-[#3c3c3c]'}`}>
            <div className={`w-2 h-2 rounded-full ${isTracking ? 'bg-[#4ec9b0]' : 'bg-[#858585]'}`} />
            <span className="text-sm">{isTracking ? 'Tracking' : 'Stopped'}</span>
          </div>
          <button
            onClick={() => setIsTracking(!isTracking)}
            className="px-4 py-1.5 bg-[#3c3c3c] hover:bg-[#4a4a4a] text-[#cccccc] rounded transition-colors"
          >
            {isTracking ? 'Stop' : 'Start'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-auto">
          {activeTab === 'home' && <Home onOpenDetail={setDetailView} />}
          {activeTab === 'queries' && <Queries onOpenDetail={setDetailView} />}
          {activeTab === 'stats' && <Stats />}
          {activeTab === 'settings' && <Settings />}
        </main>

        {/* Right Panels */}
        <aside className="flex flex-col border-l border-[#2d2d2d]">
          {showAlerts && (
            <Alerts onClose={() => setShowAlerts(false)} />
          )}
          {renderDetailPanel()}
        </aside>
      </div>
    </div>
  );
}