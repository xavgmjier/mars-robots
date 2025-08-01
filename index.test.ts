import { execute, MarsCoordinates, Orientation, Robot } from "./index.ts"
import { describe, expect, it, test } from 'vitest'


const START_POSITION: MarsCoordinates = [1, 1]

const robot = (orientation: Orientation, position: MarsCoordinates = START_POSITION): Robot => ({
    orientation,
    position
}) 

// test.each`
//     original | expected
//     ${"N"}   ${"W"} 
//     ${"W"}   ${"S"} 
//     ${"S"}   ${"E"} 
//     ${"E"}   ${"N"} 
//     ` ("When facing $original, turning LEFT will result in facing $expected",
//     ({ original, expected }) => expect(turnLeft(original)).toBe(expected)
// )

test.each`
    original | expected | direction
    ${"N"}   ${"W"}     ${"L"}
    ${"W"}   ${"S"}     ${"L"}
    ${"S"}   ${"E"}     ${"L"}
    ${"E"}   ${"N"}     ${"L"}
    ${"N"}   ${"E"}     ${"R"}
    ${"W"}   ${"N"}     ${"R"}
    ${"S"}   ${"W"}     ${"R"}
    ${"E"}   ${"S"}     ${"R"}

    ` ("(execute) When facing $original, turning $direction will result in facing $expected",
    ({ original, expected, direction }) => {
        // const initialState: Rover = { orientation: original, position: [1, 1] }
        expect(execute(direction, robot(original))).toEqual(robot(expected))
    }
)

// test.each`
//     original | expected
//     ${"N"}   ${"E"} 
//     ${"W"}   ${"N"} 
//     ${"S"}   ${"W"} 
//     ${"E"}   ${"S"} 
//     ` ("(execute) When facing $original, turning RIGHT will result in facing $expected",
//    ({ original, expected }) => {
//         const initialState: Rover = {orientation: original, position: [1, 1]}

//         expect(execute("R", initialState)).toEqual({...initialState, orientation: expected})
//     }
// )

// test.each`
//     original | expected
//     ${"N"}   ${"E"} 
//     ${"W"}   ${"N"} 
//     ${"S"}   ${"W"} 
//     ${"E"}   ${"S"} 
//     ` ("When facing $original, turning RIGHT will result in facing $expected",
//     ({ original, expected }) => expect(turnRight(original)).toBe(expected)
// )


test("(execute) When moving north, we increment the Y Coordinate", () => {
    // const initialState: Rover = { orientation: "N", position: [1, 1] }
    expect(execute("F", robot("N"))).toEqual(robot("N", [1, 2]))

})

// test.each`
//     orientation|initialPosition|expectedPosition|operation|axis
//     ${"N"}      ${[1, 1]}      ${[1, 2]}        increment  Y
//     ${"E"}      ${[1, 1]}      ${[2, 1]}        increment  X
//     ${"S"}      ${[1, 1]}      ${[1, 0]}        decrement  Y
//     ${"W"}      ${[1, 1]}      ${[0, 1]}        decrement  X

//     ` ("(execute) When moving $orientation, we $operation the $axis coordinate",
//     ({ orientation, initialPosition, expectedPosition }) => {
//         // const initialState: Rover = { orientation, position: initialPosition }
//         // const position = expectedPosition as 
//         expect(execute("F", { orientation, position: initialPosition })).toEqual({
//             position: expectedPosition
//         })
//     }
// )

test("(execute) When moving east, we increment the X Coordinate", () => {
    // const initialState: Rover = { orientation: "E", position: [1, 1] }
    expect(execute("F", robot("E"))).toEqual(robot("E", [2, 1]))

})

test("(execute) When moving south, we decrement the Y Coordinate", () => {
    // const initialState: Rover = { orientation: "S", position: [1, 1] }
    expect(execute("F", robot("S"))).toEqual(robot("S", [1, 0]))

})

test("(execute) When moving west, we decrement the X Coordinate", () => {
    // const initialState: Rover = { orientation: "W", position: [1, 1] }
    expect(execute("F", robot("W"))).toEqual(robot("W", [0, 1]))

})


 /////////////


test.only("(execute) When executing a string if commands", () => {
    // const initialState: Rover = { orientation: "W", position: [1, 1] }
    expect(execute("RFRFRFRF", robot("E", [1,1]))).toEqual(robot("E", [1,1]))

})


// test("When moving north, we increment the Y Coordinate", () => {
//     expect(move("N", [1, 1])).toEqual([1, 2])

// })

// test("When moving east, we increment the X Coordinate", () => {
//     expect(move("E", [1, 1])).toEqual([2, 1])

// })

// test("When moving south, we decrement the Y Coordinate", () => {
//     expect(move("S", [1, 1])).toEqual([1, 0])

// })

// test("When moving west, we decrement the X Coordinate", () => {
//     expect(move("W", [1, 1])).toEqual([0, 1])

// })