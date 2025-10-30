// cypress/tests/authen.cy.js (ĐÃ SỬA LỖI DATA)

import { getTestConfig } from '../support/utils/TestConfigUtils.js';

describe('Authentication: SSO Portal Login', () => {
    const testID = 'LOGIN-001'; 
    const accountID = '77135588-501a-4339-8cb7-5932287d768c'
    
    it(`${testID}: Should successfully navigate through the first step of login`, { tags: testID }, () => {
        
        getTestConfig(testID).then(config => {
            
            // ⚠️ BƯỚC 1: FETCH DATA USER TỪ FIXTURES BÊN TRONG TEST SCRIPT
            cy.fixture('userData.json').then(allUsers => {
                const user = allUsers[config.userKey]; // Lấy user object
                
                // ⚠️ BƯỚC 2: GỌI HÀM LOGIN VỚI USER OBJECT ĐÃ LẤY
                cy.login(user); 
            });
        });
        
        cy.url().should('include', '/'+ accountID); 
    });
    // ... các test khác ...
});