import type { SystemMemoryUsage } from '../types/current-page.types';

export async function getSystemMemoryUsage(): Promise<SystemMemoryUsage | null> {
  try {
    const memory = await browser.system.memory.getInfo();

    return {
      availableBytes: memory.availableCapacity,
      capacityBytes: memory.capacity,
    };
  } catch {
    return null;
  }
}
