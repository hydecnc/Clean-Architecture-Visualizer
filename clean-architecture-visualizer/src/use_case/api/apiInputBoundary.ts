export interface APIInputBoundary {
    getLearningMode(): Promise<void>;
    getProjectSummary(): Promise<void>;
}