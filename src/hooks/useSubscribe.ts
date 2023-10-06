import {useEffect, useState} from 'react';
import {BehaviorSubject, Subject} from 'rxjs';

export function useSubscribe<T>(subject: BehaviorSubject<T> | Subject<T>) {
  const [value, setValue] = useState<T>();

  useEffect(() => {
    const sub = subject.subscribe(v => setValue(v));

    return () => {
      sub?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return value;
}
