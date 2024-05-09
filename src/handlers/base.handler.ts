class BaseHandler<T extends Object> {
  constructor(protected readonly _repo: T) {}
}

export { BaseHandler };
