import { run } from "../src/run.ts"
import { describe, expect, test } from 'vitest'
import { standardiseInstructionInput } from "../utils/utils.ts"

describe("Turning robot left and right", () => {
    test.each`
    initial | expected | command
    ${"N"}  | ${"W"}    | ${"L"}
    ${"W"}  | ${"S"}    | ${"L"}
    ${"S"}  | ${"E"}    | ${"L"}
    ${"E"}  | ${"N"}    | ${"L"}
    ${"N"}  | ${"E"}    | ${"R"}
    ${"W"}  | ${"N"}    | ${"R"}
    ${"S"}  | ${"W"}    | ${"R"}
    ${"E"}  | ${"S"}    | ${"R"}

    ` ("When facing $initial, turning $command will result in facing $expected",
        ({ initial, expected, command }) => {
            const input = ["1 1", `0 0 ${initial}`, `${command}`]
            expect(run(input)).toEqual(`0 0 ${expected}`)
        }
    )

})

describe("Moving robot up and down", () => {

    test.each`
    orientation | initialPosition  | command  | expectedPosition | operation       | axis
    ${"N"}      | ${"1 1"}         | ${"F"}   | ${"1 2"}         | ${"increment"}  | ${"Y"}
    ${"E"}      | ${"1 1"}         | ${"F"}   | ${"2 1"}         | ${"increment"}  | ${"X"}
    ${"S"}      | ${"1 1"}         | ${"F"}   | ${"1 0"}         | ${"decrement"}  | ${"Y"}
    ${"W"}      | ${"1 1"}         | ${"F"}   | ${"0 1"}         | ${"decrement"}  | ${"X"}

    ` ("Facing $orientation, we $operation the $axis axis coordinate",
        ({ orientation, initialPosition, command, expectedPosition }) => {
            const input = ["2 2", `${initialPosition} ${orientation}`, `${command}`]
            expect(run(input)).toEqual(`${expectedPosition} ${orientation}`)
        }
    )

})

describe('Moving robot off the edge', () => {
    test.each`
    orientation | initialPosition  | command  | expectedPosition
    ${"N"}      | ${"0 0 N"}       | ${"F"}   | ${"0 0 N LOST"}    
    ${"E"}      | ${"0 0 E"}       | ${"F"}   | ${"0 0 E LOST"}    
    ${"S"}      | ${"0 0 S"}       | ${"F"}   | ${"0 0 S LOST"}    
    ${"W"}      | ${"0 0 W"}       | ${"F"}   | ${"0 0 W LOST"}    
    ` ("Robot moves $orientation off the edge and is LOST'",
        ({ initialPosition, command, expectedPosition }) => {
            const input = ["0 0", `${initialPosition}`, `${command}`]
            expect(run(input)).toEqual(`${expectedPosition}`)
        }
    )
})

describe('Execute whole instructions', () => {
    test('Skips commands that previously lost a robot', () => {
        const rawInput = 
            `3 3
            2 2 N
            LFFF

            3 2 N
            LFFFFFLF
            `
        const input = standardiseInstructionInput(rawInput)
        expect(run(input)).toEqual(["0 2 W LOST", "0 1 S"].join('\n'))

    })

    test('executes a collection of robot commands with a provided world boundary', () => {
        // based on the sample data
        const rawInput = 
        `5 3
        1 1 E
        RFRFRFRF
        
        3 2 N
        FRRFLLFFRRFLL
        
        0 3 W
        LLFFFLFLFL`
        const input = standardiseInstructionInput(rawInput)
        expect(run(input)).toEqual(["1 1 E", "3 3 N LOST", "2 3 S"].join("\n"))
    })
})

test('Catches Mars X and Y coordinates that are greater than 50', () => {
    const input = ["0 51", "0 0 W", "F"]
    expect(run(input)).toEqual("Boundary coordinate must be less than 50")

})
