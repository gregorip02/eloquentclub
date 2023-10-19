export function useDebounce <T extends (...args: Parameters<T>) => void> (callback: T, timeout = 500) {
  let timer: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => { callback.apply({}, args) }, timeout)
  }
}
