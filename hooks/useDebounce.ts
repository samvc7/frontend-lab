import { useEffect, useState } from "react"

export const useDebounce = <T>(value: T, delayInSeconds: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delayInSeconds)

    return () => clearTimeout(timeout)
  }, [value, delayInSeconds])

  return debouncedValue
}
