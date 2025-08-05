import { run } from "../src/index.ts"
import { describe, expect, test } from 'vitest'

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
            expect(run(input)).toEqual([`0 0 ${expected}`])
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
            // const initialState: Rover = { orientation, position: initialPosition }
            const input = ["2 2", `${initialPosition} ${orientation}`, `${command}`]
            expect(run(input)).toEqual([`${expectedPosition} ${orientation}`])
        }
    )

})

describe('Moving off the edge', () => {

    test('robot moves west off the edge and is lost', () => {
        const input = ["0 0", "0 0 W", "F"]
        expect(run(input)).toEqual(["0 0 W LOST"])

    })

    test('robot moves south off the edge and is lost', () => {
        const input = ["0 0", "0 0 S", "F"]
        expect(run(input)).toEqual(["0 0 S LOST"])

    })

    test('robot moves north off the edge and is lost', () => {
        const input = ["0 0", "0 0 N", "F"]
        expect(run(input)).toEqual(["0 0 N LOST"])

    })

    test('robot moves east off the edge and is lost', () => {
        const input = ["0 0", "0 0 E", "F"]
        expect(run(input)).toEqual(["0 0 E LOST"])

    })
})

describe('Execute whole instructions', () => {
    test('executes a collection of robot commands with a provided world boundary', () => {
        const input = ["5 3", "1 1 E", "RFRFRFRF", "3 2 N", "FRRFLLFFRRFLL", "0 3 W", "LLFFFLFLFL"]
        expect(run(input)).toEqual(["1 1 E", "3 3 N LOST", "2 3 S"])
    })
})
