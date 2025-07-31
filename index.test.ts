import { testFunc } from "./index.ts"
import { describe, expect, it, test } from 'vitest'

type Orientation = "N" | "E" | "S" | "W"

const turnLeft = (x: Orientation) => {
    const turnLeftMapping: Record<Orientation, Orientation> = {
        "N" : "W",
        "W" : "S",
        "S" : "E",
        "E" : "N",
    }
    return turnLeftMapping[x]
}

test.each`
    original | expected
    ${"N"}   ${"W"} 
    ${"W"}   ${"S"} 
    ${"S"}   ${"E"} 
    ${"E"}   ${"N"} 
    ` ("When facing $original, turning LEFT will result in facing $expected",
    ({ original, expected }) => expect(turnLeft(original)).toBe(expected)
)
  