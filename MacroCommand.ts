import {Observable} from "rxjs/Observable";
import {AbstractCommand} from './AbstractCommand';

export class MacroCommand extends AbstractCommand {
    private commands: Array<AbstractCommand> = [];

    add(command: AbstractCommand) {
        this.commands.push(command);
    }

    execute(message: any): Observable<any> {
        return null;
    }
}