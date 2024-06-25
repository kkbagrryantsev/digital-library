export interface Book {
  id: string
  title: string
  author: string
  genre: string
  description: string
  // TODO Mind keeping files
  files: any[]
  isbn: string
  score: number
  votersNumber: number
}
