import type { cleanNode } from "../types/cleanNode.js";
import type { SessionData } from "../types/sessionData.js";

export interface SessionDBAccessInterface {
    // Setters
    setProjectName(name: string): void;
    setNumUseCases(count: number): void;
    setNumViolations(count: number): void;
    setUseCases(useCaseList: object[]): void;
    setFiles(fileMap: Record<string, string>): void;
    setLayer(layerMap: Record<string, cleanNode>): void;

    // Getters
    getProjectName(): string;
    getNumUseCases(): number;
    getNumViolations(): number;
    getUseCaseInfo(id: string): SessionData["useCases"][number] | undefined;
    getFilePath(fileName: string): string | undefined;
    getLayer(fileName: string): cleanNode | undefined;
}