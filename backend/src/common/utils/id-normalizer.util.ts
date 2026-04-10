export function normalizeIdLike(value: unknown, maxDepth = 4): string | null {
  const seen = new Set<unknown>();
  let current: unknown = value;

  for (let depth = 0; depth < maxDepth; depth += 1) {
    if (current == null) {
      return null;
    }

    if (typeof current === 'string' || typeof current === 'number') {
      const normalized = String(current).trim();
      return normalized.length > 0 ? normalized : null;
    }

    if (typeof current !== 'object') {
      return null;
    }

    if (seen.has(current)) {
      return null;
    }
    seen.add(current);

    const candidate = current as {
      _id?: unknown;
      id?: unknown;
      toHexString?: () => string;
      toString?: () => string;
    };

    if (typeof candidate.toHexString === 'function') {
      const hex = candidate.toHexString().trim();
      if (hex.length > 0) {
        return hex;
      }
    }

    if ('_id' in candidate && candidate._id && candidate._id !== current) {
      current = candidate._id;
      continue;
    }

    if ('id' in candidate && candidate.id && candidate.id !== current) {
      current = candidate.id;
      continue;
    }

    if (typeof candidate.toString === 'function') {
      const normalized = candidate.toString().trim();
      return normalized && normalized !== '[object Object]' ? normalized : null;
    }

    return null;
  }

  return null;
}
