import { NearLiveStateService, type NearLiveStateSnapshot } from "../services/near-live-state-service";

export interface NearLiveStatusAPI {
  getNearLiveStatus(nowIso: string, lastUpdatedIso: string): NearLiveStateSnapshot;
}

export class NearLiveController implements NearLiveStatusAPI {
  private readonly stateService = new NearLiveStateService();

  getNearLiveStatus(nowIso: string, lastUpdatedIso: string): NearLiveStateSnapshot {
    return this.stateService.getSnapshot(nowIso, lastUpdatedIso);
  }
}

