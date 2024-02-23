import dayjs, { Dayjs } from "dayjs"

export const mod = (x: number, y: number): number => (x % y + y) % y

export const calculateCircularDistance = (xIndex: number, yIndex: number, listLength: number): number => {
  const forwardDistance = mod(xIndex - yIndex, listLength)
  const backwardsDistance = mod(yIndex - xIndex, listLength)
  return Math.min(forwardDistance, backwardsDistance)
}

export const closestMultiple = (x: number, y: number): number => {
  const remainder = mod(x, y)
  const below = x - remainder
  const above = below + y
  const closestMultiple = (x - below < above - x) ? below : above
  return closestMultiple
}

export function round(number: number, increment: number) {
  return Math.round((number) / increment) * increment
}

export const isNow = (dateTime: Dayjs) => {
    return dateTime.format('YYYYMMDDHHmm') == dayjs().format('YYYYMMDDHHmm')
  }