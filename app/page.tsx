import { SearchDebounced } from "@/components/SearchDebounced"
import { Tabs } from "@/components/Tabs"

export default function Home() {
  const items = [
    {
      id: "home",
      label: "Home",
      content: <p>This is the content for Home page</p>,
    },
    {
      id: "tab1",
      label: "Tab 1",
      content: <p>This is the content for Tab 1</p>,
    },
    {
      id: "tab2",
      label: "Tab 2",
      content: <p>This is the content for Tab 2</p>,
    },
    {
      id: "end",
      label: "End",
      content: <p>This is the content for End page</p>,
    },
  ]

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Tabs items={items} />
        <SearchDebounced />
      </main>
    </div>
  )
}
