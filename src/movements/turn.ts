import { Orientation, Robot, CommandExecutionState, Outcome, TurnMapping, RotationCommand } from "../../utils/types.ts"

const turnLeftMapping: TurnMapping = {
        "N": "W",
        "W": "S",
        "S": "E",
        "E": "N",
    }

const turnRightMapping: TurnMapping = {
        "N": "E",
        "E": "S",
        "S": "W",
        "W": "N",
    }

export const turn = (command: RotationCommand, currentOrientation: Orientation) => (robot: Robot): CommandExecutionState => {
    const updatedOrientation = command === "L" ? turnLeftMapping[currentOrientation] : turnRightMapping[currentOrientation]
    return {...robot, orientation: updatedOrientation, operationOutcome: Outcome.Success}
}
