export type Orientation = "N" | "E" | "S" | "W"
export type MarsCoordinates = [x: number, y: number]

export type Robot = {
    orientation: Orientation,
    position: MarsCoordinates
}

const turnLeft = (x: Orientation) => (robot: Robot): Robot => {
    // find a way to consolidate turnLeft() and turnRight()
    const turnLeftMapping: Record<Orientation, Orientation> = {
        "N": "W",
        "W": "S",
        "S": "E",
        "E": "N",
    }
    const updatedOrientation = turnLeftMapping[x]
    return {...robot, orientation: updatedOrientation}
}

const turnRight = (x: Orientation) => (robot: Robot): Robot => {
    const turnRightMapping: Record<Orientation, Orientation> = {
        "N": "E",
        "E": "S",
        "S": "W",
        "W": "N",
    }
    const updatedOrientation = turnRightMapping[x]
    return {...robot, orientation: updatedOrientation}

}

const getNextPos = (orientation: Orientation, position: MarsCoordinates): MarsCoordinates => {
    // const {orientation, position} = robot
    const [x, y] = position

    const moveMapping: Record<Orientation, MarsCoordinates> = {
        "N": [x, y + 1],
        "E": [x + 1, y],
        "S": [x, y - 1],
        "W": [x - 1, y],
    }

    return moveMapping[orientation]
}

const moveForward = (robot: Robot): Robot => {
    const {orientation, position} = robot
    return {...robot, position: getNextPos(orientation, position)}

}

export const actionCommand = (cmd: string, robotState: Robot): Robot => {
    const {orientation} = robotState

    if (cmd === "L") return turnLeft(orientation)(robotState)
    if (cmd === "R") return turnRight(orientation)(robotState)
    if (cmd === "F") return moveForward(robotState)
    return robotState
}

export const execute = (commands: string, robotState: Robot) => {
    let res = robotState
    const commandList = commands.split('')

    commandList.forEach(cmd => {
        res = actionCommand(cmd, robotState)
    })
    return res
}
