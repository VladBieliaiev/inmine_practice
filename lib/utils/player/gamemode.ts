import { GameMode, Player } from '@minecraft/server';

/**
 * DEPRECATED: Use `player.getGameMode()` instead.
 * @returns Player gamemode as string.
 */
export function gamemode(player: Player): GameMode | undefined {
  return !player.isValid()
    ? undefined
    : player.matches({
          gameMode: GameMode.creative,
        })
      ? GameMode.creative
      : player.matches({
            gameMode: GameMode.survival,
          })
        ? GameMode.survival
        : player.matches({
              gameMode: GameMode.adventure,
            })
          ? GameMode.adventure
          : GameMode.spectator;
}
