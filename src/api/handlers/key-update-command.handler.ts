import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { KeyClient } from "src/connectors/clients";
import { KeyCreateCommand, KeyUpdateCommand } from "../commands";
import { KeyMapper } from "../core/mappers";


@CommandHandler(KeyUpdateCommand)
export class KeyUpdateCommandHandler  implements ICommandHandler<KeyUpdateCommand>{
    constructor(
        private readonly keyApiClient: KeyClient,
        private readonly keyMapper: KeyMapper,
      ) {}

    async execute(command: KeyUpdateCommand ){
        console.log(command.keyUpdateDto)
        const keyView = await this.keyApiClient.updateKey(command.keyUpdateDto.id,command.keyUpdateDto);

        return true;
    }
}