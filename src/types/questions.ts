interface Question {
  title: string,
  question: string,
  options: string,
  answers: string[]
}

interface Answers {
  [key: string]: string | number | string[];
}
