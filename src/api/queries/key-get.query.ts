import { Injectable } from '@nestjs/common';

@Injectable()
export class KeyGetQuery {
  constructor(public readonly id: string) {}
}
