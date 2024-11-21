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
import { ActionFormData } from '@minecraft/server-ui';

import { VladProjectModule } from './vlad-project.module';

// =========================
// Constants
// =========================
const DIMENSION_OVERWORLD = world.getDimension('overworld');
const MAX_MINOR_TOTEMS = 6;
const MAIN_TOTEM_TYPE = 'inmine_vlp:main_totem';
const MINOR_TOTEM_TYPE = 'inmine_vlp:totem';
const BIND_ITEM_TYPE = 'inmine_vlp:bind_item';
const SPAWN_MAIN_TOTEM_ITEM = 'inmine_vlp:spawn_main_totem';
const SPAWN_MINOR_TOTEM_ITEM = 'inmine_vlp:spawn_totem';
const TELEPORT_COOLDOWN = 6000;

const lastTeleportTimes: { [playerName: string]: number } = {};
// =========================
// Utility Functions
// =========================
const sendWorldMessage = (message: string): void => world.sendMessage(message);

const spawnEntityAtLocation = (
  entityType: string,
  location: DimensionLocation,
): Entity | null => {
  try {
    const spawnPosition = Vector3Utils.add(location, { x: 0, y: 1, z: 0 });

    return location.dimension.spawnEntity(entityType, spawnPosition);
  } catch (error) {
    console.error(`Failed to spawn entity (${entityType}): ${error}`);

    return null;
  }
};

const removeItemAfterSummon = (player: Player): void => {
  const equipmentComp = player.getComponent(
    EntityComponentTypes.Equippable,
  ) as EntityEquippableComponent;
  equipmentComp.setEquipment(EquipmentSlot.Mainhand, undefined);
};

const getTargetLocation = (playerLocation: Vector3): DimensionLocation => ({
  x: playerLocation.x + 2,
  y: playerLocation.y,
  z: playerLocation.z + 2,
  dimension: DIMENSION_OVERWORLD,
});

// =========================
// Totem Management
// =========================
let mainTotem: Entity | null = null;
let minorTotems: Entity[] = [];

const bindMinorTotem = (totem: Entity): void => {
  if (!mainTotem) return sendWorldMessage('No main totem available to bind!');

  const existingMainTotemId = totem.getDynamicProperty('mainTotemId') as
    | string
    | null;

  if (existingMainTotemId) {
    sendWorldMessage('This totem was previously bound. Rebinding...');
  } else if (minorTotems.length >= MAX_MINOR_TOTEMS) {
    return sendWorldMessage('Max number of minor totems already bound!');
  }

  totem.setDynamicProperty('mainTotemId', mainTotem.id);
  if (!minorTotems.includes(totem)) minorTotems.push(totem);
  sendWorldMessage('Minor totem successfully bound to the main totem!');
};

const teleportToMainTotem = (player: Player): void => {
  const playerName = player.nameTag;
  const currentTime = Date.now();

  if (
    lastTeleportTimes[playerName] &&
    currentTime - lastTeleportTimes[playerName] < TELEPORT_COOLDOWN
  ) {
    const remainingTime =
      TELEPORT_COOLDOWN - (currentTime - lastTeleportTimes[playerName]);

    return sendWorldMessage(
      `Teleport on cooldown! Please wait ${Math.ceil(remainingTime / 1500)} seconds.`,
    );
  }

  if (!mainTotem)
    return sendWorldMessage('No main totem available for teleportation!');

  const mainTotemLocation = mainTotem.getDynamicProperty(
    'location',
  ) as Vector3 | null;
  if (!mainTotemLocation)
    return sendWorldMessage('Main totem location not found!');

  player.teleport(mainTotemLocation);
  sendWorldMessage('Teleported to the main totem!');

  lastTeleportTimes[playerName] = currentTime;
};

const handleTotemDeath = (deadTotem: Entity): void => {
  if (deadTotem === mainTotem) {
    sendWorldMessage(
      'The main totem has been destroyed! Existing minor totems are unbound.',
    );
    mainTotem = null;
    minorTotems.forEach((totem) =>
      totem.setDynamicProperty('mainTotemId', undefined),
    );
    minorTotems = [];

    return;
  }

  minorTotems = minorTotems.filter((totem) => totem !== deadTotem);
  sendWorldMessage(
    'A minor totem has been destroyed. You can spawn a new one.',
  );
};

// =========================
// Form Management
// =========================

