import type { GetProjectSummaryInputBoundary } from "./getProjectSummaryInputBoundary.js";
import type { SessionDBAccessInterface } from "../../data_access/sessionDBAccessInterface.js";
import type { GetProjectSummaryOutputData } from "./getProjectSummaryOutputData.js";

export class APIInteractor implements GetProjectSummaryInputBoundary {

    constructor(
            private readonly db: SessionDBAccessInterface,
            private readonly outputData: GetProjectSummaryOutputData
        ) {}

    async getProjectSummary(): Promise<void> {
        let result: { [key: string]: any } = {};

        // populate output JSON response
        const count = this.db.getNumUseCases()
        result.project_name = this.db.getProjectName();
        result.total_use_cases = count;
        result.total_violations = this.db.getNumViolations();
        result.use_cases = this.formatUseCaseInfo(count);

        this.outputData.setOutputData(result);
    }

    formatUseCaseInfo(count: number): { [key: string]: any}[] {
        let result: { [key: string]: any }[] = [];

        for (let useCase = 0; useCase < count; useCase++) {
            // use case from the database
            const currUC = this.db.getUseCaseInfo(`uc-${useCase}`);
            if (!currUC) {
                console.log(`Use Case: ${useCase} not found.`)
                continue;
            }
            // collection for use case to be output
            let curr: { [key: string]: any } = {};
            curr.id = currUC.id;
            curr.name = currUC.name;
            curr.violation_count = currUC.violationEdges.length;

            result.push(curr);
        }

        return result;
    }
}