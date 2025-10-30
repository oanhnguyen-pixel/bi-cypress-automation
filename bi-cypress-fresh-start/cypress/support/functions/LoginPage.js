// cypress/support/functions/LoginPage.js (ĐÃ SỬA)

class LoginPage {
    
    // --- 1. Element Definitions (Khai báo tất cả selectors ở đây) ---
    get usernameInput() { 
        return '#idp-discovery-username'; 
    }
    get nextButton() { 
        return '#idp-discovery-submit'; 
    }
    // Selectors cho màn hình Mật khẩu/Okta (màn hình chuyển hướng)
    get passwordInput() {
        return '#okta-signin-password'; // Selector mới
    }
    get submitButton() {
        return '#okta-signin-submit'; // Selector mới
    }

    // --- 2. Functions/Actions (Chỉ gọi tên khai báo) ---
    
    fillUsername(username) {
        cy.log(`Typing username: ${username}`);
        cy.get(this.usernameInput).type(username);
    }
    
    clickNext() {
        cy.get(this.nextButton).click();
    }

    fillPasswordAndSubmit(password) {
        cy.log('Typing password and submitting');
        cy.get(this.passwordInput).type(password, { log: false });
        cy.get(this.submitButton).click();
    }
}

export default new LoginPage();