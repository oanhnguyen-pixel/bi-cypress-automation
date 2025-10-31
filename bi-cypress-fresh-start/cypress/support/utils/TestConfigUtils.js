// cypress/support/utils/TestConfigUtils.js

// Hàm đọc và tìm kiếm cấu hình cho một test ID cụ thể
export function getTestConfig(testId) {
  // ⚠️ LƯU Ý: Đã sửa tên file thành 'authen/authen.json' theo cấu trúc của bạn
  return cy.fixture("authen/account.json").then((config) => {
    const testConfig = config.test_run_list.find((t) => t.testID === testId);

    if (!testConfig) {
      // Ném lỗi rõ ràng nếu Test ID không có trong danh sách cấu hình
      throw new Error(
        `Cấu hình cho Test ID '${testId}' không tìm thấy trong file config.`
      );
    }
    return testConfig;
  });
}
