export class Email {
  constructor(
    private value: string,
  ) {}
}

export class MagicToken {
  readonly value: string;

  constructor(destination: Email) {
    this.value = 'eita';
  }
}
