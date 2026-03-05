import type { cleanNode } from "../types/cleanNode.js";

export interface CleanArchInfoAccessInterface {
    getValidOutNeighbours(): Promise<Record<cleanNode, cleanNode[]>>;
    getLearningModeInfo(): Promise<Record<cleanNode, string>>;
    getLayerInfo(): Promise<Record<string, string>>;
}