import * as Arr from './Arr';
import { Future } from './Future';
import * as AsyncValues from '../async/AsyncValues';

export const par = <T>(futures: ArrayLike<Future<T>>): Future<Array<T>> =>
  AsyncValues.par(futures, Future.nu);

export const mapM = <A, B>(array: ArrayLike<A>, fn: (value: A) => Future<B>): Future<B[]> =>
  par(Arr.map(array, fn));

/** Kleisli composition of two functions: a -> Future b.
 *  Note the order of arguments: g is invoked first, then the result passed to f.
 *  This is in line with f . g = \x -> f (g a)
 *
 *  compose :: ((b -> Future c), (a -> Future b)) -> a -> Future c
 */
export const compose = <A, B, C>(f: (b: B) => Future<C>, g: (a: A) => Future<B>) => (a: A): Future<C> => g(a).bind(f);
