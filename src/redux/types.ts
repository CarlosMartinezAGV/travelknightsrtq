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
  startDate: string
  endDate: string
  userId: number
  stateId: number
}

export type CurrentState = {
  id: number
  currentStateAbbreviation: string
  currentStateTitle: string
  totalStateMemoryCount: number
}
