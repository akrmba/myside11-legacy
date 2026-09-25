package feature.parity

class NearLiveEntitlementViewModel {
    fun bannerMessage(state: NearLiveEntitlementState): String {
        return when (state.nearLiveState) {
            NearLiveState.EXPECTED -> "Updates are near-live."
            NearLiveState.DELAYED -> "Updates are delayed. Last updated ${state.lastUpdatedIso}."
            NearLiveState.OUTAGE -> "Feed unavailable. Last updated ${state.lastUpdatedIso}."
        }
    }

    fun allowProFeatures(state: NearLiveEntitlementState): Boolean {
        return state.entitlementState == EntitlementState.PRO
    }

    fun shouldShowAds(state: NearLiveEntitlementState): Boolean {
        return state.entitlementState != EntitlementState.PRO
    }
}

