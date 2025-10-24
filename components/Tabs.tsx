"use client"

import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react"

type TabsProps = {
  items: Tab[]
  initialIndex?: number
}

type Tab = { id: string; label: string; content: ReactNode }

export const Tabs = ({ items, initialIndex = 0 }: TabsProps) => {
  const [activeTabIx, setActiveTabIx] = useState(initialIndex)
  const [focusedTabIx, setFocusedTabIx] = useState<number>(activeTabIx)

  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])

  useEffect(() => {
    buttonRefs.current[focusedTabIx]?.focus()
  }, [focusedTabIx])

  const moveFocus = (to: number) => {
    const next = to > items.length - 1 ? 0 : to < 0 ? items.length - 1 : to
    setFocusedTabIx(next)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault()
    switch (e.key) {
      case "ArrowRight":
        moveFocus(focusedTabIx + 1)
        break
      case "ArrowLeft":
        moveFocus(focusedTabIx - 1)
        break
      case "Tab":
        moveFocus(focusedTabIx + 1)
        break
      case "Home":
        moveFocus(0)
        break
      case "End":
        moveFocus(items.length - 1)
        break
      case "Enter":
        setActiveTabIx(focusedTabIx)
        break
      case " ":
        setActiveTabIx(focusedTabIx)
        break

      default:
        break
    }
  }

  return (
    <>
      <div
        className="flex flex-row space-x-4 border-b border-gray-200 hover:cursor-pointer"
        role="tablist"
        onKeyDown={onKeyDown}
      >
        {items.map((item, ix) => {
          const selected = activeTabIx === ix
          return (
            <button
              key={item.id}
              ref={(el) => {
                buttonRefs.current[ix] = el
              }}
              onClick={() => {
                setFocusedTabIx(ix)
                setActiveTabIx(ix)
              }}
              role="tab"
              aria-selected={selected}
              className={`${
                selected ? "border-b-2 border-blue-700 text-blue-700" : ""
              } pb-2`}
              tabIndex={focusedTabIx === ix ? 0 : -1}
              onFocus={() => setFocusedTabIx(ix)}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <div role="tabpanel">{items[activeTabIx].content}</div>
    </>
  )
}
