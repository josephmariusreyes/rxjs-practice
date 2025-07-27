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
          isRunning: false
        },
        {
          title: 'from',
          description: 'Creates an Observable fromfrom arrays, promises, iterables or other observables',
          output: [],
          isRunning: false
        },
        {
          title: 'interval',
          description: 'Creates an Observable that emits sequential numbers every specified interval',
          output: [],
          isRunning: false
        },
        {
          title: 'timer',
          description: 'Creates an Observable that starts emitting after an initial delay',
          output: [],
          isRunning: false
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
          isRunning: false
        },
        {
          title: 'scan',
          description: 'Applies an accumulator function and returns each intermediate result',
          output: [],
          isRunning: false
        },
        {
          title: 'switchMap',
          description: 'Maps to Observable, cancels previous inner Observable when new one arrives',
          output: [],
          isRunning: false
        },
        {
          title: 'mergeMap',
          description: 'Maps to Observable, merges all inner Observables concurrently',
          output: [],
          isRunning: false
        },
        {
          title: 'concatMap',
          description: 'Maps to Observable, concatenates inner Observables sequentially',
          output: [],
          isRunning: false
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
          isRunning: false
        },
        {
          title: 'concat',
          description: 'Concatenates Observables sequentially - one after another',
          output: [],
          isRunning: false
        },
        {
          title: 'combineLatest',
          description: 'Combines latest values from multiple sources when any source emits',
          output: [],
          isRunning: false
        },
        {
          title: 'forkJoin',
          description: 'Waits for all Observables to complete, then emits last value from each',
          output: [],
          isRunning: false
        },
        {
          title: 'zip',
          description: 'Combines Observables by pairing emissions by index position',
          output: [],
          isRunning: false
        },
        {
          title: 'race',
          description: 'Returns Observable that mirrors first source to emit ("winner takes all")',
          output: [],
          isRunning: false
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
          isRunning: false
        },
        {
          title: 'take',
          description: 'Emits only the first n values, then completes',
          output: [],
          isRunning: false
        },
        {
          title: 'skip',
          description: 'Skips the first n values emitted by the source',
          output: [],
          isRunning: false
        },
        {
          title: 'distinctUntilChanged',
          description: 'Emits only when current value is different from previous',
          output: [],
          isRunning: false
        },
        {
          title: 'debounceTime',
          description: 'Emits value only after specified time has passed without another emission',
          output: [],
          isRunning: false
        },
        {
          title: 'first',
          description: 'Emits only the first value (or first that meets condition)',
          output: [],
          isRunning: false
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
          isRunning: false
        },
        {
          title: 'retry',
          description: 'Resubscribes to source Observable when error occurs',
          output: [],
          isRunning: false
        },
        {
          title: 'retryWhen',
          description: 'Retries source Observable based on custom retry logic',
          output: [],
          isRunning: false
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
          isRunning: false
        },
        {
          title: 'finalize',
          description: 'Executes callback when Observable completes or errors',
          output: [],
          isRunning: false
        },
        {
          title: 'delay',
          description: 'Delays emissions by specified time',
          output: [],
          isRunning: false
        },
        {
          title: 'startWith',
          description: 'Emits specified values before source Observable values',
          output: [],
          isRunning: false
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
          isRunning: false
        },
        {
          title: 'shareReplay',
          description: 'Shares source and replays specified number of emissions to late subscribers',
          output: [],
          isRunning: false
        },
        {
          title: 'publish',
          description: 'Returns ConnectableObservable that shares single subscription to source',
          output: [],
          isRunning: false
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
          isRunning: false
        },
        {
          title: 'find',
          description: 'Emits first value that satisfies condition, then completes',
          output: [],
          isRunning: false
        },
        {
          title: 'isEmpty',
          description: 'Emits true if source completes without emitting, false otherwise',
          output: [],
          isRunning: false
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
          isRunning: false
        },
        {
          title: 'BehaviorSubject',
          description: 'Subject that stores current value and emits it to new subscribers',
          output: [],
          isRunning: false
        },
        {
          title: 'ReplaySubject',
          description: 'Subject that replays specified number of previous values to new subscribers',
          output: [],
          isRunning: false
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
