import { Container } from '@minecraft/server';

/**
 * @returns True if inventory is empty.
 */
export function isEmpty(container: Container): boolean {
  return container.emptySlotsCount === container.size;
}
