export type State = 'waiting' | 'inProgress' | 'done' | null

export interface TodoItem {
  id: number
  title: string
  body: string
  state: string
}
