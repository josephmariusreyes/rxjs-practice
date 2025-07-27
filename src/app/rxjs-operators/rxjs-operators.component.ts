import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  Observable, 
  of, 
  from, 
  interval, 
  fromEvent,
  Subject,
  BehaviorSubject,
  ReplaySubject,
  AsyncSubject,
  Subscription,
  EMPTY,
  throwError,
  timer,
  forkJoin,
  combineLatest,
  merge,
  concat,
  zip,
  race,
  range,
  defer
} from 'rxjs';
import { 
  map, 
  filter, 
  take, 
  skip,
  switchMap, 
  mergeMap, 
  concatMap, 
  debounceTime, 
  distinctUntilChanged, 
  catchError, 
  retry,
  retryWhen,
  tap,
  scan,
  reduce,
  startWith,
  withLatestFrom,
  delay,
  finalize,
  share,
  shareReplay,
  multicast,
  publish,
  every,
  find,
  isEmpty,
  pluck,
  first,
  last
} from 'rxjs/operators';

interface OperatorExample {
  title: string;
  description: string;
  output: string[];
  isRunning: boolean;
  subscription?: Subscription;
  codeExample: string;
}

interface CategorySection {
  name: string;
  description: string;
  examples: OperatorExample[];
  isExpanded: boolean;
}

@Component({
  selector: 'app-rxjs-operators',
  imports: [CommonModule],
  templateUrl: './rxjs-operators.component.html',
  styleUrl: './rxjs-operators.component.scss'
})
export class RxjsOperatorsComponent implements OnInit, OnDestroy {
  
