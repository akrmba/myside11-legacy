package feature.parity

import kotlin.test.Test
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class NearLiveEntitlementParityTest {
    @Test
    fun proUsersHideAdsAndEnableProFeatures() {
        val viewModel = NearLiveEntitlementViewModel()
        val state = NearLiveEntitlementState(
            nearLiveState = NearLiveState.EXPECTED,
            entitlementState = EntitlementState.PRO,
            lastUpdatedIso = "2026-02-15T12:00:00Z"
        )

        assertTrue(viewModel.allowProFeatures(state))
        assertFalse(viewModel.shouldShowAds(state))
    }
}

