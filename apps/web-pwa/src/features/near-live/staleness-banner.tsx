export type BannerState = "Expected" | "Delayed" | "Outage";

export function renderStalenessBanner(state: BannerState, lastUpdatedIso: string): string {
  if (state === "Expected") {
    return `Last updated ${lastUpdatedIso}.`;
  }
  if (state === "Delayed") {
    return `Data is delayed. Last updated ${lastUpdatedIso}.`;
  }
  return `Feed outage detected. Last updated ${lastUpdatedIso}.`;
}

