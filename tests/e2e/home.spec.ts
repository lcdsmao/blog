import { test, expect } from "@playwright/test"

test("home shows avatar and github link", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByAltText("lcdsmao avatar")).toBeVisible()
  await expect(page.getByRole("img", { name: "GitHub" })).toBeVisible()
})
