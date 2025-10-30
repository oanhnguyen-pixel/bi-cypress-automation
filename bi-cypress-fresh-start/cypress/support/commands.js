// File: cypress/support/commands.js (FIXED CROSS-ORIGIN FLOW)

// LƯU Ý: Không import Page Object (LoginPage) vào đây nữa
// vì các lệnh gọi sẽ bị lỗi Cross-Origin nếu nằm ngoài cy.origin()

Cypress.Commands.add('login', (user) => { 
    
    const performLogin = () => {
      
      // BƯỚC 1: KÍCH HOẠT CHUỖI CHUYỂN HƯỚNG TỪ MIỀN GỐC
      // Lệnh này kích hoạt quá trình chuyển hướng tức thời
      cy.visit('/'); 
      
      // BƯỚC 2: CHUYỂN NGỮ CẢNH SANG MIỀN XÁC THỰC
      cy.origin('https://login.stageable.io', { args: { user } }, ({ user }) => {
          
          // LƯU Ý: TOÀN BỘ LOGIC NHẬP LIỆU PHẢI Ở ĐÂY
          
          // Thao tác 1: Nhập Username và Click Next
          // Sử dụng selectors #idp-discovery-username trực tiếp
          cy.get('#idp-discovery-username').type(user.username); 
          cy.get('#idp-discovery-submit').click();             
          
          // Thao tác 2: Nhập Mật khẩu và Submit
          cy.get('#okta-signin-password').type(user.password, { log: false }); 
          cy.get('#okta-signin-submit').click(); 
          
      });
      
      // BƯỚC 3: Xác minh cuối cùng (Chờ redirect về Dashboard)
      cy.url().should('include', '/dashboard'); 
    };

    // Logic kiểm soát session...
    if (user.session_control === 0) {
      cy.log(`Forced new login for user: ${user.username}`);
      performLogin(); 
    } else {
      cy.log(`Using stored session for user: ${user.username}`);
      cy.session(user.username, performLogin); 
    }
});