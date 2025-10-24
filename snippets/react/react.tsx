import {
  ComponentPropsWithoutRef,
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react"

// Components & props & state
type CounterProps = {
  start?: number
}
export function Counter({ start = 0 }: CounterProps) {
  const [count, setCount] = useState(start)

  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>
}

//Derived state & effects
export const Cleanup = () => {
  const intervalCountRef = useRef(0)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      console.log(e.key)
    }
    addEventListener("keydown", onKeyDown)
    return () => removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(function clocks() {
    const interval = setInterval(() => {
      console.log("Interval count: ", intervalCountRef.current)
      intervalCountRef.current++
    }, 5000)

    if (intervalCountRef.current > 5) {
      clearInterval(interval)
    }

    const timeout = setTimeout(() => {
      console.log("Timeout finished")
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])
}

// Refs & imperative bits
export function SearchBox() {
  const ref = useRef<HTMLInputElement | null>(null)

  useEffect(function focusOnMount() {
    ref.current?.focus()
  }, [])

  return (
    <div>
      <label htmlFor="input">Input</label>
      <input id="input" ref={ref} />
      <button onClick={() => ref.current?.select()}>Select input</button>
    </div>
  )
}

type InputHandle = {
  focus: () => void
  clear: () => void
}

type SmartInputProps = ComponentPropsWithoutRef<"input">

// Context & reducer for app state
type Action = { type: "add"; item: string } | { type: "remove"; index: number }
// | { type: "edit"; index: number; item: string }
type State = { items: string[] }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "add":
      return { items: [...state.items, action.item] }
    case "remove":
      return { items: state.items.filter((_, ix) => ix !== action.index) }
    default:
      const _exhaustive: never = action
      return _exhaustive
  }
}

type StateContext = {
  state: State
  dispatch: Dispatch<Action>
}

const AppStateContext = createContext<StateContext | null>(null)

const STORAGE_KEY = "todos"
function initFromStorage(initial?: State): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : initial ?? { items: [] }
  } catch (error) {
    return initial ?? { items: [] }
  }
}

const AppStateProvider = ({
  children,
  initialValue,
}: {
  children: ReactNode
  initialValue?: State
}) => {
  const [state, dispatch] = useReducer(
    reducer,
    { items: initialValue?.items ?? [] },
    initFromStorage
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const value = useMemo(() => ({ state, dispatch }), [state])

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  )
}

function useAppState(): StateContext {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error("Context not yet initialized")
  return ctx
}

export const ChildButton = () => {
  const { state, dispatch } = useAppState()
  return (
    <div>
      <button
        onClick={() =>
          dispatch({ type: "add", item: `New Item ${state.items.length}` })
        }
      >
        Add
      </button>
      <button
        onClick={() =>
          dispatch({ type: "remove", index: state.items.length - 1 })
        }
      >
        Remove
      </button>
    </div>
  )
}

export const ItemList = () => {
  const { state } = useAppState()
  return (
    <div>
      {state.items.map((item) => {
        return <div>{item}</div>
      })}
    </div>
  )
}

export function Parent() {
  return (
    <AppStateProvider initialValue={{ items: ["test"] }}>
      <ItemList />
      <ChildButton />
    </AppStateProvider>
  )
}
