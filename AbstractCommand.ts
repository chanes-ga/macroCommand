import * as Rx from 'rxjs';
import {Observable} from "rxjs/Observable";

export abstract class AbstractCommand {

    abstract execute(message:any):Observable<any>;
}