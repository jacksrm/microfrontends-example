import { EventPayload } from '../types';

export function dispatchCustomEvent<T>(
  eventName: string,
  payload: EventPayload<T>,
) {
  const event = new CustomEvent(eventName, {
    detail: payload,
  });

  dispatchEvent(event);
}
