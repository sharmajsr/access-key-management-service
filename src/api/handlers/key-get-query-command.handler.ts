import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { KeyClient } from 'src/connectors/clients';
import { KeyMapper } from '../core/mappers';
import { KeyGetQuery } from '../queries';

@QueryHandler(KeyGetQuery)
export class KeyGetQueryHandler implements IQueryHandler<KeyGetQuery> {
  constructor(
    private readonly keyApiClient: KeyClient,
    private readonly keyMapper: KeyMapper,
  ) {}

  async execute(query: KeyGetQuery) {
    console.log(` her ${query.id}`)
    const keyView = await this.keyApiClient.getKeyDetails(query.id);

    console.log(`keyview `,keyView)
    return this.keyMapper.mapToKeyRetrieveModel(keyView);
  }
}
