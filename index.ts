import * as Rx from 'rxjs';


const hello = Rx.Observable.create(function (observer: Rx.Observer<any>) {
    observer.next('Hello');

    observer.next('World');
    const x = Math.random();
    console.log(x);
    if (x < 0.5) {
        observer.complete();
    } else {
        observer.error(new Error("bad"));
    }
});

//emits 1,2,3
const sourceOne = Rx.Observable.of(1, 2, 3);
//emits 4,5,6
const sourceTwo = Rx.Observable.of(4, 5, 6);
//emit values from sourceOne, when complete, subscribe to sourceTwo
const example = Rx.Observable.concat(sourceOne, hello, sourceTwo);
//output: 1,2,3,4,5,6
const subscribe = example.subscribe(val => console.log('Example: Basic concat:', val), (err) => {
    console.log('b', err);
});