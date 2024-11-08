import { ItemStack } from '@minecraft/server';

export interface BaseItemUseEventContext {
  itemStack?: ItemStack;
}
