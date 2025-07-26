import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/observable-observer', pathMatch: 'full' },
  { 
    path: 'observable-observer', 
    loadComponent: () => import('./rxjs-observable-observer/rxjs-observable-observer.component').then(m => m.RxjsObservableObserverComponent)
  },
  { 
    path: 'operators', 
    loadComponent: () => import('./rxjs-operators/rxjs-operators.component').then(m => m.RxjsOperatorsComponent)
  },
  { 
    path: 'subject', 
    loadComponent: () => import('./rxjs-subject/rxjs-subject.component').then(m => m.RxjsSubjectComponent)
  },
  { 
    path: 'behavior-subject', 
    loadComponent: () => import('./rxjs-behavior-subject/rxjs-behavior-subject.component').then(m => m.RxjsBehaviorSubjectComponent)
  },
  { 
    path: 'replay-subject', 
    loadComponent: () => import('./rxjs-replay-subject/rxjs-replay-subject.component').then(m => m.RxjsReplaySubjectComponent)
  },
  { 
    path: 'cold-hot', 
    loadComponent: () => import('./rxjs-cold-hot/rxjs-cold-hot.component').then(m => m.RxjsColdHotComponent)
  },
  { 
    path: 'combining', 
    loadComponent: () => import('./rxjs-combining/rxjs-combining.component').then(m => m.RxjsCombiningComponent)
  },
  { 
    path: 'error-handling', 
    loadComponent: () => import('./rxjs-error-handling/rxjs-error-handling.component').then(m => m.RxjsErrorHandlingComponent)
  },
  { 
    path: 'multicasting', 
    loadComponent: () => import('./rxjs-multicasting/rxjs-multicasting.component').then(m => m.RxjsMulticastingComponent)
  }
];
