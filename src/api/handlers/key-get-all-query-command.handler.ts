import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { KeyClient } from 'src/connectors/clients';
import { KeyMapper } from '../core/mappers';
import { KeyGetQuery } from '../queries';
import { KeyGetAllQuery } from '../queries/key-get-all.query';

@QueryHandler(KeyGetAllQuery)
export class KeyGetAllQueryHandler implements IQueryHandler<KeyGetAllQuery> {
  constructor(
    private readonly keyApiClient: KeyClient,
    private readonly keyMapper: KeyMapper,
  ) {}

  async execute(query: KeyGetAllQuery) {
    const keyView = await this.keyApiClient.getAllKeyDetails();
  
    let finalResult = {};
    for (const key of keyView) {
      let data = await this.keyApiClient.getKeyDetails(key);
      finalResult[key] = data;
    }
    return finalResult;
  }
}
