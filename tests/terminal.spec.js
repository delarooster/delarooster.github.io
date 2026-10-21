const { test, expect } = require('@playwright/test');

test('terminal works without third-party services', async ({ page }) => {
  const errors = [];
  const failedRequests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('requestfailed', request => failedRequests.push(request.url()));
  page.on('response', response => {
    if (response.status() >= 400) failedRequests.push(response.url());
  });
  await page.route('**/*', route => {
    if (new URL(route.request().url()).hostname !== '127.0.0.1') return route.abort();
    return route.continue();
  });

  await page.goto('/');
  const terminal = page.locator('body');
  await expect(terminal).toContainText('Welcome to my terminal curriculum vitae.');
  await expect(page.locator('.cmd-prompt')).toContainText('root@atdlr');

  const commands = {
    help: 'Available commands',
    whois: 'Austin DeLaRosa',
    social: 'https://github.com/delarooster',
    work: 'Anton Tech',
    education: 'DePauw University',
    skills: 'Azure Cloud',
    softskills: 'Mentoring',
    languages: 'Latin',
    projects: 'IaC Module Library',
    certifications: 'AZ-400',
    source: 'hugo-theme-terminalcv',
    all: 'Austin DeLaRosa',
    'not-a-command': 'unknown command: not-a-command'
  };
  for (const [command, output] of Object.entries(commands)) {
    await page.evaluate(command => {
      const term = jQuery('body').terminal();
      term.clear();
      return term.exec(command);
    }, command);
    await expect(terminal).toContainText(output);
  }

  await page.evaluate(() => {
    const term = jQuery('body').terminal();
    term.clear();
    term.focus();
    term.set_command('who');
  });
  await page.keyboard.press('Tab');
  await expect.poll(() => page.evaluate(() => jQuery('body').terminal().get_command())).toBe('whois');
  await page.keyboard.press('Enter');
  await expect(terminal).toContainText('Austin DeLaRosa');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.austindelarosa.com/');
  await page.evaluate(() => { jQuery('body').terminal().exec('exit'); });
  await expect(page).toHaveURL('about:blank');
  expect(errors).toEqual([]);
  expect(failedRequests).toEqual([]);
});
