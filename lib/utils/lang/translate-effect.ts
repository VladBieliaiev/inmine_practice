import { Effect, RawMessage } from '@minecraft/server';

const effectUniqueTranslations: { [key: string]: string } = {
  conduit_power: 'potion.conduitPower',
  fire_resistance: 'potion.fireResistance',
  night_vision: 'potion.nightVision',
  water_breathing: 'potion.waterBreathing',
  health_boost: 'potion.healthBoost',
  nausea: 'potion.confusion',
  strength: 'potion.damageBoost',
  mining_fatigue: 'potion.digSlowDown',
  haste: 'potion.digSpeed',
  instant_damage: 'potion.harm',
  instant_health: 'potion.heal',
  jump_boost: 'potion.jump',
  slowness: 'potion.moveSlowdown',
  slow_falling: 'potion.slowFalling',
  speed: 'potion.moveSpeed',
  fatal_poison: 'potion.poison',
  village_hero: 'effect.villageHero',
  bad_omen: 'effect.badOmen',
  darkness: 'effect.darkness',
};

export function translateEffect(effect: Effect | string): RawMessage {
  if (typeof effect !== 'string') {
    effect = effect.typeId;
  }

  return {
    translate:
      effect in effectUniqueTranslations
        ? effectUniqueTranslations[effect]
        : `potion.${effect}`,
  };
}
