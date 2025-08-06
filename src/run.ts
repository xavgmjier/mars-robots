import { convertPrint, initialState } from "../utils/utils.ts"
import { MarsCoordinates } from "../utils/types.ts"
import { executeCommand } from "./executeAction.ts"

export const run = (instructions: string[]): string => {
    // Using '!' for now so typescript stops moaning...
    const MAX_COORDINATE_VALUE = 50
    const finalOutputArray = []

    // takes the first element (grid boundary) off the instruction string array, and separates into max x and y positions
    const [maxX, maxY] = instructions.shift()?.split(" ")
    const maxXInt = parseInt(maxX)
    const maxYInt = parseInt(maxY)

    if (maxXInt > MAX_COORDINATE_VALUE || maxYInt > MAX_COORDINATE_VALUE ) return `Boundary coordinate must be less than ${MAX_COORDINATE_VALUE}`


    const maxPos: MarsCoordinates = [maxXInt, maxYInt]

    while (instructions.length > 0) {
        const [location, command] = [instructions.shift(), instructions.shift()]
        const state = executeCommand(command!, initialState(location!), maxPos)
        finalOutputArray.push(convertPrint(state!))
    }
    // return the result as a single string
    return finalOutputArray.join('\n')
}