  categories: CategorySection[] = [
    {
      name: '1. Creation Operators',
      description: 'Operators that create new Observables from various sources',
      isExpanded: true,
      examples: [
        {
          title: 'of',
          description: 'Creates an Observable that emits the values you provide as arguments',
          output: [],
          isRunning: false,
          codeExample: `import { of } from 'rxjs';

const source$ = of(1, 2, 3, 4, 5);
source$.subscribe(x => console.log(x));

// Output: 1, 2, 3, 4, 5`
        },
        {
          title: 'from',
          description: 'Creates an Observable from arrays, promises, iterables or other observables',
          output: [],
          isRunning: false,
          codeExample: `import { from } from 'rxjs';

const source$ = from([10, 20, 30, 40]);
source$.subscribe(x => console.log(x));

// Output: 10, 20, 30, 40`
        },
        {
          title: 'interval',
          description: 'Creates an Observable that emits sequential numbers every specified interval',
          output: [],
          isRunning: false,
          codeExample: `import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

const source$ = interval(1000).pipe(take(5));
source$.subscribe(x => console.log(x));

// Output: 0, 1, 2, 3, 4 (every 1 second)`
        },
        {
          title: 'timer',
          description: 'Creates an Observable that starts emitting after an initial delay',
          output: [],
          isRunning: false,
          codeExample: `import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

const source$ = timer(1000, 500).pipe(take(4));
source$.subscribe(x => console.log(x));

// Output: 0, 1, 2, 3 (starts after 1s, then every 500ms)`
        }
      ]
    },
    {
      name: '2. Pipeable/Transformation Operators',
      description: 'Operators that transform values emitted by Observables',
      isExpanded: true,
      examples: [
        {
          title: 'map',
          description: 'Transforms each value by applying a projection function',
          output: [],
          isRunning: false,
          codeExample: `import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const source$ = of(1, 2, 3, 4, 5);
const doubled$ = source$.pipe(map(x => x * 2));
doubled$.subscribe(x => console.log(x));

// Output: 2, 4, 6, 8, 10`
        },
        {
          title: 'scan',
          description: 'Applies an accumulator function and returns each intermediate result',
          output: [],
          isRunning: false,
          codeExample: `import { of } from 'rxjs';
import { scan } from 'rxjs/operators';

const source$ = of(1, 2, 3, 4, 5);
const sum$ = source$.pipe(scan((acc, value) => acc + value, 0));
sum$.subscribe(x => console.log(x));

// Output: 1, 3, 6, 10, 15`
        },
        {
          title: 'switchMap',
          description: 'Maps to Observable, cancels previous inner Observable when new one arrives',
          output: [],
          isRunning: false,
          codeExample: `import { of, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

const source$ = of('a', 'ab', 'abc');
const result$ = source$.pipe(
  switchMap(term => timer(1000).pipe(
    map(() => \`Results for "\${term}"\`)
  ))
);
result$.subscribe(x => console.log(x));

// Only last search result emitted`
        },
        {
          title: 'mergeMap',
          description: 'Maps to Observable, merges all inner Observables concurrently',
          output: [],
          isRunning: false,
          codeExample: `import { of, interval } from 'rxjs';
import { mergeMap, take, map } from 'rxjs/operators';

const source$ = of('A', 'B', 'C');
const result$ = source$.pipe(
  mergeMap(letter => 
    interval(500).pipe(take(2), map(i => \`\${letter}\${i + 1}\`))
  )
);
result$.subscribe(x => console.log(x));

// Output: A1, B1, C1, A2, B2, C2 (interleaved)`
        },
        {
          title: 'concatMap',
          description: 'Maps to Observable, concatenates inner Observables sequentially',
          output: [],
          isRunning: false,
          codeExample: `import { of, timer } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

const source$ = of('X', 'Y');
const result$ = source$.pipe(
  concatMap(letter => timer(500).pipe(
    map(() => \`\${letter}-processed\`)
  ))
);
result$.subscribe(x => console.log(x));

// Output: X-processed, Y-processed (sequential)`
        }
      ]
    },
    {
      name: '3. Combination Operators',
      description: 'Operators that combine multiple Observables into one',
      isExpanded: true,
      examples: [
        {
          title: 'merge',
          description: 'Merges multiple Observables into one by subscribing to all simultaneously',
          output: [],
          isRunning: false,
          codeExample: `import { merge, interval } from 'rxjs';
import { take, map } from 'rxjs/operators';

const fast$ = interval(800).pipe(take(3), map(i => \`Fast-\${i + 1}\`));
const slow$ = interval(1200).pipe(take(2), map(i => \`Slow-\${i + 1}\`));

const merged$ = merge(fast$, slow$);
merged$.subscribe(x => console.log(x));

// Output: Fast-1, Slow-1, Fast-2, Fast-3, Slow-2`
        },
        {
          title: 'concat',
          description: 'Concatenates Observables sequentially - one after another',
          output: [],
          isRunning: false,
          codeExample: `import { concat, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const first$ = of('First').pipe(delay(500));
const second$ = of('Second').pipe(delay(300));

const result$ = concat(first$, second$);
result$.subscribe(x => console.log(x));

// Output: First (after 500ms), Second (after 300ms more)`
        },
        {
          title: 'combineLatest',
          description: 'Combines latest values from multiple sources when any source emits',
          output: [],
          isRunning: false,
          codeExample: `import { combineLatest, interval } from 'rxjs';
import { take, map } from 'rxjs/operators';

const stream1$ = interval(1000).pipe(take(3), map(i => \`A\${i + 1}\`));
const stream2$ = interval(1500).pipe(take(2), map(i => \`B\${i + 1}\`));

const combined$ = combineLatest([stream1$, stream2$]);
combined$.subscribe(([a, b]) => console.log(\`[\${a}, \${b}]\`));

// Output: [A1, B1], [A2, B1], [A3, B2]`
        },
        {
          title: 'forkJoin',
          description: 'Waits for all Observables to complete, then emits last value from each',
          output: [],
          isRunning: false,
          codeExample: `import { forkJoin, timer } from 'rxjs';
import { map } from 'rxjs/operators';

const request1$ = timer(1000).pipe(map(() => 'Response 1'));
const request2$ = timer(1500).pipe(map(() => 'Response 2'));
const request3$ = timer(800).pipe(map(() => 'Response 3'));

const result$ = forkJoin({
  first: request1$,
  second: request2$,
  third: request3$
});
result$.subscribe(results => console.log(results));

// Output: { first: 'Response 1', second: 'Response 2', third: 'Response 3' }`
        },
        {
          title: 'zip',
          description: 'Combines Observables by pairing emissions by index position',
          output: [],
          isRunning: false,
          codeExample: `import { zip, of } from 'rxjs';

const numbers$ = of(1, 2, 3);
const letters$ = of('A', 'B', 'C');  
const symbols$ = of('!', '@', '#');

const zipped$ = zip(numbers$, letters$, symbols$);
zipped$.subscribe(([num, letter, symbol]) => 
  console.log(\`\${num}\${letter}\${symbol}\`)
);

// Output: 1A!, 2B@, 3C#`
        },
        {
          title: 'race',
          description: 'Returns Observable that mirrors first source to emit ("winner takes all")',
          output: [],
          isRunning: false,
          codeExample: `import { race, timer } from 'rxjs';
import { map } from 'rxjs/operators';

const rabbit$ = timer(800).pipe(map(() => '🐰 Rabbit'));
const turtle$ = timer(1500).pipe(map(() => '🐢 Turtle'));
const cheetah$ = timer(400).pipe(map(() => '🐆 Cheetah'));

const winner$ = race(rabbit$, turtle$, cheetah$);
winner$.subscribe(x => console.log(x));

// Output: 🐆 Cheetah (fastest)`
        }
      ]
    },
    {
      name: '4. Filtering Operators',
      description: 'Operators that selectively emit values based on criteria',
      isExpanded: true,
      examples: [
        {
          title: 'filter',
          description: 'Emits only values that satisfy a predicate function',
          output: [],
          isRunning: false,
          codeExample: `import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

const source$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
const evens$ = source$.pipe(filter(x => x % 2 === 0));
evens$.subscribe(x => console.log(x));

// Output: 2, 4, 6, 8, 10`
        },
        {
          title: 'take',
          description: 'Emits only the first n values, then completes',
          output: [],
          isRunning: false,
          codeExample: `import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

const source$ = interval(1000);
const first4$ = source$.pipe(take(4));
first4$.subscribe(x => console.log(x));

// Output: 0, 1, 2, 3 (then completes)`
        },
        {
          title: 'skip',
          description: 'Skips the first n values emitted by the source',
          output: [],
          isRunning: false,
          codeExample: `import { of } from 'rxjs';
import { skip } from 'rxjs/operators';

const source$ = of(1, 2, 3, 4, 5, 6);
const skipFirst3$ = source$.pipe(skip(3));
skipFirst3$.subscribe(x => console.log(x));

// Output: 4, 5, 6`
        },
        {
          title: 'distinctUntilChanged',
          description: 'Emits only when current value is different from previous',
          output: [],
          isRunning: false,
          codeExample: `import { of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

const source$ = of(1, 1, 2, 2, 2, 3, 3, 4, 4, 5);
const distinct$ = source$.pipe(distinctUntilChanged());
distinct$.subscribe(x => console.log(x));

// Output: 1, 2, 3, 4, 5`
        },
        {
          title: 'debounceTime',
          description: 'Emits value only after specified time has passed without another emission',
          output: [],
          isRunning: false,
          codeExample: `import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const search$ = new Subject<string>();
const debounced$ = search$.pipe(debounceTime(1000));

debounced$.subscribe(term => console.log(\`Search: \${term}\`));

// Rapid emissions - only last one emits after 1s delay`
        },
        {
          title: 'first',
          description: 'Emits only the first value (or first that meets condition)',
          output: [],
          isRunning: false,
          codeExample: `import { of } from 'rxjs';
import { first } from 'rxjs/operators';

const source$ = of(10, 20, 30, 40, 50);
const firstOver25$ = source$.pipe(first(x => x > 25));
firstOver25$.subscribe(x => console.log(x));

// Output: 30`
        }
      ]
    },
    {
      name: '5. Error Handling Operators',
      description: 'Operators for handling and recovering from errors',
      isExpanded: true,
      examples: [
        {
          title: 'catchError',
          description: 'Catches errors and provides fallback Observable or value',
          output: [],
          isRunning: false,
          codeExample: `import { of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const source$ = of(1, 2, 3, 4, 5);
const result$ = source$.pipe(
  map(x => {
    if (x === 3) throw new Error(\`Error at \${x}\`);
    return x * 2;
  }),
  catchError(error => {
    console.log(\`Caught: \${error.message}\`);
    return of(999); // Fallback value
  })
);
result$.subscribe(x => console.log(x));

// Output: 2, 4, Caught: Error at 3, 999, 8, 10`
        },
        {
          title: 'retry',
          description: 'Resubscribes to source Observable when error occurs',
          output: [],
          isRunning: false,
          codeExample: `import { defer, throwError, of } from 'rxjs';
import { retry } from 'rxjs/operators';

let attempt = 0;
const source$ = defer(() => {
  attempt++;
  console.log(\`Attempt \${attempt}\`);
  if (attempt < 3) {
    return throwError(() => new Error(\`Failed attempt \${attempt}\`));
  }
  return of(\`Success on attempt \${attempt}\`);
});

const result$ = source$.pipe(retry(2));
result$.subscribe(x => console.log(x));

// Output: Attempt 1, Attempt 2, Attempt 3, Success on attempt 3`
        },
        {
          title: 'retryWhen',
          description: 'Retries source Observable based on custom retry logic',
          output: [],
          isRunning: false,
          codeExample: `import { defer, throwError, of } from 'rxjs';
import { retryWhen, delay, take } from 'rxjs/operators';

let retryAttempt = 0;
const source$ = defer(() => {
  retryAttempt++;
  console.log(\`Retry attempt \${retryAttempt}\`);
  if (retryAttempt < 3) {
    return throwError(() => new Error(\`Retry failed \${retryAttempt}\`));
  }
  return of(\`Success after \${retryAttempt} attempts\`);
});

const result$ = source$.pipe(
  retryWhen(errors => errors.pipe(delay(1000), take(2)))
);
result$.subscribe(x => console.log(x));

// Output: Retry attempt 1, Retry attempt 2, Retry attempt 3, Success after 3 attempts`
        }
      ]
    },
    {
      name: '6. Utility Operators',
      description: 'Operators for side effects, debugging, and utility functions',
      isExpanded: true,
      examples: [
        {
          title: 'tap',
          description: 'Performs side effects without modifying the stream',
          output: [],
          isRunning: false,
          codeExample: `import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const source$ = of(1, 2, 3, 4, 5);
const result$ = source$.pipe(
  tap(value => console.log(\`Side effect: Processing \${value}\`)),
  map(x => x * x),
  tap(value => console.log(\`After map: \${value}\`))
);
result$.subscribe(x => console.log(\`Final: \${x}\`));

// Side effects logged alongside main stream`
        },
        {
          title: 'finalize',
          description: 'Executes callback when Observable completes or errors',
          output: [],
          isRunning: false,
          codeExample: `import { of } from 'rxjs';
import { finalize } from 'rxjs/operators';

const source$ = of(1, 2, 3);
const result$ = source$.pipe(
  finalize(() => console.log('Finalize: Cleanup executed'))
);
result$.subscribe(x => console.log(x));

// Output: 1, 2, 3, Finalize: Cleanup executed`
        },
        {
          title: 'delay',
          description: 'Delays emissions by specified time',
          output: [],
          isRunning: false,
          codeExample: `import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

const source$ = of('Delayed', 'Messages');
const delayed$ = source$.pipe(delay(1000));
delayed$.subscribe(x => console.log(x));

// Output: Delayed, Messages (after 1 second delay)`
        },
        {
          title: 'startWith',
          description: 'Emits specified values before source Observable values',
          output: [],
          isRunning: false,
          codeExample: `import { of } from 'rxjs';
import { startWith } from 'rxjs/operators';

const source$ = of('World', '!');
const result$ = source$.pipe(startWith('Hello', ' '));
result$.subscribe(x => console.log(\`"\${x}"\`));

// Output: "Hello", " ", "World", "!"`
        }
      ]
    },
    {
      name: '7. Multicasting Operators',
      description: 'Operators for sharing Observable execution among multiple subscribers',
      isExpanded: true,
      examples: [
        {
          title: 'share',
          description: 'Shares source Observable among multiple subscribers',
          output: [],
          isRunning: false,
          codeExample: `import { interval } from 'rxjs';
import { take, share } from 'rxjs/operators';

const source$ = interval(1000).pipe(take(3), share());

// Multiple subscribers share the same execution
source$.subscribe(x => console.log(\`Subscriber 1: \${x}\`));
setTimeout(() => {
  source$.subscribe(x => console.log(\`Subscriber 2: \${x}\`));
}, 1500);`
        },
        {
          title: 'shareReplay',
          description: 'Shares source and replays specified number of emissions to late subscribers',
          output: [],
          isRunning: false,
          codeExample: `import { interval } from 'rxjs';
import { take, shareReplay } from 'rxjs/operators';

const source$ = interval(1000).pipe(take(3), shareReplay(2));

source$.subscribe(x => console.log(\`Early Sub: \${x}\`));
setTimeout(() => {
  source$.subscribe(x => console.log(\`Late Sub: \${x}\`));
}, 2500);

// Late subscriber receives last 2 values immediately`
        },
        {
          title: 'publish',
          description: 'Returns ConnectableObservable that shares single subscription to source',
          output: [],
          isRunning: false,
          codeExample: `import { interval } from 'rxjs';
import { take, publish } from 'rxjs/operators';

const source$ = interval(1000).pipe(take(3), publish());

source$.subscribe(x => console.log(\`Subscriber: \${x}\`));
// Must call connect() to start the source
setTimeout(() => source$.connect(), 500);`
        }
      ]
    },
    {
      name: '8. Conditional and Boolean Operators',
      description: 'Operators that evaluate conditions or return boolean results',
      isExpanded: true,
      examples: [
        {
          title: 'every',
          description: 'Returns Observable that emits whether every value satisfies condition',
          output: [],
          isRunning: false,
          codeExample: `import { of } from 'rxjs';
import { every } from 'rxjs/operators';

const source$ = of(2, 4, 6, 8);
const allEven$ = source$.pipe(every(x => x % 2 === 0));
allEven$.subscribe(result => console.log(\`All even: \${result}\`));

// Output: All even: true`
        },
        {
          title: 'find',
          description: 'Emits first value that satisfies condition, then completes',
          output: [],
          isRunning: false,
          codeExample: `import { of } from 'rxjs';
import { find } from 'rxjs/operators';

const source$ = of(1, 3, 5, 8, 9);
const firstEven$ = source$.pipe(find(x => x % 2 === 0));
firstEven$.subscribe(x => console.log(\`First even: \${x}\`));

// Output: First even: 8`
        },
        {
          title: 'isEmpty',
          description: 'Emits true if source completes without emitting, false otherwise',
          output: [],
          isRunning: false,
          codeExample: `import { EMPTY, of } from 'rxjs';
import { isEmpty } from 'rxjs/operators';

const empty$ = EMPTY.pipe(isEmpty());
const notEmpty$ = of(1, 2, 3).pipe(isEmpty());

empty$.subscribe(result => console.log(\`Empty: \${result}\`));
notEmpty$.subscribe(result => console.log(\`Not empty: \${result}\`));

// Output: Empty: true, Not empty: false`
        }
      ]
    },
    {
      name: '9. Subject Methods',
      description: 'Methods and behaviors of different Subject types',
      isExpanded: true,
      examples: [
        {
          title: 'Subject',
          description: 'Basic Subject - multicast observable that allows multiple subscribers',
          output: [],
          isRunning: false,
          codeExample: `import { Subject } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe(x => console.log(\`Observer 1: \${x}\`));
subject.subscribe(x => console.log(\`Observer 2: \${x}\`));

subject.next(1);
subject.next(2);
subject.complete();

// Both observers receive all values`
        },
        {
          title: 'BehaviorSubject',
          description: 'Subject that stores current value and emits it to new subscribers',
          output: [],
          isRunning: false,
          codeExample: `import { BehaviorSubject } from 'rxjs';

const behaviorSubject = new BehaviorSubject<string>('Initial Value');

behaviorSubject.subscribe(x => console.log(\`Early: \${x}\`));
behaviorSubject.next('Updated Value 1');

setTimeout(() => {
  behaviorSubject.subscribe(x => console.log(\`Late: \${x}\`));
  behaviorSubject.next('Updated Value 2');
}, 1000);

// Late subscriber immediately gets current value`
        },
        {
          title: 'ReplaySubject',
          description: 'Subject that replays specified number of previous values to new subscribers',
          output: [],
          isRunning: false,
          codeExample: `import { ReplaySubject } from 'rxjs';

const replaySubject = new ReplaySubject<string>(2); // Buffer size 2

replaySubject.next('Value 1');
replaySubject.next('Value 2');
replaySubject.next('Value 3');

// New subscriber gets last 2 values
setTimeout(() => {
  replaySubject.subscribe(x => console.log(\`Late subscriber: \${x}\`));
}, 1000);

// Output: Late subscriber: Value 2, Late subscriber: Value 3`
        }
      ]
    }
  ];

