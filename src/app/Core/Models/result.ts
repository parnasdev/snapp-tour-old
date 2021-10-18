export class Result<dateType> {
  constructor(
    public isDone: boolean,
    public data: dateType = {} as dateType,
    public message: string,
    public paginate: any,
  ) {
  }
}
