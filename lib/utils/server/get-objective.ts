import { Entity, ScoreboardObjective, world } from '@minecraft/server';

/**
 * @returns ScoreboardObjective. Creates a new one if it doesn't exist.
 */
export function getObjective(
  objectiveId: string,
  defaultValue?: {
    participant: string | Entity;
    value: number;
  },
) {
  let objective = world.scoreboard.getObjective(objectiveId);

  if (!objective) {
    try {
      objective = world.scoreboard.addObjective(objectiveId);
    } catch (e) {
      console.warn(e);
    }
  }

  if (defaultValue !== undefined) {
    objective?.setScore(defaultValue.participant, defaultValue.value);
  }

  return objective as ScoreboardObjective;
}
