import { Router } from "express";
import { APIController } from "../../interface_adapter/api/apiController.js";
import { APIInteractor } from "../../use_case/api/apiInteractor.js";
import { SessionDBAccess } from "../../data_access/sessionDBAccess.js";
import { CleanArchAccess } from "../../data_access/cleanArchInfoAccess.js";
import { APIOutputData } from "../../use_case/api/apiOutputData.js";
import { APIPresenter } from "../../interface_adapter/api/apiPresenter.js";

const router = Router();

const dbAccess = new SessionDBAccess();
const cleanArchAccess = new CleanArchAccess();
const outputData = new APIOutputData();
const interactor = new APIInteractor(dbAccess, cleanArchAccess, outputData);
const controller = new APIController(interactor);

router.get("/analysis/summary",  (_req, res) => {
    const presenter = new APIPresenter(outputData);
    controller.getProjectSummary();
    res.json(presenter.getOutputData());
})

export default router;