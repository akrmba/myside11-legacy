package feature.parity

enum class NearLiveState {
    EXPECTED,
    DELAYED,
    OUTAGE
}

enum class EntitlementState {
    FREE,
    PRO,
    UNKNOWN
}

data class NearLiveEntitlementState(
    val nearLiveState: NearLiveState,
    val entitlementState: EntitlementState,
    val lastUpdatedIso: String
)

