"use client"

import { useDebounce } from "@/hooks/useDebounce"
import { useMemo, useState } from "react"

const data = ["testing", "react", "typescript", "reactJS", "JavaScript", ""]

export const SearchDebounced = () => {
  const [query, setQuery] = useState("")
  const debounced = useDebounce(query, 300)

  const filteredData = useMemo(
    () => data.filter((data) => data.toLocaleLowerCase().includes(debounced)),
    [debounced]
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="search">Debounced Search</label>
        <input
          id="search"
          className="border-2 border-blue-700"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filteredData.length > 0 ? (
        <ul>
          {filteredData.map((data) => {
            return <li key={`item-${data.toLocaleLowerCase()}`}>{data}</li>
          })}
        </ul>
      ) : (
        <div>No results found</div>
      )}
    </div>
  )
}
