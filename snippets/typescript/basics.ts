// basics & utility types
type Id = string | number
export interface User {
  id: Id
  name: string
  email?: string
  mobileNumber?: number
  references?: User[]
}

type ReadonlyUser = Readonly<User>

const readUser: ReadonlyUser = {
  id: "testit",
  name: "Sam",
}

const user: User = {
  id: "kfjdlas",
  name: "George",
  email: "george.g@example.com",
  mobileNumber: 123,
}

// user.name = "example@mail.com"

type WithCreatedAt<T> = T & { createdAt: Date }

const userWithCreatedAt: WithCreatedAt<User> = {
  id: "testId",
  name: "Mam",
  createdAt: new Date(),
}

type PartialUser = Partial<User>
const partial: PartialUser = {}
// const notPartial: User = {}
type RequiredUser = Required<User>
const required: RequiredUser = {
  id: "jdkfla",
  name: "Rick",
  email: "rick@mail.de",
  mobileNumber: 14334,
  references: [user],
}
type UserPreview = Omit<User, "email">
const preview: UserPreview = {
  id: "jkd314",
  name: "Simon",
  // email: "test@mail.com" - TS error
}
type UserKeys = keyof User
const userKey: UserKeys = "id"
// const userKeyWrong: UserKeys = "test"

// Functions & generics
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>

  for (const key of keys) result[key] = obj[key]

  return result
}

const pickedUserAttributes = pick(user, ["email"])

export const fn = <T>(x: T): T => x

const fnTest = fn("hello")

// Type narrowing
export function isDefined<T>(x: T | null | undefined): x is T {
  return x !== null && x !== undefined
}

// Discriminated unions
export type LoadState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; data: User[] }

export const render = (s: LoadState) => {
  switch (s.status) {
    case "idle":
      return "Idle"
    case "success":
      return `Users: ${s.data.length}`
    case "error":
      return `Error: ${s.error}`
    case "loading":
      return "Loading..."
    // default exhaustive covers all cases
    // when adding a new LoadState/case like {status: "empty"}, we get TS error because s is NOT never
    default: {
      const _exhaustive: never = s
      return _exhaustive
    }
  }
}
