import { HttpException } from '@nestjs/common';
import { ERROR } from '../error/codes';


export class AbsentKeyException extends HttpException {
  constructor(message: string, statusCode: number) {
    const error = ERROR.KEY_NOT_FOUND_ERROR(message);
    super(error, statusCode);
  }
}
