import { type AnalyticsEventName } from "./analytics-event-map";

export interface AnalyticsEventPublisherAPI {
  publish(eventName: AnalyticsEventName, payload: Record<string, unknown>): void;
  history(): Array<{ eventName: AnalyticsEventName; payload: Record<string, unknown> }>;
}

export class AnalyticsEventPublisher implements AnalyticsEventPublisherAPI {
  private readonly events: Array<{ eventName: AnalyticsEventName; payload: Record<string, unknown> }> =
    [];

  publish(eventName: AnalyticsEventName, payload: Record<string, unknown>): void {
    this.events.push({ eventName, payload });
  }

  history() {
    return [...this.events];
  }
}

