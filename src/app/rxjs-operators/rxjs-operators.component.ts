import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  Observable, 
  of, 
  from, 
  interval, 
  fromEvent,
  Subject,
  Subscription,
  EMPTY,
  throwError,
  timer,
  forkJoin,
  combineLatest,
  merge,
  concat,
  zip,
  race
} from 'rxjs';
import { 
  map, 
  filter, 
  take, 
  switchMap, 
  mergeMap, 
  concatMap, 
  debounceTime, 
  distinctUntilChanged, 
  catchError, 
  retry,
  tap,
  scan,
  reduce,
  startWith,
  withLatestFrom,
  delay
} from 'rxjs/operators';

interface OperatorExample {
  title: string;
  description: string;
  output: string[];
  isRunning: boolean;
  subscription?: Subscription;
}

@Component({
  selector: 'app-rxjs-operators',
  imports: [CommonModule],
  templateUrl: './rxjs-operators.component.html',
  styleUrl: './rxjs-operators.component.scss'
})
export class RxjsOperatorsComponent implements OnInit, OnDestroy {
  
  examples: OperatorExample[] = [
    {
      title: '1. map',
      description: 'Transforms each value emitted by the source Observable by applying a projection function to each value.',
      output: [],
      isRunning: false
    },
    {
      title: '2. filter',
      description: 'Emits only those values from the source Observable that satisfy a specified predicate function.',
      output: [],
      isRunning: false
    },
    {
      title: '3. take',
      description: 'Emits only the first n values emitted by the source Observable, then completes.',
      output: [],
      isRunning: false
    },
    {
      title: '4. switchMap',
      description: 'Maps each value to an Observable, then flattens all inner Observables. Cancels previous inner Observable when a new one arrives.',
      output: [],
      isRunning: false
    },
    {
      title: '5. mergeMap (flatMap)',
      description: 'Maps each value to an Observable, then flattens all inner Observables. Does not cancel previous inner Observables.',
      output: [],
      isRunning: false
    },
    {
      title: '6. concatMap',
      description: 'Maps each value to an Observable, then flattens all inner Observables in sequence. Waits for each inner Observable to complete before subscribing to the next.',
      output: [],
      isRunning: false
    },
    {
      title: '7. debounceTime',
      description: 'Emits a value only after a particular time span has passed without another source emission.',
      output: [],
      isRunning: false
    },
    {
      title: '8. distinctUntilChanged',
      description: 'Emits all items emitted by the source Observable that are distinct by comparison from the previous item.',
      output: [],
      isRunning: false
    },
    {
      title: '9. catchError',
      description: 'Catches errors on the Observable to be handled by returning a new Observable or throwing an error.',
      output: [],
      isRunning: false
    },
    {
      title: '10. tap (do)',
      description: 'Performs a side effect for every emission on the source Observable, but returns an Observable that is identical to the source.',
      output: [],
      isRunning: false
    },
    {
      title: '11. scan',
      description: 'Applies an accumulator function over the source Observable and returns each intermediate result.',
      output: [],
      isRunning: false
    },
    {
      title: '12. startWith',
      description: 'Returns an Observable that emits specified items before it begins to emit items from the source Observable.',
      output: [],
      isRunning: false
    },
    {
      title: '13. forkJoin',
      description: 'Waits for all source Observables to complete, then emits the last value from each. Perfect for parallel HTTP requests.',
      output: [],
      isRunning: false
    },
    {
      title: '14. combineLatest',
      description: 'Combines multiple Observables and emits whenever any source emits, using the latest value from each source.',
      output: [],
      isRunning: false
    },
    {
      title: '15. merge',
      description: 'Merges multiple Observables into one by subscribing to all sources simultaneously and emitting values as they arrive.',
      output: [],
      isRunning: false
    },
    {
      title: '16. concat',
      description: 'Concatenates multiple Observables sequentially - subscribes to the next Observable only after the previous one completes.',
      output: [],
      isRunning: false
    },
    {
      title: '17. zip',
      description: 'Combines multiple Observables by pairing emissions by index - waits for all sources to emit before emitting the combined result.',
      output: [],
      isRunning: false
    },
    {
      title: '18. race',
      description: 'Returns an Observable that mirrors the first source Observable to emit a value. The "winner takes all" operator.',
      output: [],
      isRunning: false
    }
  ];

  private subscriptions: Subscription[] = [];

  ngOnInit() {
    // Initialize any setup if needed
  }

  ngOnDestroy() {
    this.stopAllExamples();
  }

