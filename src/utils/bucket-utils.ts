export interface ParsedBucketKey {
  date: string;
  auth: string;
  relPath: string;
}

// Parses keys shaped as "<date>,<auth>,<relpath>". Returns null on malformed keys.
export function parseBucketKey(key: string): ParsedBucketKey | null {
  const first = key.indexOf(',');
  if (first < 0) return null;
  const second = key.indexOf(',', first + 1);
  if (second < 0) return null;

  const date = key.substring(0, first);
  const auth = key.substring(first + 1, second);
  const relPath = key.substring(second + 1);
  return { date, auth, relPath };
}
