export type State = 'waiting' | 'inProgress' | 'done'

export interface TodoItem {
  id: number
  title: string
  body: string
  state: string
}
