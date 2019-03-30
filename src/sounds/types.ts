export interface Sound {
  trigger: () => Promise<void>
  stop: () => Promise<void>
  prime: () => void
}
