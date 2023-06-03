export type State = {
  id: number
  name: string
  abbreviation: string
  userId: number
}

export type Memory = {
  id: number
  title: string
  city: string
  description: string
  date: string
  userId: number
  stateId: number
}