  runExample(index: number) {
    if (this.examples[index].isRunning) {
      this.stopExample(index);
      return;
    }

    this.examples[index].output = [];
    this.examples[index].isRunning = true;

    let subscription: Subscription | undefined;

    switch (index) {
      case 0: // map
        subscription = of(1, 2, 3, 4, 5)
          .pipe(
            map(x => x * 2),
            tap(value => this.addOutput(index, `Mapped: ${value}`))
          )
          .subscribe({
            complete: () => {
              this.addOutput(index, 'Completed!');
              this.examples[index].isRunning = false;
            }
          });
        break;

      case 1: // filter
        subscription = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
          .pipe(
            filter(x => x % 2 === 0),
            tap(value => this.addOutput(index, `Even number: ${value}`))
          )
          .subscribe({
            complete: () => {
              this.addOutput(index, 'Completed!');
              this.examples[index].isRunning = false;
            }
          });
        break;

      case 2: // take
        subscription = interval(1000)
          .pipe(
            take(5),
            tap(value => this.addOutput(index, `Value: ${value}`))
          )
          .subscribe({
            complete: () => {
              this.addOutput(index, 'Completed after 5 emissions!');
              this.examples[index].isRunning = false;
            }
          });
        break;

      case 3: // switchMap
        const searchTerms = of('a', 'ab', 'abc');
        subscription = searchTerms
          .pipe(
            switchMap(term => {
              this.addOutput(index, `Searching for: ${term}`);
              return timer(1000).pipe(
                map(() => `Results for "${term}": [${term}1, ${term}2, ${term}3]`)
              );
            }),
            tap(result => this.addOutput(index, result))
          )
          .subscribe({
            complete: () => {
              this.addOutput(index, 'Search completed!');
              this.examples[index].isRunning = false;
            }
          });
        break;

      case 4: // mergeMap
        subscription = of('A', 'B', 'C')
          .pipe(
            mergeMap(letter => 
              interval(500).pipe(
                take(3),
                map(i => `${letter}${i + 1}`)
              )
            ),
            tap(value => this.addOutput(index, `Merged: ${value}`))
          )
          .subscribe({
            complete: () => {
              this.addOutput(index, 'All merged streams completed!');
              this.examples[index].isRunning = false;
            }
          });
        break;

      case 5: // concatMap
        subscription = of('X', 'Y', 'Z')
          .pipe(
            concatMap(letter => 
              interval(500).pipe(
                take(2),
                map(i => `${letter}${i + 1}`)
              )
            ),
            tap(value => this.addOutput(index, `Concatenated: ${value}`))
          )
          .subscribe({
            complete: () => {
              this.addOutput(index, 'All concatenated streams completed!');
              this.examples[index].isRunning = false;
            }
          });
        break;

      case 6: // debounceTime
        const rapidEmissions = new Subject<string>();
        subscription = rapidEmissions
          .pipe(
            debounceTime(1000),
            tap(value => this.addOutput(index, `Debounced: ${value}`))
          )
          .subscribe();

        // Simulate rapid emissions
        const emissions = ['a', 'ab', 'abc', 'abcd'];
        emissions.forEach((emission, i) => {
          setTimeout(() => {
            this.addOutput(index, `Emitting: ${emission}`);
            rapidEmissions.next(emission);
            if (i === emissions.length - 1) {
              setTimeout(() => {
                rapidEmissions.complete();
                this.addOutput(index, 'Completed!');
                this.examples[index].isRunning = false;
              }, 1500);
            }
          }, i * 300);
        });
        break;

      case 7: // distinctUntilChanged
        subscription = of(1, 1, 2, 2, 2, 3, 3, 4, 4, 4, 4, 5)
          .pipe(
            distinctUntilChanged(),
            tap(value => this.addOutput(index, `Distinct: ${value}`))
          )
          .subscribe({
            complete: () => {
              this.addOutput(index, 'Completed!');
              this.examples[index].isRunning = false;
            }
          });
        break;

      case 8: // catchError
        subscription = of(1, 2, 3, 4, 5)
          .pipe(
            map(x => {
              if (x === 3) {
                throw new Error(`Error at value ${x}`);
              }
              return x * 2;
            }),
            catchError(error => {
              this.addOutput(index, `Caught error: ${error.message}`);
              return of(999); // Fallback value
            }),
            tap(value => this.addOutput(index, `Result: ${value}`))
          )
          .subscribe({
            complete: () => {
              this.addOutput(index, 'Completed with error handling!');
              this.examples[index].isRunning = false;
            }
          });
        break;

      case 9: // tap
        subscription = of(1, 2, 3, 4, 5)
          .pipe(
            tap(value => this.addOutput(index, `Side effect: Processing ${value}`)),
            map(x => x * x),
            tap(value => this.addOutput(index, `After map: ${value}`))
          )
          .subscribe({
            complete: () => {
              this.addOutput(index, 'Completed!');
              this.examples[index].isRunning = false;
            }
          });
        break;

      case 10: // scan
        subscription = of(1, 2, 3, 4, 5)
          .pipe(
            scan((acc, value) => acc + value, 0),
            tap(runningTotal => this.addOutput(index, `Running total: ${runningTotal}`))
          )
          .subscribe({
            complete: () => {
              this.addOutput(index, 'Completed!');
              this.examples[index].isRunning = false;
            }
          });
        break;

      case 11: // startWith
        subscription = of('World', '!').pipe(
          startWith('Hello', ' '),
          tap(value => this.addOutput(index, `Value: "${value}"`))
        ).subscribe({
          complete: () => {
            this.addOutput(index, 'Completed!');
            this.examples[index].isRunning = false;
          }
        });
        break;

      case 12: // forkJoin
        const request1 = timer(1000).pipe(map(() => 'API Response 1'));
        const request2 = timer(1500).pipe(map(() => 'API Response 2'));
        const request3 = timer(800).pipe(map(() => 'API Response 3'));
        
        this.addOutput(index, 'Starting parallel requests...');
        subscription = forkJoin({
          first: request1,
          second: request2,
          third: request3
        }).pipe(
          tap(results => {
            this.addOutput(index, `All requests completed:`);
            this.addOutput(index, `  first: ${results.first}`);
            this.addOutput(index, `  second: ${results.second}`);
            this.addOutput(index, `  third: ${results.third}`);
          })
        ).subscribe({
          complete: () => {
            this.addOutput(index, 'forkJoin completed!');
            this.examples[index].isRunning = false;
          }
        });
        break;

      case 13: // combineLatest
        const stream1 = interval(1000).pipe(take(4), map(i => `A${i + 1}`));
        const stream2 = interval(1500).pipe(take(3), map(i => `B${i + 1}`));
        
        subscription = combineLatest([stream1, stream2]).pipe(
          tap(([valueA, valueB]) => {
            this.addOutput(index, `Combined: [${valueA}, ${valueB}]`);
          })
        ).subscribe({
          complete: () => {
            this.addOutput(index, 'combineLatest completed!');
            this.examples[index].isRunning = false;
          }
        });
        break;

      case 14: // merge
        const fast$ = interval(800).pipe(take(5), map(i => `Fast-${i + 1}`));
        const slow$ = interval(1200).pipe(take(3), map(i => `Slow-${i + 1}`));
        
        subscription = merge(fast$, slow$).pipe(
          tap(value => this.addOutput(index, `Merged: ${value}`))
        ).subscribe({
          complete: () => {
            this.addOutput(index, 'merge completed!');
            this.examples[index].isRunning = false;
          }
        });
        break;

      case 15: // concat
        const first$ = of('First', 'Sequence').pipe(
          concatMap(val => timer(500).pipe(map(() => val)))
        );
        const second$ = of('Second', 'Sequence').pipe(
          concatMap(val => timer(300).pipe(map(() => val)))
        );
        
        subscription = concat(first$, second$).pipe(
          tap(value => this.addOutput(index, `Concatenated: ${value}`))
        ).subscribe({
          complete: () => {
            this.addOutput(index, 'concat completed!');
            this.examples[index].isRunning = false;
          }
        });
        break;

      case 16: // zip
        const numbers$ = of(1, 2, 3, 4);
        const letters$ = of('A', 'B', 'C');
        const symbols$ = of('!', '@', '#', '$', '%');
        
        subscription = zip(numbers$, letters$, symbols$).pipe(
          tap(([num, letter, symbol]) => {
            this.addOutput(index, `Zipped: ${num}${letter}${symbol}`);
          })
        ).subscribe({
          complete: () => {
            this.addOutput(index, 'zip completed!');
            this.examples[index].isRunning = false;
          }
        });
        break;

      case 17: // race
        const rabbit$ = timer(800).pipe(map(() => '🐰 Rabbit wins!'));
        const turtle$ = timer(1500).pipe(map(() => '🐢 Turtle wins!'));
        const cheetah$ = timer(400).pipe(map(() => '🐆 Cheetah wins!'));
        
        this.addOutput(index, 'Race started! 🏁');
        subscription = race(rabbit$, turtle$, cheetah$).pipe(
          tap(winner => this.addOutput(index, winner))
        ).subscribe({
          complete: () => {
            this.addOutput(index, 'Race finished!');
            this.examples[index].isRunning = false;
          }
        });
        break;
    }

    if (subscription) {
      this.examples[index].subscription = subscription;
      this.subscriptions.push(subscription);
    }
  }

  stopExample(index: number) {
    if (this.examples[index].subscription) {
      this.examples[index].subscription!.unsubscribe();
      this.examples[index].subscription = undefined;
    }
    this.examples[index].isRunning = false;
    this.addOutput(index, 'Stopped by user');
  }

  stopAllExamples() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
    this.examples.forEach(example => {
      example.isRunning = false;
      example.subscription = undefined;
    });
  }

  clearOutput(index: number) {
    this.examples[index].output = [];
  }

  private addOutput(index: number, message: string) {
    this.examples[index].output.push(`${new Date().toLocaleTimeString()}: ${message}`);
    
    // Keep only last 10 messages to prevent overflow
    if (this.examples[index].output.length > 10) {
      this.examples[index].output = this.examples[index].output.slice(-10);
    }
  }
}
