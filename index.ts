export type Orientation = "N" | "E" | "S" | "W"
export type MarsCoordinates = [x: number, y: number]


export type Robot = {
    orientation: Orientation,
    position: MarsCoordinates
}

export enum Outcome {
    Success = "success",
    Failure = "failure"
} 

export type OperationOutcome = { operationOutcome: Outcome}

export type CommandExecutionState = Robot & OperationOutcome

const scentMapping: Record<string, string> = {}

const turnLeft = (x: Orientation) => (robot: Robot): CommandExecutionState => {
    // find a way to consolidate turnLeft() and turnRight()
    const turnLeftMapping: Record<Orientation, Orientation> = {
        "N": "W",
        "W": "S",
        "S": "E",
        "E": "N",
    }
    const updatedOrientation = turnLeftMapping[x]
    return {...robot, orientation: updatedOrientation, operationOutcome: Outcome.Success}
}

const turnRight = (x: Orientation) => (robot: Robot): CommandExecutionState => {
    const turnRightMapping: Record<Orientation, Orientation> = {
        "N": "E",
        "E": "S",
        "S": "W",
        "W": "N",
    }
    const updatedOrientation = turnRightMapping[x]
    return {...robot, orientation: updatedOrientation, operationOutcome: Outcome.Success}

}

const getNextPos = (orientation: Orientation, position: MarsCoordinates): MarsCoordinates => {
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

const isOutOfBounds = (next: MarsCoordinates, max: MarsCoordinates) => {
    
    if (next[0] < 0) console.log('next X position is less than 0')
    if (next[1] < 0) console.log('next Y position is less than 0')
    if (next[0] > max[0]) console.log('next X position greater than the planet boundary')
    if (next[1] > max[1]) console.log('next Y position greater than the planet boundary')

    // if the X or Y coordinates of the next position are less than '1'
    //  OR if the coordinates are beyond the Mars boundary
    return (next[0] < 0 || next[1] < 0 || next[0] > max[0] || next[1] > max[1])
}


const moveForward = (robotState: CommandExecutionState, maxPlanetSize: MarsCoordinates ): CommandExecutionState => {
    const nextPos = getNextPos(robotState.orientation, robotState.position)

    // if out of bounds then mark the operation as a fail
    if (isOutOfBounds(nextPos, maxPlanetSize)) return {...robotState, operationOutcome: Outcome.Failure}

    return {...robotState, position: getNextPos(robotState.orientation, robotState.position), operationOutcome: Outcome.Success}
}

export const actionCommand = (cmd: string, robotState: CommandExecutionState, maxPlanetSize: MarsCoordinates): CommandExecutionState => {
    const {orientation} = robotState

    if (cmd === "L") return turnLeft(orientation)(robotState)
    if (cmd === "R") return turnRight(orientation)(robotState)
    if (cmd === "F") return moveForward(robotState, maxPlanetSize)

    return {...robotState, operationOutcome: Outcome.Success}
}

export const executeCommand = (commands: string, robotState: CommandExecutionState, maxPlanetSize: MarsCoordinates): CommandExecutionState => {

    let currentState = robotState
    const commandList = commands.split('')
    console.log('cmds',commands)
    
    for (const command of commandList) {
        currentState = actionCommand(command, currentState, maxPlanetSize)
        console.log(currentState)

        if (currentState.operationOutcome === Outcome.Failure) {
            
            const nextCoordinates = getNextPos(currentState.orientation, currentState.position)
            
            const currentPos = `${currentState.position[0]} ${currentState.position[1]} ${currentState.orientation}`
            const failedPosition = `${nextCoordinates[0]} ${nextCoordinates[1]} ${currentState.orientation}`
            
            if (!scentMapping[currentPos]) {
                scentMapping[currentPos] = failedPosition
                console.log('fell off at this movement operation')
                console.log(scentMapping)
                break
            }

            if (scentMapping[currentPos]) {
                console.log('skiped command as it will lead to danger')
                console.log(scentMapping)
                continue
            }
        }
    }
    return currentState
}

const initialState = (location: string): CommandExecutionState => {
    const [x , y, orientation] = location.split(" ")
    return { orientation, position: [parseInt(x), parseInt(y)], operationOutcome: Outcome.Success} as CommandExecutionState
}

const print = (robotState: CommandExecutionState) => {
    const location = `${robotState.position[0]} ${robotState.position[1]} ${robotState.orientation}`
    return robotState.operationOutcome === Outcome.Success ? location : `${location} LOST`

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
        finalOutputArray.push(print(state!))
    }
    return finalOutputArray
}
