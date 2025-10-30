// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // 1. Chỉ định thư mục test scripts (tests)
    specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}', 
    // 2. Base URL của bạn
    baseUrl: 'https://sso-portal.auth.stageable.io', 
    // 3. Fix lỗi supportFile
    supportFile: 'cypress/support/commands.js', 
    // 4. Tăng timeout cho luồng SSO chậm
    defaultCommandTimeout: 30000,
    setupNodeEvents(on, config) {
      return config;
    },
  },
  // 5. Fix lỗi fixturesFolder
  fixturesFolder: 'cypress/testList', 
});