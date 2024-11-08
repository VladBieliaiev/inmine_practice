import {
  DimensionLocation,
  Entity,
  Player,
  system,
  Vector3,
  world,
} from '@minecraft/server';

import { InMineModuleFactory } from '@inmine/core/modules/module-factory';
import { Vector3Utils } from '@minecraft/math';

import { VladProjectModule } from './vlad-project.module';

const bootstrap = () => {
  InMineModuleFactory.register(VladProjectModule);

  // 1 Spawn pig using stick, spawn camel using torch

  const spawnEntityAtLocation = (
    entityType: string,
    location: DimensionLocation,
  ) => {
    system.runTimeout(() => {
      location.dimension.spawnEntity(
        entityType,
        Vector3Utils.add(location, { x: 0, y: 1, z: 0 }),
      );
    });
  };

  const getTargetLocation = (playerLocation: Vector3) => {
    return {
      x: playerLocation.x + 2,
      y: playerLocation.y,
      z: playerLocation.z + 2,
      dimension: world.getDimension('overworld'),
    };
  };

  world.beforeEvents.itemUse.subscribe((event) => {
    const usedItem = event.itemStack.typeId;
    const player = event.source;
    const targetLocation = getTargetLocation(player.location);

    switch (usedItem) {
      case 'minecraft:stick':
        spawnEntityAtLocation('minecraft:pig', targetLocation);
        break;
      case 'minecraft:torch':
        spawnEntityAtLocation('minecraft:camel', targetLocation);
        break;
      default:
        return;
    }
  });

  //2 Adding 'teleport' tag to 'inmine_vlp:chicken' and Teleportation betwen them

  let chicken1: Entity | null = null;
  let chicken2: Entity | null = null;

  const addTeleportTag = (entity: Entity, player: Player) => {
    if (!entity.hasTag('teleport')) {
      entity.addTag('teleport');
      player.sendMessage(`You have added a custom tag to the chicken!`);

      if (!chicken1) {
        chicken1 = entity;
        player.sendMessage(`First chicken set for teleportation.`);
      } else if (!chicken2) {
        chicken2 = entity;
        player.sendMessage(`Second chicken set for teleportation.`);
      } else {
        player.sendMessage(`Both chickens are already set for teleportation.`);
      }
    }
  };

  const teleportToChicken = (entity: Entity, player: Player) => {
    if (entity === chicken1 && chicken2) {
      const targetPosition = chicken2.location;
      player.teleport(targetPosition);
      player.sendMessage(`You have been teleported to the second chicken!`);
    } else if (entity === chicken2 && chicken1) {
      const targetPosition = chicken1.location;
      player.teleport(targetPosition);
      player.sendMessage(`You have been teleported to the first chicken!`);
    }
  };

  world.afterEvents.playerInteractWithEntity.subscribe((event) => {
    const entity = event.target;
    const player = event.player;

    if (entity.typeId === 'inmine_vlp:chicken') {
      try {
        addTeleportTag(entity, player);
        teleportToChicken(entity, player);
      } catch (error: any) {
        player.sendMessage(`Error adding tag: ${error.message}`);
      }
    }
  });

  // implemented this for checking entity tag by hurting them
  world.afterEvents.entityHurt.subscribe((event) => {
    if (event.hurtEntity) {
      world.sendMessage(event.hurtEntity.getTags().toString());
    }
  });
};

bootstrap();
