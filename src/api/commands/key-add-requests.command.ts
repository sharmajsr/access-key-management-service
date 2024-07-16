import { Injectable } from '@nestjs/common';
import { KeyCreationDto } from '../core/dtos';

@Injectable()
export class KeyAddRequestsCommand {
  constructor(public readonly keyCreationDto: KeyCreationDto) {}
}
