import { render } from "@testing-library/react"
import { screen, waitFor } from "@testing-library/dom"
import { userEvent } from "@testing-library/user-event"
import { SearchDebounced } from "./SearchDebounced"

describe("SearchDebounced test", () => {
  beforeEach(() => {
    render(<SearchDebounced />)
  })

  it("smoke", () => {
    const list = screen.getByRole("list")
    expect(list).toHaveTextContent("testingreacttypescriptreactJSJavaScript")
  })

  it("can search items & has delay", async () => {
    const user = userEvent.setup()
    const searchInput = screen.getByLabelText("Debounced Search")
    await user.click(searchInput)
    await user.type(searchInput, "script")

    const list = screen.getByRole("list")

    expect(list).toHaveTextContent("testingreacttypescriptreactJSJavaScript")

    await waitFor(() => expect(list).toHaveTextContent("typescriptJavaScript"))
  })
})
