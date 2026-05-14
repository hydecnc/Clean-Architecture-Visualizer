import chalk from "chalk";
import type { CreateUseCaseOutputBoundary } from "../../use_case/createUseCase/createUseCaseOutputBoundary.js";
import type { CreateUseCaseOutputData } from "../../use_case/createUseCase/createUseCaseOutputData.js";

export class CreateUseCasePresenter implements CreateUseCaseOutputBoundary {
    showSuccessView(createUseCaseOutputData: CreateUseCaseOutputData) {
        console.log(chalk.green(`Usecase ${createUseCaseOutputData.getUseCase()} has been created.`));
    }
    showFailView(error: string) {
        console.log(chalk.red(error));
    }
}
