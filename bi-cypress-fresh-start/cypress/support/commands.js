// cypress/support/commands.js (ĐÃ TÍCH HỢP LOGIC OKTA MỚI)

import LoginPage from './functions/LoginPage.js';

Cypress.Commands.add('login', (userKey) => { 
  cy.fixture('userData.json').then(users => { 
    const user = users[userKey];
    
    const performLogin = () => {
      cy.visit('/'); 
      
      // BƯỚC 1: Thao tác trên Origin 1 (Username)
      LoginPage.fillUsername(user.username);
      LoginPage.clickNext();
      
      // BƯỚC 2: CHUYỂN NGỮ CẢNH SANG MIỀN XÁC THỰC (Nhập Mật khẩu)
      cy.origin('https://login.stageable.io', { args: { user } }, ({ user }) => {
          
          // LƯU Ý: Phải sử dụng lại selector vì không thể import Page Object vào đây
          // Logic này xử lý màn hình Mật khẩu và Submit trên miền Okta
          cy.get('#okta-signin-password').type(user.password, { log: false });
          cy.get('#okta-signin-submit').click(); 
          
      });
      
      cy.url().should('include', '/dashboard'); 
    };
    
    // Logic kiểm soát session...
    if (user.session_control === 0) {
      cy.log(`Forced new login for user: ${userKey}`);
      performLogin(); 
    } else {
      cy.log(`Using stored session for user: ${userKey}`);
      cy.session(user.username, performLogin); 
    }
  });
});