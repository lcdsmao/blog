import { test, expect } from "@playwright/test"

test("hello loads wasm", async ({ page }) => {
  await page.goto("/hello")
  await expect(page.getByText("Hello World")).toBeVisible()
})
