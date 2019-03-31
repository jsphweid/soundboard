export interface Sound {
  trigger: () => Promise<void>
  stop: () => Promise<void>
  prime: () => void
}

export interface Coordinate {
  x: number
  y: number
}
