package feature.parity

class NearLiveEntitlementRenderer {
    fun render(state: NearLiveEntitlementState, viewModel: NearLiveEntitlementViewModel): String {
        val banner = viewModel.bannerMessage(state)
        val pro = if (viewModel.allowProFeatures(state)) "PRO_ON" else "PRO_OFF"
        val ads = if (viewModel.shouldShowAds(state)) "ADS_ON" else "ADS_OFF"
        return "$banner|$pro|$ads"
    }
}

