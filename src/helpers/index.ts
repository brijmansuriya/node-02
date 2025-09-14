export function assets(fileName: string | null | undefined) {
  if (!fileName) return null;
  return `${process.env.ASSET_URL}/${fileName}`;
}