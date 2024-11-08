import { Player } from '@minecraft/server';

export interface FormHandler {
  open(player: Player): Promise<boolean>;
}
