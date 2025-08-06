import { Command, CommandExecutionState, MarsCoordinates, Outcome } from "../utils/types.ts"
import { getNextPos } from "../utils/utils.ts"
import { moveForward } from "./movements/move.ts"
import { turn } from "./movements/turn.ts"

// Maps a 'last valid position' to the corresponding 'out of bounds' position for a failed operation
const lostRobotMap: Record<string, string> = {}

export const actionCommand = (command: Command, robotState: CommandExecutionState, maxPlanetSize: MarsCoordinates): CommandExecutionState => {
    const { orientation } = robotState
    
    if (command === "L") return turn(command, orientation)(robotState)
    if (command === "R") return turn(command, orientation)(robotState)
    if (command === "F") return moveForward(robotState, maxPlanetSize)

    return { ...robotState }
}

export const executeCommand = (instructionString: string, robotState: CommandExecutionState, maxPlanetSize: MarsCoordinates): CommandExecutionState => {

    let currentState = robotState
    const commandList = instructionString.split('')
    console.log('cmds', instructionString)

    for (const command of commandList as Command[]) {
        currentState = actionCommand(command, currentState, maxPlanetSize)
        console.log(currentState)

        if (currentState.operationOutcome === Outcome.Failure) {

            const nextCoordinates = getNextPos(currentState.orientation, currentState.position)

            const currentPos = `${currentState.position[0]} ${currentState.position[1]} ${currentState.orientation}`
            const failedPosition = `${nextCoordinates[0]} ${nextCoordinates[1]} ${currentState.orientation}`

            if (!lostRobotMap[currentPos]) {
                lostRobotMap[currentPos] = failedPosition
                console.log('fell off at this movement operation')
                console.log(lostRobotMap)
                break
            }

            if (lostRobotMap[currentPos]) {
                console.log('skiped command as it will lead to danger')
                console.log(lostRobotMap)
                continue
            }
        }
    }
    return currentState
}