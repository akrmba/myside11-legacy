import { renderStalenessBanner, type BannerState } from "./staleness-banner";

export interface FollowAlongViewModel {
  state: BannerState;
  lastUpdatedIso: string;
  pointsText: string;
  rankText: string;
}

export function renderFollowAlongView(model: FollowAlongViewModel): string {
  const banner = renderStalenessBanner(model.state, model.lastUpdatedIso);
  return [
    `<section data-state="${model.state}">`,
    `<p>${model.pointsText}</p>`,
    `<p>${model.rankText}</p>`,
    `<p>${banner}</p>`,
    `</section>`,
  ].join("");
}

