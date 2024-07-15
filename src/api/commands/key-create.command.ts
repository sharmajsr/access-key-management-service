import { Injectable } from '@nestjs/common';
import { KeyCreationDto } from '../core/dtos';

@Injectable()
export class KeyCreateCommand {
  constructor(public readonly keyCreationDto: KeyCreationDto) {}
}
