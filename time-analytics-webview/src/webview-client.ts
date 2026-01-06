import type { BackendMessages, ClientMessages } from './types/messages';
import type { WebviewApi } from './types/vscode-webview-api';
import { useAnalyticsStore } from './stores/analytics';

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

class WebviewClient implements WebviewApi<WebviewState> {
  #vscode = acquireVsCodeApi<WebviewState>();

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
