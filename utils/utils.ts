import { Orientation, MarsCoordinates, CommandExecutionState, Outcome } from "./types.ts"

export const getNextPos = (orientation: Orientation, position: MarsCoordinates): MarsCoordinates => {
    const [x, y] = position

    const moveMapping: Record<Orientation, MarsCoordinates> = {
        "N": [x, y + 1],
        "E": [x + 1, y],
        "S": [x, y - 1],
        "W": [x - 1, y],
    }

    // Scribble musings:
    // persist failed coordinates or operation states in a map?
    // and then look up the map to check if the flagged position exists 
    // then ignore coordinate position AND orientation (essentiallly a command) if it will result in a failure

    console.log(`next position: ${moveMapping[orientation][0]} ${moveMapping[orientation][1]} ${orientation}`)

    return moveMapping[orientation]
}

export const isOutOfBounds = (next: MarsCoordinates, max: MarsCoordinates) => {

    if (next[0] < 0) console.log('next X position is less than 0')
    if (next[1] < 0) console.log('next Y position is less than 0')
    if (next[0] > max[0]) console.log('next X position greater than the planet boundary')
    if (next[1] > max[1]) console.log('next Y position greater than the planet boundary')

    // if the X or Y coordinates of the next position are less than '1'
    //  OR if the coordinates are beyond the Mars boundary
    return (next[0] < 0 || next[1] < 0 || next[0] > max[0] || next[1] > max[1])
}

export const initialState = (locationString: string): CommandExecutionState => {
    const [x, y, orientation] = locationString.split(" ")
    return { orientation, position: [parseInt(x), parseInt(y)], operationOutcome: Outcome.Success } as CommandExecutionState
}

export const convertPrint = (robotState: CommandExecutionState) => {
    const location = `${robotState.position[0]} ${robotState.position[1]} ${robotState.orientation}`
    return robotState.operationOutcome === Outcome.Success ? location : `${location} LOST`

}