import { ItemStack } from '@minecraft/server';

import { Slot } from '@inmine/common/types';

import { VaultyRepositoryProcessor } from './processor';

export class VaultyRepositoryPanel {
  private processor: VaultyRepositoryProcessor;

  constructor(processorInstance: VaultyRepositoryProcessor) {
    this.processor = processorInstance;
  }

  /**
   * @returns Content of current Vaulty Repository.
   */
  get content() {
    return this.processor.content;
  }

  /**
   * @returns Content of the current Vaulty Repository as array.
   */
  get contentArray() {
    return Array.from(this.processor.content);
  }

  /**
   * @returns Items of the current Vaulty Repository.
   */
  get items() {
    return [...this.processor.content.values()];
  }

  /**
   * @returns Size of the current Vaulty Repository.
   */
  get size() {
    return this.processor.size;
  }

  async container() {
    return this.processor.container();
  }

  /**
   * @returns ItemStack by slot id.
   */
  getItem(slot: Slot): ItemStack | undefined {
    return this.processor.content.get(slot);
  }

  /**
   * @returns Updates slot using input Item.
   */
  setItem(slot: Slot, item: ItemStack) {
    return this.processor.set(slot, item);
  }

  /**
   * @returns Deletes input slot item.
   */
  removeItem(slot: Slot) {
    return this.processor.remove(slot);
  }

  /**
   * @saves Current Vaulty Repository data.
   */
  async save() {
    return this.processor.save();
  }

  /**
   * @clears Current Vaulty Repository items.
   */
  clearAll() {
    this.processor.clear();
  }
}
