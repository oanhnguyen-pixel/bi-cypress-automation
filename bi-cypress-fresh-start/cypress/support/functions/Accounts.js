// cypress/support/functions/LoginPage.js (ĐÃ SỬA)
import CommonPage from "./common.js";

class AccountPage {
  get newBtn() {
    return "/hyper/accounts/new";
  }
  get organizationsPage() {
    return "/hyper/organizations";
  }
  get facilitiesPage() {
    return "/hyper/facilities";
  }
  get usersPage() {
    return "/hyper/users";
  }
  get reportsPage() {
    return "/hyper/reports";
  }
  get systemJournalPage() {
    return "/hyper/system_journal";
  }

  //KHAI BÁO SELECTORS CỦA THANH NAV
  // ====================================================
  get navTabsContainer() {
    return "ul.nav-tabs.tab-bar";
  }

  // Selector cho bất kỳ liên kết nào trong thanh nav
  get navLink() {
    return ".nav-tabs .nav-link";
  }
  get applicationTableBody() {
    return "tbody";
  }

  userSettingsArea = '.card-body:has(h4:contains("User Settings"))';

  // 1.1. Selectors cho "Allowed Username Domains"
  USERNAME_DOMAIN_NAME = 'input[name="enforceUsernameDomain"]';
  DOMAIN_ID_NO = "#require-username-format-false-form-check";
  DOMAIN_ID_YES = "#require-username-format-true-form-check";

  // 1.2. Selectors cho "Shared Emails"
  SHARED_EMAIL_NAME = 'input[name="allowSharedEmails"]';
  SHARED_EMAIL_ID_NO = "#allow-shared-emails-false-form-check";
  SHARED_EMAIL_ID_YES = "#allow-shared-emails-true-form-check";

  STATIC_LOGIN_SYSTEM_ID = "#storable-login-system";
  // --- Functions/Actions để điều hướng ---

  // ====================================================
  // 3. HÀM ĐỘNG: Điều hướng bằng TÊN TRANG (Click)
  // ====================================================
  goToPageByName(pageName) {
    cy.log(`Navigating via click to page: ${pageName}`);
    // Hàm này tìm thẻ <a> có class 'nav-link' chứa văn bản mong muốn và click
    cy.contains(this.navLink, pageName).click();

    // Xác minh (optional)
    cy.url().should("include", `/hyper/${pageName.toLowerCase()}`);
  }

  // ====================================================
  // 4. HÀM ĐỘNG: Truy cập trực tiếp bằng Đường dẫn (Visit)
  // ====================================================
  goToPath(path) {
    cy.log(`Navigating via visit to path: ${path}`);
    cy.visit(path);
    cy.url().should("include", path);
  }

  switchApplicationButton(applicationNames, shouldBeEnabled) {
    // Đảm bảo applicationNames luôn là một mảng để dễ dàng lặp.

    const namesToProcess = Array.isArray(applicationNames)
      ? applicationNames
      : [applicationNames];

    // Lặp qua từng tên ứng dụng trong mảng.
    namesToProcess.forEach((applicationName) => {
      // Selector tìm hàng chứa tên ứng dụng (Sử dụng cy.contains để tìm <tr> chứa tên)
      // Lệnh này tìm td chứa tên, sau đó di chuyển lên <tr> cha của nó.
      const rowSelector = `tr:has(td:contains("${applicationName}"))`;

      // Bắt đầu chuỗi lệnh Cypress cho từng ứng dụng, bắt đầu từ tbody
      cy.get(this.applicationTableBody)
        .find(rowSelector)
        // Từ hàng đó, tìm input checkbox
        .find('td:first-child input[type="checkbox"].form-check-input')
        .then(($checkbox) => {
          const isCurrentlyChecked = $checkbox.is(":checked");
          const action = shouldBeEnabled ? "BẬT" : "TẮT";

          // Kiểm tra và thực hiện thao tác click nếu trạng thái khác mong muốn.
          if (shouldBeEnabled !== isCurrentlyChecked) {
            cy.wrap($checkbox).click({ force: true });
            cy.log(
              `✅ Đã chuyển công tắc cho "${applicationName}" sang trạng thái ${action}.`
            );
          } else {
            cy.log(
              `☑️ Công tắc cho "${applicationName}" đã ở trạng thái ${action} mong muốn. (Không cần thay đổi)`
            );
          }
        });
    });
  }

  clickAndStayInTab(btnName) {
    cy.get(CommonPage.actionButtonsContainer)
      .find("a, button")
      // Tìm thẻ có chứa text mong muốn và click
      .contains(btnName)
      .then(($link) => {
        // 1. Kiểm tra và loại bỏ thuộc tính target="_blank"
        // Việc này ngăn trình duyệt mở tab mới
        if ($link.attr("target") === "_blank") {
          cy.wrap($link).invoke("removeAttr", "target");
          cy.log('Đã loại bỏ thuộc tính target="_blank".');
        }

        // 2. Click vào liên kết
        // Vì target="_blank" đã bị loại bỏ, liên kết sẽ mở trong cùng một tab.
        cy.wrap($link).click();
      });
  }

  selectUsernameDomainOption(optionId) {
    // Sử dụng ID để tìm trực tiếp input, bỏ qua DOM traversal phức tạp
    cy.get(optionId)
      .check({ force: true }) // Chọn radio button đó
      .log(`✅ Đã chọn Domain ID: ${optionId}`);
  }

  /**
   * Chọn tùy chọn cho phần "Shared Emails" bằng cách sử dụng ID.
   * @param {string} optionId ID của input radio button (sử dụng UserSettingsPage.APPLICATIONS.NO/YES).
   */
  selectSharedEmailsOption(optionId) {
    // Sử dụng ID để tìm trực tiếp input
    cy.get(optionId)
      .check({ force: true })
      .log(`✅ Đã chọn Shared Email ID: ${optionId}`);
  }

  toggleStorableLoginSystem(shouldBeEnabled) {
    this._toggleSwitch(
      this.STATIC_LOGIN_SYSTEM_ID,
      "Storable's Login System",
      shouldBeEnabled
    );
  }
  _toggleSwitch(selector, labelName, shouldBeEnabled) {
    cy.get(selector).then(($checkbox) => {
      const isCurrentlyChecked = $checkbox.is(":checked");
      const action = shouldBeEnabled ? "BẬT" : "TẮT";

      if (shouldBeEnabled !== isCurrentlyChecked) {
        cy.wrap($checkbox).click({ force: true });
        cy.log(
          `✅ Đã chuyển công tắc "${labelName}" sang trạng thái ${action}.`
        );
      } else {
        cy.log(
          `☑️ Công tắc "${labelName}" đã ở trạng thái ${action} mong muốn. (Không cần thay đổi)`
        );
      }
    });
  }
}

export default new AccountPage();
