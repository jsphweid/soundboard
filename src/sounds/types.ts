export interface Sound {
  trigger: () => Promise<void>
  stop: () => Promise<void>
  prime: () => void
}

export interface Coordinate {
  x: number
  y: number
}

export interface AudioData {
  url: string
  start: number
  end: number
}