  private subscriptions: Subscription[] = [];

  ngOnInit() {
    // Initialize any setup if needed
  }

  ngOnDestroy() {
    this.stopAllExamples();
  }

  toggleCategory(categoryIndex: number) {
    this.categories[categoryIndex].isExpanded = !this.categories[categoryIndex].isExpanded;
  }

  runExample(categoryIndex: number, exampleIndex: number) {
    const example = this.categories[categoryIndex].examples[exampleIndex];
    
    if (example.isRunning) {
      this.stopExample(categoryIndex, exampleIndex);
      return;
    }

    example.output = [];
    example.isRunning = true;

    let subscription: Subscription | undefined;
    const operatorKey = `${categoryIndex}-${exampleIndex}`;

    subscription = this.getOperatorObservable(categoryIndex, exampleIndex)?.subscribe({
      next: (value) => this.addOutput(categoryIndex, exampleIndex, `Next: ${JSON.stringify(value)}`),
      error: (error) => {
        this.addOutput(categoryIndex, exampleIndex, `Error: ${error.message}`);
        example.isRunning = false;
      },
      complete: () => {
        this.addOutput(categoryIndex, exampleIndex, 'Completed!');
        example.isRunning = false;
      }
    });

    if (subscription) {
      example.subscription = subscription;
      this.subscriptions.push(subscription);
    }
  }

