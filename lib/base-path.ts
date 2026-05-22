const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: `/${string}`) {
  return `${basePath}${path}`;
}

export function withoutBasePath(path: string) {
  if (!basePath || !path.startsWith(basePath)) return path;

  const nextPath = path.slice(basePath.length);
  return nextPath || "/";
}
