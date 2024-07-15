import { Injectable } from '@nestjs/common';
import { KeyCreationDto, KeyUpdateDto } from '../core/dtos';

@Injectable()
export class KeyUpdateCommand {
  constructor(public readonly keyUpdateDto: KeyUpdateDto) {}
}
