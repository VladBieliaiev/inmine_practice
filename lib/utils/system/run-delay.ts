import { system } from '@minecraft/server';

/**
 * Run a callback after a delay
 * @param callback The callback to run
 * @param delay The delay in ticks. Default is 20 ticks (1 second)
 */
export const runDelay = (callback: () => void, delay: number = 20): number => {
  return system.runTimeout(() => {
    callback();
  }, delay);
};
