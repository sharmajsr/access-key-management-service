import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { KeyClient } from "src/connectors/clients";
import { KeyCreateCommand } from "../commands";
import { KeyMapper } from "../core/mappers";


@CommandHandler(KeyCreateCommand)
export class KeyCreateCommandHandler  implements ICommandHandler<KeyCreateCommand>{
    constructor(
        private readonly keyApiClient: KeyClient,
        private readonly keyMapper: KeyMapper,
      ) {}

    async execute(command: KeyCreateCommand ){
        const keyView = await this.keyApiClient.createKey(command.keyCreationDto);

        return this.keyMapper.mapToKeyCreationModel(keyView);
    }
}