export interface IChat {
  id: string,
  name: string,
  owner: string,
  participants: string[]
}

export interface IChatCreator {
  id: string,
  label: string,
  value: number
}