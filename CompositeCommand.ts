import {Observable} from "rxjs/Observable";
import {CommandAbstract} from "./CommandAbstract";

export class CompositeCommand extends CommandAbstract {
    execute(message: any): Observable<any> {
        return Observable.empty();
    }
}