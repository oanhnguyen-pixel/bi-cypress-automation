// cypress/support/functions/LoginPage.js (ĐÃ SỬA)

class CommonPage {
  get accountsPage() {
    return "/hyper/accounts";
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

  // --- Khai báo Selectors cho thanh Nav (để click) ---
  get navLink() {
    return ".nav-tabs .nav-link";
  }

  // Selector cho toàn bộ bảng Account
  get commonTable() {
    return "table.table-striped";
  }

  // Selector cho CỘT TÊN (để tìm hàng)
  get commonNameCells() {
    // Tìm thẻ <td> đầu tiên trong body bảng (chứa tên)
    return "tbody tr td:first-child";
  }

  // Selector cho container chứa tất cả các nút hành động (d.grid gap-2)
  get actionButtonsContainer() {
    return "div.card-body div.d-grid.gap-2";
  }
  get actionButtonsForm() {
    return "div.footer.d-flex.mt-2.border-top.pt-4";
  }
  // ====================================================
  // 2. HÀM CHUNG TÌM HÀNG THEO TÊN
  // ====================================================

  // Hàm tiện ích tìm hàng (tr) dựa trên tên Account
  getTableRowByName(commonName) {
    // Tìm ô <td> có chứa tên Account
    return (
      cy
        .contains(this.commonNameCells, commonName)
        // Di chuyển lên thẻ <tr> (hàng) chứa ô đó
        .closest("tr")
    );
  }
  // --- Functions/Actions để điều hướng ---

  // Hàm nhanh chóng truy cập một trang bằng cy.visit()
  goTo(path) {
    cy.visit(path);
  }

  // Hàm click vào thanh navigation (Tùy chọn)
  clickNavTo(pageName) {
    cy.contains(this.navLink, pageName).click();
    cy.url().should("include", this.pageName); // Thêm xác minh
  }

  /**
   * Hàm click vào một nút hành động cụ thể cho một commonName
   * @param {string} commonName - Tên của column Name (ví dụ: 'Testable')
   * @param {string} buttonText - Text của nút cần click (ví dụ: 'Jump Into', 'Edit', 'Details')
   */
  clickTableActionButton(commonName, buttonText) {
    cy.log(`Clicking ${buttonText} for row: ${commonName}`);

    // 1. Tìm hàng (tr) của Account đó
    this.getTableRowByName(commonName)
      // 2. Trong hàng đó, tìm liên kết <a> có chứa text của nút
      .find("a.btn")
      .contains(buttonText)
      .click();
  }
  /**
   * Hàm click vào một nút hành động dựa trên text của nút đó.
   * Hàm này tìm thẻ <a> hoặc <button> trong container.
   * @param {string} buttonText - Text hiển thị trên nút (ví dụ: 'Jump Into', 'Edit', 'Delete Account')
   */
  clickActionButton(buttonText) {
    cy.log(`Clicking action button: ${buttonText}`);

    cy.get(this.actionButtonsContainer)
      // Tìm tất cả các thẻ <a> hoặc <button> trong container
      .find("a, button")
      // Tìm thẻ có chứa text mong muốn và click
      .contains(buttonText)
      .click();
  }

  clickActionButtonInForm(buttonText) {
    cy.log(`Clicking action button: ${buttonText}`);

    cy.get(this.actionButtonsForm)
      // Tìm tất cả các thẻ <a> hoặc <button> trong form
      .find("a, button")
      // Tìm thẻ có chứa text mong muốn và click
      .contains(buttonText)
      .click();
  }
}

export default new CommonPage();
