import { turn } from "./movements/turn.ts"
import { moveForward } from "./movements/move.ts"
import { convertPrint, getNextPos, initialState } from "../utils/utils.ts"
import { CommandExecutionState, Outcome, MarsCoordinates, Command } from "../utils/types.ts"

// Maps a 'last valid position' to the corresponding 'out of bounds' position for a failed operation
const lostRobotMap: Record<string, string> = {}


export const actionCommand = (command: Command, robotState: CommandExecutionState, maxPlanetSize: MarsCoordinates): CommandExecutionState => {
    const { orientation } = robotState

    if (command === "L") return turn(command, orientation)(robotState)
    if (command === "R") return turn(command, orientation)(robotState)
    if (command === "F") return moveForward(robotState, maxPlanetSize)

    return { ...robotState, operationOutcome: Outcome.Success }
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

export const run = (instructions: string[]): string[] => {
    // Using '!' for now so typescript stops moaning...
    const finalOutputArray = []
    // takes the first element (grid boundary) off the instruction string array, and separates into max x and y positions
    const [maxX, maxY] = instructions.shift()?.split(" ")
    const maxPos: MarsCoordinates = [parseInt(maxX), parseInt(maxY)]

    while (instructions.length > 0) {
        const [location, command] = [instructions.shift(), instructions.shift()]
        const state = executeCommand(command!, initialState(location!), maxPos)
        finalOutputArray.push(convertPrint(state!))
    }
    return finalOutputArray
}
