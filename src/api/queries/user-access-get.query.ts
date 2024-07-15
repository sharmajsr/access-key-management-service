import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAccessGetQuery {
  constructor(public readonly id: string) {}
}
