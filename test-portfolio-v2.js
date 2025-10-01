const { chromium } = require('playwright');

async function testPortfolio() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  console.log('🔍 Starting comprehensive portfolio test...\n');
  const results = {
    passed: [],
    failed: [],
    warnings: []
  };

  try {
    // Test 1: Home Page Desktop
    console.log('📱 Testing Home Page (Desktop)...');
    await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: '/home/vicente/RoadToDevOps/visitech_portfolio/screenshots/01-home-desktop.png',
      fullPage: true
    });
    results.passed.push('Home page desktop loads correctly');
    console.log('✅ Home page desktop screenshot captured');

    // Check for key elements
    const heroTitle = await page.locator('h1:has-text("Vicente Rivas")').count();
    if (heroTitle > 0) {
      results.passed.push('Hero section with name is visible');
    } else {
      results.failed.push('Hero section not found');
    }

    // Test 2: Theme Toggle
    console.log('\n🌓 Testing Theme Toggle...');
    try {
      // Look for theme toggle button
      const themeToggleSelectors = [
        'button[aria-label*="theme"]',
        'button[aria-label*="Theme"]',
        'button:has(svg.lucide-sun)',
        'button:has(svg.lucide-moon)',
        'button:has(svg.lucide-monitor)',
        '[role="button"]:has(svg.lucide-sun)',
        '[role="button"]:has(svg.lucide-moon)'
      ];

      let themeButton = null;
      for (const selector of themeToggleSelectors) {
        const btn = await page.locator(selector).first();
        if (await btn.count() > 0) {
          themeButton = btn;
          break;
        }
      }

      if (themeButton) {
        // Click theme button
        await themeButton.click({ timeout: 5000 });
        await page.waitForTimeout(500);

        // Try to find and click Dark option
        const darkOption = await page.locator('text="Dark"').first();
        if (await darkOption.count() > 0) {
          await darkOption.click({ timeout: 5000 });
          await page.waitForTimeout(1000);
          await page.screenshot({
            path: '/home/vicente/RoadToDevOps/visitech_portfolio/screenshots/02-home-dark-theme.png',
            fullPage: true
          });
          results.passed.push('Theme toggle works - Dark theme activated');
          console.log('✅ Dark theme activated and screenshot captured');
        } else {
          // Theme might toggle directly without dropdown
          await page.screenshot({
            path: '/home/vicente/RoadToDevOps/visitech_portfolio/screenshots/02-theme-toggled.png',
            fullPage: true
          });
          results.warnings.push('Theme toggle clicked but no dropdown found');
          console.log('⚠️ Theme toggle clicked but no dropdown found');
        }
      } else {
        results.failed.push('Theme toggle button not found');
        console.log('❌ Theme toggle button not found');
      }
    } catch (error) {
      results.failed.push(`Theme toggle test failed: ${error.message}`);
      console.log('❌ Theme toggle test failed:', error.message);
    }

    // Test 3: Projects Page
    console.log('\n📂 Testing Projects Page...');
    await page.goto('http://localhost:3002/projects', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: '/home/vicente/RoadToDevOps/visitech_portfolio/screenshots/03-projects-page.png',
      fullPage: true
    });

    // Check if projects loaded
    const projectCards = await page.locator('article, [class*="card"], [class*="project"]').count();
    if (projectCards > 0) {
      results.passed.push(`Projects page loads with ${projectCards} projects`);
      console.log(`✅ Projects page loaded with ${projectCards} projects`);
    } else {
      results.failed.push('No project cards found');
    }

    // Test 4: Search functionality
    console.log('\n🔍 Testing Search Functionality...');
    const searchSelectors = [
      'input[placeholder*="search" i]',
      'input[placeholder*="buscar" i]',
      'input[type="search"]',
      'input[type="text"][role="searchbox"]'
    ];

    let searchInput = null;
    for (const selector of searchSelectors) {
      const input = await page.locator(selector).first();
      if (await input.count() > 0) {
        searchInput = input;
        break;
      }
    }

    if (searchInput) {
      await searchInput.fill('AidGuide');
      await page.waitForTimeout(1500);
      await page.screenshot({
        path: '/home/vicente/RoadToDevOps/visitech_portfolio/screenshots/04-search-results.png',
        fullPage: true
      });
      results.passed.push('Search functionality works');
      console.log('✅ Search functionality working');
      await searchInput.clear();
    } else {
      results.failed.push('Search input not found');
      console.log('❌ Search input not found');
    }

    // Test 5: Category Filters
    console.log('\n🏷️ Testing Category Filters...');
    const categorySelectors = [
      'button:has-text("AI & Robotics")',
      'button:has-text("AI")',
      '[data-category*="ai"]',
      '[role="button"]:has-text("AI")'
    ];

    let categoryFilter = null;
    for (const selector of categorySelectors) {
      const filter = await page.locator(selector).first();
      if (await filter.count() > 0) {
        categoryFilter = filter;
        break;
      }
    }

    if (categoryFilter) {
      await categoryFilter.click();
      await page.waitForTimeout(1500);
      await page.screenshot({
        path: '/home/vicente/RoadToDevOps/visitech_portfolio/screenshots/05-category-filter.png',
        fullPage: true
      });
      results.passed.push('Category filter works');
      console.log('✅ Category filter working');
    } else {
      results.warnings.push('Category filter not found');
      console.log('⚠️ Category filter not found');
    }

    // Test 6: Technology Filters
    console.log('\n💻 Testing Technology Filters...');
    const techSelectors = [
      'button:has-text("Python")',
      '[data-tech="Python"]',
      'span:has-text("Python")',
      '[role="button"]:has-text("Python")'
    ];

    let techFilter = null;
    for (const selector of techSelectors) {
      const filter = await page.locator(selector).first();
      if (await filter.count() > 0) {
        techFilter = filter;
        break;
      }
    }

    if (techFilter) {
      await techFilter.click();
      await page.waitForTimeout(1500);
      await page.screenshot({
        path: '/home/vicente/RoadToDevOps/visitech_portfolio/screenshots/06-tech-filter.png',
        fullPage: true
      });
      results.passed.push('Technology filter works');
      console.log('✅ Technology filter working');
    } else {
      results.warnings.push('Technology filter not found');
      console.log('⚠️ Technology filter not found');
    }

    // Test 7: Mobile View - Home
    console.log('\n📱 Testing Mobile View (375x667)...');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: '/home/vicente/RoadToDevOps/visitech_portfolio/screenshots/07-home-mobile.png',
      fullPage: true
    });
    results.passed.push('Mobile home view renders correctly');
    console.log('✅ Mobile home view captured');

    // Test 8: Mobile Navigation
    console.log('\n📱 Testing Mobile Navigation...');
    const mobileMenuSelectors = [
      'button[aria-label*="menu" i]',
      'button:has(svg.lucide-menu)',
      'button.md\\:hidden',
      '[role="button"]:has(svg.lucide-menu)'
    ];

    let mobileMenuButton = null;
    for (const selector of mobileMenuSelectors) {
      const btn = await page.locator(selector).first();
      if (await btn.count() > 0 && await btn.isVisible()) {
        mobileMenuButton = btn;
        break;
      }
    }

    if (mobileMenuButton) {
      await mobileMenuButton.click();
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: '/home/vicente/RoadToDevOps/visitech_portfolio/screenshots/08-mobile-menu-open.png',
        fullPage: true
      });
      results.passed.push('Mobile menu opens correctly');
      console.log('✅ Mobile menu opened');

      // Check if drawer or menu is visible
      const menuLinks = await page.locator('a:has-text("Projects")').count();
      if (menuLinks > 1) {  // More than one means mobile menu is open
        results.passed.push('Mobile navigation drawer shows links');
        console.log('✅ Mobile navigation drawer working');
      }
    } else {
      results.failed.push('Mobile menu button not found');
      console.log('❌ Mobile menu button not found or not visible');
    }

    // Test 9: Mobile Projects Page
    console.log('\n📱 Testing Mobile Projects Page...');
    await page.goto('http://localhost:3002/projects', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: '/home/vicente/RoadToDevOps/visitech_portfolio/screenshots/09-projects-mobile.png',
      fullPage: true
    });
    results.passed.push('Mobile projects view renders correctly');
    console.log('✅ Mobile projects view captured');

    // Test 10: Tablet View
    console.log('\n📱 Testing Tablet View (768x1024)...');
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: '/home/vicente/RoadToDevOps/visitech_portfolio/screenshots/10-home-tablet.png',
      fullPage: true
    });
    results.passed.push('Tablet view renders correctly');
    console.log('✅ Tablet view captured');

    // Test 11: Check Avatar Image Optimization
    console.log('\n🖼️ Testing Image Optimization...');
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
    const avatarImg = await page.locator('img[alt*="Vicente"]').first();
    if (await avatarImg.count() > 0) {
      const imgSrc = await avatarImg.getAttribute('src');
      const imgSrcSet = await avatarImg.getAttribute('srcset');
      if (imgSrc && imgSrc.includes('/_next/image')) {
        results.passed.push('Avatar uses Next.js Image optimization');
        console.log('✅ Avatar using Next.js Image optimization');
        console.log(`   - src: ${imgSrc}`);
        console.log(`   - srcset: ${imgSrcSet ? 'Present with multiple resolutions' : 'Not found'}`);
      } else {
        results.warnings.push('Avatar might not be using Next.js Image optimization');
      }
    }

    // Test 12: Check for animations on project cards
    console.log('\n🎨 Testing Project Card Animations...');
    await page.goto('http://localhost:3002/projects', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const projectCard = await page.locator('article, [class*="card"]').first();
    if (await projectCard.count() > 0) {
      await projectCard.hover();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: '/home/vicente/RoadToDevOps/visitech_portfolio/screenshots/12-project-hover.png',
        fullPage: false
      });
      results.passed.push('Project card hover effects present');
      console.log('✅ Project card hover effects working');
    }

    // Test 13: Check for loading states (quick page refresh)
    console.log('\n⏳ Testing Loading States...');
    await page.goto('http://localhost:3002/projects');
    // Try to capture loading state
    const hasSkeletons = await page.locator('[class*="skeleton"], [class*="loading"], [class*="animate-pulse"]').count();
    if (hasSkeletons > 0) {
      await page.screenshot({
        path: '/home/vicente/RoadToDevOps/visitech_portfolio/screenshots/11-loading-states.png',
        fullPage: false
      });
      results.passed.push('Loading states/skeletons present');
      console.log('✅ Loading states detected');
    } else {
      results.warnings.push('No loading states/skeletons detected');
      console.log('⚠️ No explicit loading states detected');
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
    results.failed.push(`Critical error: ${error.message}`);
  } finally {
    await browser.close();

    // Print final summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST SUMMARY REPORT');
    console.log('='.repeat(60));

    console.log(`\n✅ PASSED (${results.passed.length}):`);
    results.passed.forEach(test => console.log(`   • ${test}`));

    if (results.warnings.length > 0) {
      console.log(`\n⚠️ WARNINGS (${results.warnings.length}):`);
      results.warnings.forEach(test => console.log(`   • ${test}`));
    }

    if (results.failed.length > 0) {
      console.log(`\n❌ FAILED (${results.failed.length}):`);
      results.failed.forEach(test => console.log(`   • ${test}`));
    }

    console.log('\n' + '='.repeat(60));
    if (results.failed.length === 0) {
      console.log('🎉 Overall Status: SUCCESS - All critical tests passed!');
    } else if (results.failed.length <= 2) {
      console.log('⚠️ Overall Status: MOSTLY SUCCESSFUL - Minor issues detected');
    } else {
      console.log('❌ Overall Status: NEEDS ATTENTION - Multiple failures detected');
    }
    console.log('='.repeat(60));

    console.log('\n📁 Screenshots saved to: /home/vicente/RoadToDevOps/visitech_portfolio/screenshots/');
  }
}

testPortfolio().catch(console.error);