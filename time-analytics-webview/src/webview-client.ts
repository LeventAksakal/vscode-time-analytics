import type { BackendMessages, ClientMessages } from './types/messages';
import type { WebviewApi } from './types/vscode-webview-api';
import { useAnalyticsStore } from './stores/analytics';
import { mockInitialData } from './mocks/mock-data';

interface WebviewState {
  route?: string;
  selectedBucketKey?: string;
  expandedKeys?: string[];
  filters?: {
    query?: string;
    onlyMine?: boolean;
    dateFrom?: string;
    dateTo?: string;
  };
  ui?: {
    sidebarCollapsed?: boolean;
    zoom?: number;
  };
  lastOpenedFile?: string;
}

// Mock implementation for browser environment
const mockVsCodeApi: WebviewApi<WebviewState> = {
  postMessage: (msg: unknown) => console.log('[MockVsCode] To Backend:', msg),
  getState: () => ({}),
  setState: (state: any) => state,
};

function getVsCodeApi(): WebviewApi<WebviewState> {
  if (typeof acquireVsCodeApi === 'function') {
    return acquireVsCodeApi<WebviewState>();
  }
  return mockVsCodeApi;
}

class WebviewClient implements WebviewApi<WebviewState> {
  #vscode = getVsCodeApi();
  #isDev = typeof acquireVsCodeApi !== 'function';

  #onMessage = (event: MessageEvent) => {
    const message = event.data as BackendMessages;
    console.log('[Webview] Received message:', message);
    const store = useAnalyticsStore();
    store.handleMessage(message);
  };

  constructor() {
    window.addEventListener('message', this.#onMessage);

    // Notify backend that we are ready
    this.postMessage({ type: 'webviewBoot' });
    this.postMessage({ type: 'requestInitialData' });

    // If dev env, simulate initial data being received
    if (this.#isDev) {
      console.log('[Webview] Dev mode detected, loading mock data...');
      setTimeout(() => {
        const store = useAnalyticsStore();
        store.handleMessage({ type: 'initialData', data: mockInitialData });
      }, 100);
    }
  }

  postMessage(message: ClientMessages): void {
    console.log('[Webview] Sending message:', message);
    this.#vscode.postMessage(message);
  }
  getState(): WebviewState | undefined {
    return this.#vscode.getState();
  }
  setState<T extends WebviewState | undefined>(newState: T): T {
    return this.#vscode.setState(newState);
  }
}

export const webviewApi = new WebviewClient();
