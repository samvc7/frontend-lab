import { fn, isDefined, pick, render, User } from "./basics"

describe("basics", () => {
  it("pick", () => {
    const user: User = {
      id: "kfjdlas",
      name: "George",
      email: "george.g@example.com",
      mobileNumber: 123,
      references: [{ id: "testid", name: "Klara" }],
    }

    const user2: User = {
      id: "kfjdlas",
      name: "George",
      email: "george.g@example.com",
      mobileNumber: 123,
      references: [{ id: "testid", name: "Klara" }],
    }

    const pickedAttributes = pick(user, ["email", "name"])
    expect(pickedAttributes).toEqual({
      name: "George",
      email: "george.g@example.com",
    })

    expect(user).toEqual(user2)
  })

  it("fn", () => {
    const result = fn("test")
    expect(result).toBe("test")
  })

  it("isDefined", () => {
    const value = 5
    const obj = {
      name: "test",
    }
    const result = isDefined(5)

    if (isDefined(obj)) {
      expect(result).toBe(true)
      expect(obj.name).toBe("test")
    } else {
      value
      obj
    }

    const val = null
    const nullResult = isDefined(val)
    if (isDefined(val)) {
      expect(nullResult).toBe(false)
      val
    } else {
      val
    }

    const undefinedResult = isDefined(undefined)
    expect(undefinedResult).toBe(false)

    // This is why you cannot type the return type just to boolean
    // with the is operator it narrows the type to the input type of x if true
    // try changing the return type of isDefined to boolean and compare nums type
    const arr = [1, null, 2, undefined, 3]

    // 1) With predicate — narrows to number[]
    const nums = arr.filter(isDefined) // type: number[] ✅

    // 2) With boolean — stays (number | null | undefined)[]
    const nums2 = arr.filter((x) => x != null) // type: (number | null | undefined)[] ❌
  })

  it.each`
    loadingState                                                      | expected
    ${{ status: "idle" }}                                             | ${"Idle"}
    ${{ status: "loading" }}                                          | ${"Loading..."}
    ${{ status: "error", error: "This is an error" }}                 | ${"Error: This is an error"}
    ${{ status: "success", data: [{ id: "testid", name: "Berta" }] }} | ${"Users: 1"}
  `(
    "render - expects $expected with loadingState $loadingState",
    ({ loadingState, expected }) => {
      expect(render(loadingState)).toBe(expected)
    }
  )
})
