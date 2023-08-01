import { useEffect, useMemo, useRef } from "react";
import { debounce } from "lodash";

const DELAY = 3000

export const useDebounce = <T extends (...args: any[]) => void>(callback: T) => {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = callback;
  },[callback])

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.()
    }
    return debounce(func, DELAY)
  }, [])

return debouncedCallback
};

