import { Injectable } from '@nestjs/common';

@Injectable()
export class KeyDeleteQuery {
  constructor(public readonly id: string) {}
}
