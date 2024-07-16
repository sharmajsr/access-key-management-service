import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { KeyClient } from "src/connectors/clients";
import { KeyAddRequestsCommand, KeyCreateCommand } from "../commands";
import { KeyMapper } from "../core/mappers";


@CommandHandler(KeyAddRequestsCommand)
export class KeyAddRequestsCommandHandler  implements ICommandHandler<KeyAddRequestsCommand>{
    constructor(
        private readonly keyApiClient: KeyClient,
        private readonly keyMapper: KeyMapper,
      ) {}

    async execute(command: KeyAddRequestsCommand ){
        const keyView = await this.keyApiClient.addRequests(command.keyCreationDto.id);

        return keyView;
    }
}