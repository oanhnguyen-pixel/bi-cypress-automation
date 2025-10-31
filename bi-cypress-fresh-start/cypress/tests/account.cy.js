import Accounts from "../support/functions/Accounts.js";
import common from "../support/functions/common.js";
import CommonData from "../support/utils/commonData.js";
import { getTestConfig } from "../support/utils/TestConfigUtils.js";

describe("Authentication: SSO Portal Login", () => {
  const testID = "ACCOUNT-001";
  const accountID = "00000000-0000-0000-0000-000000000001";

  it(
    `${testID}: Should successfully navigate through the first step of login`,
    { tags: testID },
    () => {
      getTestConfig(testID).then((config) => {
        // ⚠️ BƯỚC 1: FETCH DATA USER TỪ FIXTURES BÊN TRONG TEST SCRIPT
        cy.fixture("userData.json").then((allUsers) => {
          const user = allUsers[config.userKey]; // Lấy user object

          // ⚠️ BƯỚC 2: GỌI HÀM LOGIN VỚI USER OBJECT ĐÃ LẤY
          cy.bypassLogin(user);
        });
      });

      cy.url().should("include", "/" + accountID);
      common.goTo(common.accountsPage);
      //   Accounts.goToPath(Accounts.newBtn);

      //   const accountName_ACC001 = `[Cypress] Jynx ${CommonData.getTimestamp()}`;
      const accountName_ACC001 = `[Cypress] Jynx 251031175151`;

      //   const appEnabled = [
      //     CommonData.APPLICATIONS.INTELLIGENCE_SERVICE_DEV,
      //     CommonData.APPLICATIONS.STORABLE_EDGE,
      //     CommonData.APPLICATIONS.STORABLE_PORTAL,
      //   ];

      //   cy.get('input[name="name"]').type(accountName_ACC001);
      //   common.clickActionButtonInForm(CommonData.BUTTON_NAMES.SUBMIT);
      common.clickTableActionButton(
        accountName_ACC001,
        CommonData.BUTTON_NAMES.DETAILS
      );
      //   common.clickActionButton(CommonData.BUTTON_NAMES.ASSIGN_APP);
      //   Accounts.switchApplicationButton(appEnabled, true);
      //   common.clickActionButtonInForm(CommonData.BUTTON_NAMES.SUBMIT);
      common.clickActionButton(CommonData.BUTTON_NAMES.INITIALIZE);
      cy.contains("button", CommonData.BUTTON_NAMES.INITIALIZE).click();
      cy.wait(2000);
      //   common.clickActionButton(CommonData.BUTTON_NAMES.JUMP_INTO);
      Accounts.clickAndStayInTab(CommonData.BUTTON_NAMES.JUMP_INTO);
      cy.get("button.btn.btn-primary.float-end").click();
      Accounts.selectSharedEmailsOption(Accounts.SHARED_EMAIL_ID_YES);
      cy.get("button.btn.btn-primary.ms-2").click();
      Accounts.toggleStorableLoginSystem(true);
    }
  );
  // ... các test khác ...
});