  private getOperatorObservable(categoryIndex: number, exampleIndex: number): Observable<any> | undefined {
    const key = `${categoryIndex}-${exampleIndex}`;
    
    switch (key) {
      // Creation Operators (Category 0)
      case '0-0': // of
        return of(1, 2, 3, 4, 5);
      
      case '0-1': // from
        return from([10, 20, 30, 40]);
      
      case '0-2': // interval
        return interval(1000).pipe(take(5));
      
      case '0-3': // timer
        return timer(1000, 500).pipe(take(4));

      // Pipeable/Transformation Operators (Category 1)
      case '1-0': // map
        return of(1, 2, 3, 4, 5).pipe(map(x => x * 2));
      
      case '1-1': // scan
        return of(1, 2, 3, 4, 5).pipe(scan((acc, value) => acc + value, 0));
      
      case '1-2': // switchMap
        return of('a', 'ab', 'abc').pipe(
          switchMap(term => timer(1000).pipe(map(() => `Results for "${term}"`)))
        );
      
      case '1-3': // mergeMap
        return of('A', 'B', 'C').pipe(
          mergeMap(letter => interval(500).pipe(take(2), map(i => `${letter}${i + 1}`)))
        );
      
      case '1-4': // concatMap
        return of('X', 'Y').pipe(
          concatMap(letter => timer(500).pipe(map(() => `${letter}-processed`)))
        );

      // Combination Operators (Category 2)
      case '2-0': // merge
        return merge(
          interval(800).pipe(take(3), map(i => `Fast-${i + 1}`)),
          interval(1200).pipe(take(2), map(i => `Slow-${i + 1}`))
        );
      
      case '2-1': // concat
        return concat(
          of('First').pipe(delay(500)),
          of('Second').pipe(delay(300))
        );
      
      case '2-2': // combineLatest
        return combineLatest([
          interval(1000).pipe(take(3), map(i => `A${i + 1}`)),
          interval(1500).pipe(take(2), map(i => `B${i + 1}`))
        ]);
      
      case '2-3': // forkJoin
        return forkJoin({
          first: timer(1000).pipe(map(() => 'Response 1')),
          second: timer(1500).pipe(map(() => 'Response 2')),
          third: timer(800).pipe(map(() => 'Response 3'))
        });
      
      case '2-4': // zip
        return zip(
          of(1, 2, 3),
          of('A', 'B', 'C'),
          of('!', '@', '#')
        );
      
      case '2-5': // race
        return race(
          timer(800).pipe(map(() => '🐰 Rabbit')),
          timer(1500).pipe(map(() => '🐢 Turtle')),
          timer(400).pipe(map(() => '🐆 Cheetah'))
        );

      // Filtering Operators (Category 3)
      case '3-0': // filter
        return of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(filter(x => x % 2 === 0));
      
      case '3-1': // take
        return interval(1000).pipe(take(4));
      
      case '3-2': // skip
        return of(1, 2, 3, 4, 5, 6).pipe(skip(3));
      
      case '3-3': // distinctUntilChanged
        return of(1, 1, 2, 2, 2, 3, 3, 4, 4, 5).pipe(distinctUntilChanged());
      
      case '3-4': // debounceTime
        const rapidSource = new Subject<string>();
        setTimeout(() => rapidSource.next('a'), 100);
        setTimeout(() => rapidSource.next('ab'), 400);
        setTimeout(() => rapidSource.next('abc'), 700);
        setTimeout(() => rapidSource.next('abcd'), 1000);
        setTimeout(() => rapidSource.complete(), 2500);
        return rapidSource.pipe(debounceTime(1000));
      
      case '3-5': // first
        return of(10, 20, 30, 40, 50).pipe(first(x => x > 25));

      // Error Handling Operators (Category 4)
      case '4-0': // catchError
        return of(1, 2, 3, 4, 5).pipe(
          map(x => {
            if (x === 3) throw new Error(`Error at ${x}`);
            return x * 2;
          }),
          catchError(error => {
            this.addOutput(4, 0, `Caught: ${error.message}`);
            return of(999);
          })
        );
      
      case '4-1': // retry
        let attempt = 0;
        return defer(() => {
          attempt++;
          this.addOutput(4, 1, `Attempt ${attempt}`);
          if (attempt < 3) {
            return throwError(() => new Error(`Failed attempt ${attempt}`));
          }
          return of(`Success on attempt ${attempt}`);
        }).pipe(retry(2));
      
      case '4-2': // retryWhen
        let retryAttempt = 0;
        return defer(() => {
          retryAttempt++;
          this.addOutput(4, 2, `Retry attempt ${retryAttempt}`);
          if (retryAttempt < 3) {
            return throwError(() => new Error(`Retry failed ${retryAttempt}`));
          }
          return of(`Success after ${retryAttempt} attempts`);
        }).pipe(retryWhen(errors => errors.pipe(delay(1000), take(2))));

      // Utility Operators (Category 5)
      case '5-0': // tap
        return of(1, 2, 3, 4, 5).pipe(
          tap(value => this.addOutput(5, 0, `Side effect: Processing ${value}`)),
          map(x => x * x)
        );
      
      case '5-1': // finalize
        return of(1, 2, 3).pipe(
          finalize(() => this.addOutput(5, 1, 'Finalize: Cleanup executed'))
        );
      
      case '5-2': // delay
        return of('Delayed', 'Messages').pipe(delay(1000));
      
      case '5-3': // startWith
        return of('World', '!').pipe(startWith('Hello', ' '));

      // Multicasting Operators (Category 6)
      case '6-0': // share
        const sharedSource = interval(1000).pipe(take(3), share());
        // Simulate multiple subscribers
        setTimeout(() => {
          sharedSource.subscribe(x => this.addOutput(6, 0, `Subscriber 1: ${x}`));
        }, 0);
        setTimeout(() => {
          sharedSource.subscribe(x => this.addOutput(6, 0, `Subscriber 2: ${x}`));
        }, 1500);
        return sharedSource;
      
      case '6-1': // shareReplay
        const replaySource = interval(1000).pipe(take(3), shareReplay(2));
        setTimeout(() => {
          replaySource.subscribe(x => this.addOutput(6, 1, `Early Sub: ${x}`));
        }, 0);
        setTimeout(() => {
          replaySource.subscribe(x => this.addOutput(6, 1, `Late Sub: ${x}`));
        }, 2500);
        return replaySource;
      
      case '6-2': // publish
        const publishSource = interval(1000).pipe(take(3), publish()) as any;
        setTimeout(() => {
          this.addOutput(6, 2, 'Connecting to published source...');
          publishSource.connect();
        }, 500);
        return publishSource;

      // Conditional and Boolean Operators (Category 7)
      case '7-0': // every
        return of(2, 4, 6, 8).pipe(every(x => x % 2 === 0));
      
      case '7-1': // find
        return of(1, 3, 5, 8, 9).pipe(find(x => x % 2 === 0));
      
      case '7-2': // isEmpty
        return EMPTY.pipe(isEmpty());

      // Subject Methods (Category 8)
      case '8-0': // Subject
        const subject = new Subject<number>();
        setTimeout(() => {
          subject.next(1);
          subject.next(2);
          subject.next(3);
          subject.complete();
        }, 100);
        return subject;
      
      case '8-1': // BehaviorSubject
        const behaviorSubject = new BehaviorSubject<string>('Initial Value');
        setTimeout(() => behaviorSubject.next('Updated Value 1'), 1000);
        setTimeout(() => behaviorSubject.next('Updated Value 2'), 2000);
        setTimeout(() => behaviorSubject.complete(), 3000);
        return behaviorSubject;
      
      case '8-2': // ReplaySubject
        const replaySubject = new ReplaySubject<string>(2);
        replaySubject.next('Value 1');
        replaySubject.next('Value 2');
        replaySubject.next('Value 3');
        setTimeout(() => {
          this.addOutput(8, 2, 'New subscriber will receive last 2 values');
          replaySubject.subscribe(x => this.addOutput(8, 2, `Late subscriber: ${x}`));
        }, 1000);
        return replaySubject;

      default:
        return of('No implementation yet');
    }
  }

  stopExample(categoryIndex: number, exampleIndex: number) {
    const example = this.categories[categoryIndex].examples[exampleIndex];
    if (example.subscription) {
      example.subscription.unsubscribe();
      example.subscription = undefined;
    }
    example.isRunning = false;
    this.addOutput(categoryIndex, exampleIndex, 'Stopped by user');
  }

  stopAllExamples() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
    this.categories.forEach(category => {
      category.examples.forEach(example => {
        example.isRunning = false;
        example.subscription = undefined;
      });
    });
  }

  clearOutput(categoryIndex: number, exampleIndex: number) {
    this.categories[categoryIndex].examples[exampleIndex].output = [];
  }

  private addOutput(categoryIndex: number, exampleIndex: number, message: string) {
    const example = this.categories[categoryIndex].examples[exampleIndex];
    example.output.push(`${new Date().toLocaleTimeString()}: ${message}`);
    
    // Keep only last 10 messages to prevent overflow
    if (example.output.length > 10) {
      example.output = example.output.slice(-10);
    }
  }
}
