import {Observable} from "rxjs/Observable";
import {AbstractCommand} from "./AbstractCommand";

export class CompositeCommand extends AbstractCommand {
    execute(message: any): Observable<any> {
        return Observable.empty();
    }
}