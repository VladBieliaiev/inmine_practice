import {
  DimensionLocation,
  Entity,
  EntityComponentTypes,
  EntityEquippableComponent,
  EquipmentSlot,
  Player,
  Vector3,
  world,
} from '@minecraft/server';

import { InMineModuleFactory } from '@inmine/core/modules/module-factory';
import { Vector3Utils } from '@minecraft/math';

import { VladProjectModule } from './vlad-project.module';

// Utility functions
const spawnEntityAtLocation = (
  entityType: string,
  location: DimensionLocation,
) => {
  try {
    const spawnPosition = Vector3Utils.add(location, { x: 0, y: 1, z: 0 });
    location.dimension.spawnEntity(entityType, spawnPosition);
  } catch (error) {
    console.error(`Failed to spawn entity ${error}`);
  }
};

const getTargetLocation = (playerLocation: Vector3) => {
  return {
    x: playerLocation.x + 2,
    y: playerLocation.y,
    z: playerLocation.z + 2,
    dimension: world.getDimension('overworld'),
  };
};

const removeItemAfterSummonChicken = (player: Player) => {
  const equipmentCompPlayer: any = player.getComponent(
    EntityComponentTypes.Equippable,
  ) as EntityEquippableComponent;
  equipmentCompPlayer.setEquipment(EquipmentSlot.Mainhand, null);
};

// Helper
const sendWorldMessage = (message: string) => {
  world.sendMessage(message);
};

// Chicken Binding Logic

let chicken1: Entity | null = null;
let chicken2: Entity | null = null;

const bindChicken = (chicken: Entity, isFirst: boolean) => {
  chicken.addTag('teleport');
  const chickenNumber = isFirst ? 1 : 2;
  sendWorldMessage(`chicken ${chickenNumber} id bound`);

  if (isFirst) chicken1 = chicken;
  else chicken2 = chicken;

  if (chicken1 && chicken2) {
    chicken1.addTag(`partner_id:${chicken2.id}`);
    chicken2.addTag(`partner_id:${chicken1.id}`);
    sendWorldMessage('chicken 1 and 2 are now connected!');
  }
};

const teleportToPartnerChicken = (chicken: Entity, player: Player) => {
  const partnerIdTag = chicken
    .getTags()
    .find((tag) => tag.startsWith('partner_id:'));
  if (!partnerIdTag) return sendWorldMessage('Partner not found!');

  const partnerId = partnerIdTag.split(':')[1];
  const partnerChicken = world.getEntity(partnerId);

  if (partnerChicken) {
    player.teleport(partnerChicken.location);
    sendWorldMessage('Teleported to your partner!');
  } else {
    sendWorldMessage('Partner chicken not found!');
  }
};

const handleChickenDeath = (deadChicken: Entity) => {
  if (deadChicken === chicken1) {
    if (chicken2) chicken2.removeTag(`partner_id:${deadChicken.id}`);
    chicken1 = null;
    sendWorldMessage('Chicken 1 has died. It can now be re-bound');
  } else if (deadChicken === chicken2) {
    if (chicken1) chicken1.removeTag(`partner_id:${deadChicken.id}`);
    chicken2 = null;
    sendWorldMessage('Chicken 2 has died. It can now be re-bound');
  }
};

// Event Handlers

const handleItemUse = (player: Player, itemId: string) => {
  const targetLocation = getTargetLocation(player.location);

  switch (itemId) {
    case 'minecraft:stick':
      spawnEntityAtLocation('minecraft:pig', targetLocation);
      break;
    case 'inmine_vlp:spawn_item':
      spawnEntityAtLocation('inmine_vlp:chicken', targetLocation);
      removeItemAfterSummonChicken(player);
      break;
    default:
      return;
  }
};

const handleChickenInteract = (chicken: Entity, player: Player) => {
  const heldItem = player.getComponent(
    EntityComponentTypes.Equippable,
  ) as EntityEquippableComponent;
  const mainHandItem = heldItem.getEquipment(EquipmentSlot.Mainhand);

  if (mainHandItem?.typeId === 'inmine_vlp:bind_item') {
    if (!chicken.hasTag('teleport')) {
      bindChicken(chicken, !chicken1);
    }
  } else teleportToPartnerChicken(chicken, player);
};

const bootstrap = () => {
  InMineModuleFactory.register(VladProjectModule);

  // Item Use Event
  world.afterEvents.itemUse.subscribe((event) => {
    const { source: player, itemStack } = event;
    handleItemUse(player, itemStack.typeId);
  });

  // Chicken Interaction Event
  world.afterEvents.playerInteractWithEntity.subscribe((event) => {
    const { target: chicken, player } = event;
    if (chicken.typeId === 'inmine_vlp:chicken')
      handleChickenInteract(chicken, player);
  });

  // Chicken Death Event
  world.afterEvents.entityDie.subscribe((event) => {
    const { deadEntity } = event;
    if (deadEntity.typeId === 'inmine_vlp:chicken')
      handleChickenDeath(deadEntity);
  });
};

bootstrap();
