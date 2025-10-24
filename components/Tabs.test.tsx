import { render } from "@testing-library/react"
import { screen } from "@testing-library/dom"
import { Tabs } from "@/components/Tabs"
import { userEvent } from "@testing-library/user-event"

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

describe("Tabs test", () => {
  beforeEach(() => {
    render(<Tabs items={items} />)
  })
  it("smoke", () => {
    const panel = screen.getByRole("tabpanel")

    expect(panel).toHaveTextContent("This is the content for Home page")
  })

  it("can change focus with keyboard arrows, home and end & can select with enter or space", async () => {
    const user = userEvent.setup()
    await user.keyboard("tab")
    await user.keyboard("[ArrowRight]")

    const tab1 = screen.getByRole("tab", { name: "Tab 1" })
    expect(tab1).toHaveFocus()
    const panel = screen.getByRole("tabpanel")
    expect(panel).toHaveTextContent("Home page")

    await user.keyboard("[Enter]")
    expect(panel).toHaveTextContent("Tab 1")

    await user.keyboard("[End]")
    expect(screen.getByRole("tab", { name: "End" })).toHaveFocus()

    await user.keyboard("[Home]")
    expect(screen.getByRole("tab", { name: "Home" })).toHaveFocus()

    await user.keyboard("[Space]")
    expect(panel).toHaveTextContent("Home page")
  })
})
