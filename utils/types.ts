export type Orientation = "N" | "E" | "S" | "W"

export type Command = "L" | "R" | "F"

export type RotationCommand = Exclude<Command, 'F'>

export type TurnMapping = Record<Orientation, Orientation>

export type MarsCoordinates = [x: number, y: number]

export type Robot = {
    orientation: Orientation,
    position: MarsCoordinates
}

export enum Outcome {
    Success = "success",
    Failure = "failure"
}

export type OperationOutcome = { operationOutcome: Outcome }

export type CommandExecutionState = Robot & OperationOutcome