const openTotemForm = (player: Player): void => {
  const form = new ActionFormData()
    .title('Minor Totems Bound to Main Totem')
    .body('Select a minor totem ID from the list.');

  minorTotems.forEach((totem) =>
    form.button(`Totem ID: ${totem.id}`, 'textures/entity/chicken'),
  );

  form
    .show(player)
    .then((response) => {
      if (response.canceled) return;

      const selectedIndex = response.selection;

      if (selectedIndex !== undefined) {
        const selectedTotem = minorTotems[selectedIndex];
        if (selectedTotem) {
          openTotemActionForm(player, selectedTotem);
        }
      } else {
        sendWorldMessage('No valid minor totem selected.');
      }
    })
    .catch((error) => {
      console.error('Error displaying form:', error);
    });
};

const openTotemActionForm = (player: Player, totem: Entity): void => {
  const form = new ActionFormData()
    .title(`Minor Totem Options (ID: ${totem.id})`)
    .body('Select an option.')
    .button('Remove Minor Totem', 'textures/entity/chicken')
    .button('Teleport to Minor Totem', 'textures/entity/chicken');

  form.show(player).then((response) => {
    if (response.canceled) return;

    if (response.selection === 0) {
      minorTotems = minorTotems.filter((t) => t !== totem);
      totem.setDynamicProperty('mainTotemId', undefined);
      sendWorldMessage(`Minor Totem (ID: ${totem.id}) removed.`);
    } else if (response.selection === 1) {
      const totemLocation = totem.getDynamicProperty(
        'location',
      ) as Vector3 | null;
      if (totemLocation) player.teleport(totemLocation);
    }
  });
};

// =========================
// Check Existing Totems on World Load
// =========================

// const checkExistingTokensOnLoad = () => {
//   // Get all entities in the overworld dimension
//   const allEntities = DIMENSION_OVERWORLD.getEntities();

//   // Find and set the main and minor totems based on their types
//   allEntities.forEach((entity) => {
//     if (entity.typeId === MAIN_TOTEM_TYPE) {
//       mainTotem = entity;
//       sendWorldMessage(`Loaded Main Totem with ID ${mainTotem.id}`);
//     } else if (entity.typeId === MINOR_TOTEM_TYPE) {
//       bindMinorTotem(entity); // Bind existing minor totems
//     }
//   });
// };

// =========================
// Event Handlers
// =========================
const handleItemUse = (player: Player, itemId: string): void => {
  const targetLocation = getTargetLocation(player.location);

  if (itemId === SPAWN_MAIN_TOTEM_ITEM) {
    if (mainTotem) return sendWorldMessage('Main totem already exists!');
    mainTotem = spawnEntityAtLocation(MAIN_TOTEM_TYPE, targetLocation);
    mainTotem?.setDynamicProperty('location', targetLocation);
    removeItemAfterSummon(player);
  } else if (itemId === SPAWN_MINOR_TOTEM_ITEM) {
    if (minorTotems.length >= MAX_MINOR_TOTEMS)
      return sendWorldMessage('Maximum minor totems reached!');
    const minorTotem = spawnEntityAtLocation(MINOR_TOTEM_TYPE, targetLocation);
    minorTotem?.setDynamicProperty('location', targetLocation);
    removeItemAfterSummon(player);
  }
};

const handleTotemInteract = (totem: Entity, player: Player): void => {
  const heldItem = player.getComponent(
    EntityComponentTypes.Equippable,
  ) as EntityEquippableComponent;
  const mainHandItem = heldItem.getEquipment(EquipmentSlot.Mainhand);

  if (mainHandItem?.typeId === BIND_ITEM_TYPE) {
    bindMinorTotem(totem);
  } else if (totem.getDynamicProperty('mainTotemId') === mainTotem?.id) {
    teleportToMainTotem(player);
  }
};

// =========================
// Bootstrap
// =========================
const bootstrap = (): void => {
  InMineModuleFactory.register(VladProjectModule);

  // checkExistingTokensOnLoad();

  world.afterEvents.itemUse.subscribe(({ source, itemStack }) =>
    handleItemUse(source, itemStack.typeId),
  );

  world.afterEvents.playerInteractWithEntity.subscribe(({ target, player }) => {
    if (target.typeId === MAIN_TOTEM_TYPE) openTotemForm(player);
    if (target.typeId === MINOR_TOTEM_TYPE) handleTotemInteract(target, player);
  });

  world.afterEvents.entityDie.subscribe(({ deadEntity }) => {
    if ([MAIN_TOTEM_TYPE, MINOR_TOTEM_TYPE].includes(deadEntity.typeId))
      handleTotemDeath(deadEntity);
  });
};

bootstrap();
