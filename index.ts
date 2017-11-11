import * as Rx from 'rxjs';
import * as _ from 'lodash';

/*
 menuclick call execute on macrocommand

 macrocommand instantiated with an array of observables that emit a command
 1) execute => validate selection
 2) execute => shows dialog
 3) execute => dialog button click
 4) validate input
 5) do action


 But what emits the command and completes?
 */


class Command {
    constructor(private num: number) {
        this.execute = this.execute.bind(this);
    }

    execute() {
        const num = this.num;
        return Rx.Observable.create(function (observer: Rx.Observer<Command>) {
            const x = Math.floor(Math.random() * 100);
            console.log('x',x);
            setTimeout(() => {
                if (x < 55) {
                    console.log(`Executing ${num}`);
                    observer.complete();
                } else {
                    observer.error(new Error(`Error with ${num}: ${x}`));
                }
            }, 1000 + x);
        });


        //return Rx.Observable.empty();
        // return observable that completes?
    }
}

function getObservable(num: number) {
    return Rx.Observable.create(function (observer: Rx.Observer<Command>) {
        observer.next(new Command(num));
        const x = Math.floor(Math.random() * 100);

        setTimeout(() => {
            if (x < 75) {
                observer.complete();
            } else {
                observer.error(new Error(`Error with ${num}: ${x}`));
            }
        }, 1000 + x);
    });
}

//emits 1,2,3
const sourceOne = Rx.Observable.of(1, 2, 3);
//emits 4,5,6
const sourceTwo = Rx.Observable.of(4, 5, 6);
//emit values from sourceOne, when complete, subscribe to sourceTwo

const commands = [new Command(0), new Command(1), new Command(2)];


//const example = Rx.Observable.concat(getObservable(1), getObservable(2), getObservable(3), getObservable(4));

const example = Rx.Observable.concat(..._.map(commands, (com: Command) => (com.execute())));

//const example = Rx.Observable.concat(...commands);

//output: 1,2,3,4,5,6
const subscribe = example.subscribe((val) => {
    console.log('got2', val);
}, (err) => {
    console.log(err.message);
});