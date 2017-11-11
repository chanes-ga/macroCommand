import * as Rx from 'rxjs';
import {Observable} from "rxjs/Observable";

export abstract class CommandAbstract {

    abstract execute(message:any):Observable<any>;
}