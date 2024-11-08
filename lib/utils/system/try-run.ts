import { system } from '@minecraft/server';

import {
  SystemTryRunAction,
  SystemTryRunOptions,
  SystemTryRunResult,
} from '@inmine/common/types';

/**
 * Tries to run the function.
 * If the function returns undefined, it will attempt to run the function as many times as specified in the options.
 * @returns The result of the input function, or undefined if the function does not return any result after all attempts.
 */
export async function tryRun<TryRunResult, Params>(
  action: SystemTryRunAction<TryRunResult, Params>,
  options: SystemTryRunOptions,
): Promise<SystemTryRunResult<TryRunResult> | undefined> {
  if (options.attempts < 1) {
    return;
  }

  const actionResult = await action.function(action.params);

  if (actionResult) {
    if (actionResult.stop) {
      return;
    }
    return actionResult;
  }

  return new Promise<SystemTryRunResult<TryRunResult> | undefined>(
    (resolve) => {
      system.runTimeout(async () => {
        const result = await tryRun<TryRunResult, Params>(action, {
          attempts: options.attempts - 1,
          delay: options.delay,
        });
        resolve(result);
      }, options.delay);
    },
  );
}
