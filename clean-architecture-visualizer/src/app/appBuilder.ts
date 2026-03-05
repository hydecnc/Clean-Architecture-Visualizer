import type { FileAccess } from "../data_access/fileAccess.js";
import type { CleanArchAccess } from "../data_access/cleanArchInfoAccess.js";

import type { GraphVerificationController } from "../interface_adapter/graphVerification/graphVerificationController.js";
import type { GraphVerificationInputBoundary } from "../use_case/graphVerification/graphVerificationInputBoundary.js";


export class AppBuilder {
    private fileAccess?: FileAccess;
    private validOutNeighbourAccess?: CleanArchAccess;
    private graphVerificationInteractor?: GraphVerificationInputBoundary;
    private graphVerificationController?: GraphVerificationController;

    // Data Access Layer
    withFileAccess(fileAccess: FileAccess): this {
        this.fileAccess = fileAccess;
        return this;
    }

    withValidOutNeighbourAccess(access: CleanArchAccess): this {
        this.validOutNeighbourAccess = access;
        return this;
    }

    // Use Case Layer
    buildGraphVerificationInteractor(
        InteractorClass: new (fileAccess: FileAccess, validOutNeighbourAccess: CleanArchAccess) => GraphVerificationInputBoundary
        ): this {
        if (!this.fileAccess || !this.validOutNeighbourAccess) {
            throw new Error("FileAccess and ValidOutNeighbourAccess must be set before building interactor");
        }

        this.graphVerificationInteractor = new InteractorClass(
            this.fileAccess,
            this.validOutNeighbourAccess
            );
        return this;
    }

    // Controller Layer
    buildGraphVerificationController(
        ControllerClass: new (interactor: GraphVerificationInputBoundary) => GraphVerificationController
        ): this {
        if (!this.graphVerificationInteractor) {
            throw new Error("GraphVerificationInteractor must be built before controller");
        }
        
        this.graphVerificationController = new ControllerClass(
            this.graphVerificationInteractor
            );
        return this;
    }

    build() {
        return {
            fileAccess: this.fileAccess!,
            validOutNeighbourAccess: this.validOutNeighbourAccess!,
            graphVerificationInteractor: this.graphVerificationInteractor!,
            graphVerificationController: this.graphVerificationController!,
        };
    }

    runGraphVerification() {
        this.graphVerificationController?.execute();
    }
}