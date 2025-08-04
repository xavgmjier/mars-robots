import { run } from "./index.ts"
import { describe, expect, it, test } from 'vitest'


test('robot moves west off the edge and is lost', () => {
const program = ["0 0", "0 0 W", "F"]
    expect(run(program)).toEqual(["0 0 W LOST"])

})

test('robot moves south off the edge and is lost', () => {
    const program = ["0 0", "0 0 S", "F"]
    expect(run(program)).toEqual(["0 0 S LOST"])

})

test('robot moves north off the edge and is lost', () => {
    const program = ["0 0", "0 0 N", "F"]
    expect(run(program)).toEqual(["0 0 N LOST"])

})

test('robot moves east off the edge and is lost', () => {
    const program = ["0 0", "0 0 E", "F"]
    expect(run(program)).toEqual(["0 0 E LOST"])

})

test('executes a collection of robot commands with a provided world boundary', () => {
    const program = ["5 3", "1 1 E", "RFRFRFRF", "3 2 N", "FRRFLLFFRRFLL", "0 3 W", "LLFFFLFLFL"]
    expect(run(program)).toEqual(["1 1 E", "3 3 N LOST", "2 3 S"])
})
