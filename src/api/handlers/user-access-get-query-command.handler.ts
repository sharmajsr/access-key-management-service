import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { KeyClient } from 'src/connectors/clients';
import { KeyMapper } from '../core/mappers';
import { KeyGetQuery, UserAccessGetQuery } from '../queries';

@QueryHandler(UserAccessGetQuery)
export class UserAccessQueryHandler implements IQueryHandler<UserAccessGetQuery> {
  constructor(
    private readonly keyApiClient: KeyClient,
    private readonly keyMapper: KeyMapper,
  ) {}

  async execute(query: KeyGetQuery) {
    console.log(` her ${query.id}`)
    return await this.keyApiClient.userAccessGetQuery(query.id);
  }
}
