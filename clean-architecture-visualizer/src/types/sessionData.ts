import type { cleanNode } from "./cleanNode.js"
import type { neighbourMap } from "./neighbourMap.js"

export type SessionData = {
    projectName: string,
    numUseCases: number,
    numViolations: number,
    useCases: {
        id: string,
        name: string,
        outNeighbours: neighbourMap,
        fileKeys: string[], // refers to the files map
        violationEdges: [cleanNode, cleanNode][],
        missingNodes: cleanNode[]
    }[],
    files: Record<string, string>,
    layers: Record<string, cleanNode>
}
