import { CommandExecutionState, MarsCoordinates, Outcome } from "../../utils/types.ts"
import { getNextPos, isOutOfBounds } from "../../utils/utils.ts"

export const moveForward = (robotState: CommandExecutionState, maxPlanetSize: MarsCoordinates): CommandExecutionState => {
    const nextPos = getNextPos(robotState.orientation, robotState.position)

    // if out of bounds then mark the operation as a fail
    if (isOutOfBounds(nextPos, maxPlanetSize)) return { ...robotState, operationOutcome: Outcome.Failure }

    return { ...robotState, position: getNextPos(robotState.orientation, robotState.position), operationOutcome: Outcome.Success }
}
