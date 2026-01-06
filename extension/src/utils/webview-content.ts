import { Uri, Webview, workspace } from 'vscode';

/**
 * Reads a local HTML file and replaces resource paths (src, href) with Webview URIs.
 *
 * @param webview The Webview instance to generate URIs for.
 * @param extensionUri The URI of the extension root.
 * @param relativePath The path to the HTML file relative to the extension root (e.g., 'webview-ui/index.html').
 */
export async function getWebviewContent(
  webview: Webview,
  extensionUri: Uri,
  relativePath: string,
): Promise<string> {
  const htmlUri = Uri.joinPath(extensionUri, relativePath);
  const bytes = await workspace.fs.readFile(htmlUri);
  let html = new TextDecoder().decode(bytes);

  // Determine the base directory of the HTML file to resolve relative paths
  const pathSegments = relativePath.split('/');
  const baseSegments = pathSegments.slice(0, -1);
  const baseUri = Uri.joinPath(extensionUri, ...baseSegments);

  const transformUri = (originalPath: string) => {
    if (
      originalPath.startsWith('http:') ||
      originalPath.startsWith('https:') ||
      originalPath.startsWith('data:')
    ) {
      return originalPath;
    }

    // Remove leading ./ or /
    const cleanPath = originalPath.replace(/^(\.?\/)/, '');

    // Resolve relative to the HTML file location
    const resourceUri = Uri.joinPath(baseUri, cleanPath);
    return webview.asWebviewUri(resourceUri).toString();
  };

  // Generate a nonce for CSP
  const nonce = getNonce();

  // Inject CSP meta tag
  const csp = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}' ${webview.cspSource}; img-src ${webview.cspSource} https: data:; font-src ${webview.cspSource};">`;

  if (html.includes('<head>')) {
    html = html.replace('<head>', `<head>\n    ${csp}`);
  } else {
    html = csp + html;
  }

  // Replace script src
  // Matches <script ... src="...">
  html = html.replace(
    /(<script(?:\s+[^>]*?)?\s+src=")([^"]+)(")/g,
    (match, prefix, src, suffix) => {
      return `${prefix}${transformUri(src)}${suffix}`;
    },
  );

  // Replace link href
  // Matches <link ... href="...">
  html = html.replace(
    /(<link(?:\s+[^>]*?)?\s+href=")([^"]+)(")/g,
    (match, prefix, href, suffix) => {
      return `${prefix}${transformUri(href)}${suffix}`;
    },
  );

  // Add nonce to all script tags
  html = html.replace(/<script/g, `<script nonce="${nonce}"`);

  return html;
}

function getNonce() {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
