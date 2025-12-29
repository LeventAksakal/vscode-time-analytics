export interface ParsedBucketKey {
  date: string;
  auth: string;
  branch: string;
  relPath: string;
}

// Parses keys shaped as "<date>,<auth>,<branch>,<relpath>". Returns null on malformed keys.
export function parseBucketKey(key: string): ParsedBucketKey | null {
  const first = key.indexOf(',');
  if (first < 0) return null;
  const second = key.indexOf(',', first + 1);
  if (second < 0) return null;
  const third = key.indexOf(',', second + 1);
  if (third < 0) return null;

  const date = key.substring(0, first);
  const auth = key.substring(first + 1, second);
  const branch = key.substring(second + 1, third);
  const relPath = key.substring(third + 1);
  return { date, auth, branch, relPath };
}
