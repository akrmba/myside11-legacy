export type NearLiveState = "Expected" | "Delayed" | "Outage";

export interface NearLiveStateSnapshot {
  state: NearLiveState;
  lastUpdatedIso: string;
  message: string;
}

export class NearLiveStateService {
  getSnapshot(nowIso: string, lastUpdatedIso: string): NearLiveStateSnapshot {
    const ageSeconds = (new Date(nowIso).getTime() - new Date(lastUpdatedIso).getTime()) / 1000;

    if (ageSeconds <= 60) {
      return {
        state: "Expected",
        lastUpdatedIso,
        message: "Updates are near-live.",
      };
    }
    if (ageSeconds <= 300) {
      return {
        state: "Delayed",
        lastUpdatedIso,
        message: "Updates are delayed; showing latest available data.",
      };
    }
    return {
      state: "Outage",
      lastUpdatedIso,
      message: "Live feed unavailable; retrying in the background.",
    };
  }
}

