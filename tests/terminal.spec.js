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
  await expect(page).toHaveTitle('delarooster');
  const terminal = page.locator('body');
  await expect(terminal).toContainText('Welcome to my terminal curriculum vitae.');
  await expect(page.locator('.cmd-prompt')).toContainText('root@delarooster');

  const commands = {
    help: 'Available commands',
    whois: 'Technical Principal | Cloud Architecture & Platform Engineering',
    social: 'https://github.com/delarooster',
    work: 'Anton Tech',
    education: 'DePauw University',
    skills: 'Azure Cloud',
    softskills: 'Mentoring',
    languages: 'Latin',
    projects: 'IaC Module Library',
    ai: 'AI-Driven Delivery',
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
    if (command === 'help') await expect(terminal).toContainText('ai');
    if (command === 'work') {
      await expect(terminal).toContainText('Technical Principal');
      await expect(terminal).toContainText('May 2026 - Present');
      await expect(terminal).toContainText('Lead DevOps Engineer');
      await expect(terminal).toContainText('August 2022 - May 2026');
      await expect(terminal).not.toContainText('August 2022 - Present');
    }
    if (command === 'social') await expect(terminal).toContainText('https://linkedin.com/in/austindelarosa');
    if (command === 'projects') {
      await expect(terminal).toContainText('AI Delivery Skills and Story Loops');
      await expect(terminal).toContainText('https://github.com/delarooster/skills');
      await expect(terminal).toContainText('Contractor Marketplace - Full-Stack Engineering');
      await expect(terminal).toContainText('refunds arriving before credits');
      await expect(terminal).toContainText('isolated worktrees and local test lanes');
      await expect(terminal).toContainText('Gear Saver');
      await expect(terminal).toContainText('Azure Tag Cleanup');
      await expect(terminal).toContainText('Terraform Module Testing');
      await expect(terminal).toContainText('chrome.storage.local');
      await expect(terminal).toContainText('value-preserving key renames');
      await expect(terminal).toContainText('expected failures for invalid names');
      await expect(terminal).not.toContainText('Engineering Delivery Metrics');
    }
    if (command === 'projects' || command === 'all') await expect(terminal).not.toContainText(/getwork|2fit/i);
    if (command === 'ai' || command === 'all') {
      await expect(terminal).toContainText('Independent review');
      await expect(terminal).toContainText('Human control');
    }
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
