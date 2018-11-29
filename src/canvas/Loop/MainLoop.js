import { DrawLines } from "../Draw/DrawLines";
import { countNextStep } from "../../Physics/RungyKutta/RungyKutta";

export function mainLoop(resolve, reject) {

        countNextStep();
        DrawLines();
}