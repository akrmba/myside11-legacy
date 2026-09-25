export interface ShareableRow {
  alias: string;
  rank: number;
  points: number;
}

export function renderShareableLeaderboard(rows: ShareableRow[]): string {
  const items = rows
    .map((row) => `<li>#${row.rank} ${row.alias} - ${row.points} pts</li>`)
    .join("");
  return `<ol>${items}</ol>`;
}

