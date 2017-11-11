import * as Rx from 'rxjs';


function getObservable(num: number) {
    return Rx.Observable.create(function (observer: Rx.Observer<any>) {
        observer.next(num);
        const x = Math.floor(Math.random() * 100);

        setTimeout(() => {
            if (x < 50) {
                observer.complete();
            } else {
                observer.error(new Error(`Error with ${num}`));
            }
        }, x);
    });
}

//emits 1,2,3
const sourceOne = Rx.Observable.of(1, 2, 3);
//emits 4,5,6
const sourceTwo = Rx.Observable.of(4, 5, 6);
//emit values from sourceOne, when complete, subscribe to sourceTwo
const example = Rx.Observable.concat(getObservable(1), getObservable(2), getObservable(3), getObservable(4));
//output: 1,2,3,4,5,6
const subscribe = example.subscribe(val => console.log('concat:', val), (err) => {
    console.log(err.message);
});