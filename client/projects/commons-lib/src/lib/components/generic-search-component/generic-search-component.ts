import {Subject} from 'rxjs';

export class GenericSearchComponent<T, E> {
  protected afterClosed = new Subject<T>();
  afterClosed$ = this.afterClosed.asObservable();

  protected afterSearched = new Subject<E>();
  afterSearched$ = this.afterSearched.asObservable();
}
