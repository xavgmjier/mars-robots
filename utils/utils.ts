import { Orientation, MarsCoordinates, CommandExecutionState, Outcome } from "./types.ts"

export const getNextPos = (orientation: Orientation, position: MarsCoordinates): MarsCoordinates => {
    const [x, y] = position

    const moveMapping: Record<Orientation, MarsCoordinates> = {
        "N": [x, y + 1],
        "E": [x + 1, y],
        "S": [x, y - 1],
        "W": [x - 1, y],
    }

    return moveMapping[orientation]
}

export const isOutOfBounds = (next: MarsCoordinates, max: MarsCoordinates) => {
    // if the X or Y coordinates of the next position are less than '1'
    //  OR if the coordinates are beyond the Mars boundary
    return (next[0] < 0 || next[1] < 0 || next[0] > max[0] || next[1] > max[1])
}

export const initialState = (locationString: string): CommandExecutionState => {
    const [x, y, orientationString] = locationString.split(" ")
    const xInt = parseInt(x)
    const yInt = parseInt(y)
    const orientationValue = orientationString as Orientation

    return { orientation: orientationValue, position: [xInt, yInt], operationOutcome: Outcome.Success }
}

export const convertPrint = (robotState: CommandExecutionState) => {
    const location = `${robotState.position[0]} ${robotState.position[1]} ${robotState.orientation}`
    return robotState.operationOutcome === Outcome.Success ? location : `${location} LOST`

}

export const standardiseInstructionInput = (input: string) => {
    return input
        .split('\n')
        .map(string => string.trim())
        .filter(trimmedString => trimmedString !== '')
}