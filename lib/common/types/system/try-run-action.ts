export type SystemTryRunAction<TryRunResult, Params> = {
  function: (
    params?: Params,
  ) =>
    | Promise<SystemTryRunResult<TryRunResult>>
    | SystemTryRunResult<TryRunResult>;
  params?: Params;
};

export type SystemTryRunResult<T> =
  | {
      result?: T;
      stop?: boolean;
    }
  | undefined;
