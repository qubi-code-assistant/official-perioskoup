import { test, expect } from '@playwright/test'

test.describe('Waitlist Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/waitlist')
  })

  test('shows validation errors on empty submit', async ({ page }) => {
    await page.getByRole('button', { name: 'Join the Waitlist' }).click()

    // Check that error messages appear
    await expect(page.getByText('Name is required', { exact: true })).toBeVisible()
    await expect(page.getByText('Email is required', { exact: true })).toBeVisible()
    await expect(page.getByText('Clinic name is required')).toBeVisible()
    await expect(page.getByText('Country is required', { exact: true })).toBeVisible()
    await expect(page.getByText('Please select your role')).toBeVisible()
  })

  test('shows email validation error', async ({ page }) => {
    await page.fill('#wl-email', 'not-an-email')
    await page.getByRole('button', { name: 'Join the Waitlist' }).click()
    await expect(page.getByText('Enter a valid email')).toBeVisible()
  })

  test('submits form successfully', async ({ page }) => {
    await page.fill('#wl-name', 'Dr. Test Dentist')
    await page.fill('#wl-email', 'test@dental.com')
    await page.fill('#wl-clinic', 'Test Dental Clinic')
    await page.fill('#wl-country', 'Romania')
    await page.selectOption('#wl-role', 'dentist')

    await page.getByRole('button', { name: 'Join the Waitlist' }).click()

    // Wait for success message
    await expect(page.getByText(/on the list/i)).toBeVisible({ timeout: 5000 })
  })

  test('all form fields have associated labels', async ({ page }) => {
    const fields = ['wl-name', 'wl-email', 'wl-clinic', 'wl-country', 'wl-role']
    for (const id of fields) {
      const label = page.locator(`label[for="${id}"]`)
      await expect(label).toBeVisible()
    }
  })
})
