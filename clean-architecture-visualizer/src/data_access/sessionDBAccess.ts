import type { SessionData } from "../types/sessionData.js";
import type { useCaseGraph } from "../entities/useCaseGraph.js";
import type { SessionDBAccessInterface } from "./sessionDBAccessInterface.js";
import { SessionDB } from "../database/sessionDb.js";
import type { cleanNode } from "../types/cleanNode.js";

export class SessionDBAccess implements SessionDBAccessInterface {
    private readonly db: SessionDB<SessionData>;

    constructor() {
        this.db = new SessionDB<SessionData>;
        this.db.load()
    }

    // Setters
    setProjectName(name: string) {
        this.db.set("projectName", name);
    }

    setNumUseCases(count: number) {
        this.db.set("numUseCases", count);
    }

    setNumViolations(count: number) {
        this.db.set("numViolations", count);
    }

    setUseCases(useCaseList: useCaseGraph[]): void {
        // add all new files to the "database"
        const existingFiles = this.db.get("files") ?? {};

        const newFiles = Object.fromEntries(
            useCaseList.flatMap(useCase => [...useCase.getFiles().entries()])
                .filter(([key]) => !(key in existingFiles))
        );

        this.db.set("files", { ...existingFiles, ...newFiles });

        // add the use case and file pointers to the "database"
        this.db.set("useCases", useCaseList.map((useCase, index) => ({
            id: `uc-${index}`,
            name: useCase.getName(),
            outNeighbours: useCase.getNeighbourMap(),
            fileKeys: [...useCase.getFiles().keys()],
            violationEdges: useCase.getViolationEdges(),
            missingNodes: useCase.getMissingNodes()
        })));
    }

    setFiles(fileMap: Record<string, string>) {
        this.db.set("files", fileMap);
    }

    setLayer(layerMap: Record<string, cleanNode>) {
        this.db.set("layers", layerMap);
    }

    // Getters
    getProjectName(): string {
        let name = this.db.get("projectName");
        if (!name) return "";
        return name;
    }

    getNumUseCases(): number {
        let count = this.db.get("numUseCases");
        if (!count) return 0;
        return count;
    }

    getNumViolations(): number {
        let count = this.db.get("numViolations");
        if (!count) return 0;
        return count;
    }

    getUseCaseInfo(id: string): SessionData["useCases"][number] | undefined {
        return this.db.get("useCases")?.find(useCase => useCase.id === id);
    }

    getFilePath(fileName: string): string | undefined {
        return this.db.get("files")?.[fileName];
    }

    getLayer(fileName: string): cleanNode | undefined {
        return this.db.get("layers")?.[fileName];
    }
}