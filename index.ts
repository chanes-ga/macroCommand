import * as Rx from 'rxjs';
/*
    menuclick call execute on macrocommand

    macrocommand instantiated with an array of observables that emit a command
        1) execute => validate selection
        2) execute => shows dialog
        3) execute => dialog button click
        4) validate input
        5) do action


 */


class Command {
    constructor(private num: number) {

    }

    execute() {
        console.log(`Executing ${this.num}`);
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
const example = Rx.Observable.concat(getObservable(1), getObservable(2), getObservable(3), getObservable(4));
//output: 1,2,3,4,5,6
const subscribe = example.subscribe((val: Command) => {
    val.execute()
}, (err) => {
    console.log(err.message);
});