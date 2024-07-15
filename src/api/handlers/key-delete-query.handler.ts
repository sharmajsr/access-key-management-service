import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { KeyClient } from 'src/connectors/clients';
import { KeyMapper } from '../core/mappers';
import { KeyDeleteQuery, KeyGetQuery, UserAccessGetQuery } from '../queries';

@QueryHandler(KeyDeleteQuery)
export class KeyDeleteHandler implements IQueryHandler<KeyDeleteQuery> {
  constructor(
    private readonly keyApiClient: KeyClient,
    private readonly keyMapper: KeyMapper,
  ) {}

  async execute(query: KeyDeleteQuery) {
    console.log(` her ${query.id}`)
    return await this.keyApiClient.deleteKey(query.id)  == 1? true : false;
  }
}
