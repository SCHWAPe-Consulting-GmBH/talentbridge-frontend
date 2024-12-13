interface ISmallCourseSlideHub {
  time: number,
  date: string,
  premium: boolean,
  title: string,
  description: string,
}

export interface ISlideHub {
  biggest: string,
  small: ISmallCourseSlideHub[]
}