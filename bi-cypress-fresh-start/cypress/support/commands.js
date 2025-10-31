// File: cypress/support/commands.js (FIXED CROSS-ORIGIN FLOW)

// LƯU Ý: Không import Page Object (LoginPage) vào đây nữa
// vì các lệnh gọi sẽ bị lỗi Cross-Origin nếu nằm ngoài cy.origin()

Cypress.Commands.add("login", (user) => {
  const performLogin = () => {
    // BƯỚC 1: KÍCH HOẠT CHUỖI CHUYỂN HƯỚNG TỪ MIỀN GỐC
    // Lệnh này kích hoạt quá trình chuyển hướng tức thời
    cy.visit("/");

    // BƯỚC 2: CHUYỂN NGỮ CẢNH SANG MIỀN XÁC THỰC
    cy.origin("https://login.stageable.io", { args: { user } }, ({ user }) => {
      // LƯU Ý: TOÀN BỘ LOGIC NHẬP LIỆU PHẢI Ở ĐÂY

      // Thao tác 1: Nhập Username và Click Next
      // Sử dụng selectors #idp-discovery-username trực tiếp
      cy.get("#idp-discovery-username").type(user.username);
      cy.get("#idp-discovery-submit").click();
      cy.wait(2000);
      cy.get("body").then(($body) => {
        // 2. Kiểm tra DOM thủ công bằng JQuery/JavaScript
        if ($body.find("#okta-signin-password").length > 0) {
          cy.log("Password field is present. Entering credentials.");

          // 3. Thực hiện thao tác nhập liệu
          cy.get("#okta-signin-password").type(user.password, { log: false });
          cy.get("#okta-signin-submit").click();
        } else {
          // Trường hợp không có trường mật khẩu (ví dụ: đã xác thực)
          cy.log("Password field is NOT present. Continuing to dashboard.");
        }
      });
    });
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
const STATIC_OKTA_TOKEN_STORAGE = JSON.stringify({
  idToken: {
    idToken:
      "eyJraWQiOiJZOGV3ZVZoV3B4MlJyOF9MM1ZDQlhlSmtSLVk0SVQ3dHZSOW9ENkxuNF9vIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwMHVwYzk4eW9tUEJiV3J3azFkNyIsIm5hbWUiOiJPYW5oIE5ndXllbiIsImVtYWlsIjoib2FuaC5uZ3V5ZW5Ac3RvcmFibGUuY29tIiwidmVyIjoxLCJpc3MiOiJodHRwczovL2xvZ2luLnN0YWdlYWJsZS5pby9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6IjBvYWdmdjNmeGlzZG9iRzVEMWQ3IiwiaWF0IjoxNzYxOTEwMzc4LCJleHAiOjE3NjE5MTM5NzgsImp0aSI6IklELkQxRWZ0SHcta19TY1BnWHVMTVVSTVJtbHZJcGVmM0gyLW9SQTNjZVVPdHciLCJhbXIiOlsicHdkIl0sImlkcCI6IjBvYTNubWZ4cnIydU80OENyMWQ3Iiwibm9uY2UiOiJjY0dwTHNCdzVPTGZhS2xUaTVPUkNlZkg3dEFrSnFKdWhzMFQ0dXBjSGdOZFA1TXNGTGZjVHhxN2F4YmN4WlMyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoib2FuaC5uZ3V5ZW5Ac3RvcmFibGUuY29tIiwiYXV0aF90aW1lIjoxNzYxODk4MTY1LCJhdF9oYXNoIjoidklxeXpSdGRZRGQyOVdyUXNWSHkxUSJ9.rO-XYJjXvvC_ddJZaS8REHAGWAzlrEsTRwAI1NqZOrWxNCq7usmlGYAwWGH0V4btuH6CR7ewjNIBy2ZT3FwA7xtRcgSNBfoJg0mk2qF1VLTIHbeqzl0D5hQJ0HhCuOhkiJwwzqnnbIr1M3gB6Z9iWOZ52fCK4d31Jr40GyWuwxTTjrkhfzPxxoF7xDuL54J6Ek1ExDT1jabKXvwYDhUr3ZA-DEvcWCzAfLSWJE7nae4F9egofRsseqJCqRqrZCtBw5wSS6V3pmGMDJs5V-IJe8YrC5vlpjRWtz1EJDVMaKJ6e5AvLGzgEUicZ7pTfXGLsR4qBz2_Tg6UyQmWtmiMcQ",
    claims: {
      sub: "00upc98yomPBbWrwk1d7",
      name: "Oanh Nguyen",
      email: "oanh.nguyen@storable.com",
      ver: 1,
      iss: "https://login.stageable.io/oauth2/default",
      aud: "0oagfv3fxisdobG5D1d7",
      iat: 1761910378,
      exp: 1761913978,
      jti: "ID.D1EftHw-k_ScPgXuLMURMRmlvIpef3H2-oRA3ceUOtw",
      amr: ["pwd"],
      idp: "0oa3nmfxrr2uO48Cr1d7",
      nonce: "ccGpLsBw5OLfaKlTi5ORCefH7tAkJqJuhs0T4upcHgNdP5MsFLfcTxq7axbcxZS2",
      preferred_username: "oanh.nguyen@storable.com",
      auth_time: 1761898165,
      at_hash: "vIqyzRtdYDd29WrQsVHy1Q",
    },
    expiresAt: 1761913978,
    scopes: ["offline_access", "profile", "openid", "email"],
    authorizeUrl: "https://login.stageable.io/oauth2/default/v1/authorize",
    issuer: "https://login.stageable.io/oauth2/default",
    clientId: "0oagfv3fxisdobG5D1d7",
  },
  accessToken: {
    accessToken:
      "eyJraWQiOiJZOGV3ZVZoV3B4MlJyOF9MM1ZDQlhlSmtSLVk0SVQ3dHZSOW9ENkxuNF9vIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULi03QzdycFBWNWVra2ZmVjdPY3RhUjJ6emt3YUhyZ0RqTEhvOE5BSjJSbm8ub2FyMWdzM2FzMkhpQzloM3ExZDciLCJpc3MiOiJodHRwczovL2xvZ2luLnN0YWdlYWJsZS5pby9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE3NjE5MTAzNzgsImV4cCI6MTc2MTkxMTI3OCwiY2lkIjoiMG9hZ2Z2M2Z4aXNkb2JHNUQxZDciLCJ1aWQiOiIwMHVwYzk4eW9tUEJiV3J3azFkNyIsInNjcCI6WyJvZmZsaW5lX2FjY2VzcyIsInByb2ZpbGUiLCJvcGVuaWQiLCJlbWFpbCJdLCJhdXRoX3RpbWUiOjE3NjE4OTgxNjUsInN1YiI6Im9hbmgubmd1eWVuQHN0b3JhYmxlLmNvbSJ9.UisDCELnqv8VPPNtzllxtrQ2FVUHJYrpSZud_VgRe6UZNWTj-wJxlbZjoWSMAqKrcgUtU7N22vUYIFaZCKDfFDhwsLThG7C7sfF-zwYBZKZi_wwJqJUM1UOmSspReq7Kk2MDU6PTBqFJoaf9kKqmEavr8_lNnsmdwZvGQVyy6_P48rNLm2l23DOkaX1SRo0gY__i3GJ_pnuGklNJTZD86MkvWmumkn8QW-J-IFYXRRXZUJWmahAnVfhCHi9t1LsneOZYNyGa0oVezz2vh3KMTqGYB8UPIW8AS2lrtp_69DbKya5mRY--HHYTIW3ZWmeduYP4nQVi4MR575jiuZ5X8w",
    claims: {
      ver: 1,
      jti: "AT.-7C7rpPV5ekkffV7OctaR2zzkwaHrgDjLHo8NAJ2Rno.oar1gs3as2HiC9h3q1d7",
      iss: "https://login.stageable.io/oauth2/default",
      aud: "api://default",
      iat: 1761910378,
      exp: 1761911278,
      cid: "0oagfv3fxisdobG5D1d7",
      uid: "00upc98yomPBbWrwk1d7",
      scp: ["offline_access", "profile", "openid", "email"],
      auth_time: 1761898165,
      sub: "oanh.nguyen@storable.com",
    },
    expiresAt: 1761911278,
    tokenType: "Bearer",
    scopes: ["offline_access", "profile", "openid", "email"],
    authorizeUrl: "https://login.stageable.io/oauth2/default/v1/authorize",
    userinfoUrl: "https://login.stageable.io/oauth2/default/v1/userinfo",
  },
  refreshToken: {
    refreshToken: "RPQwtrmFzhU9KfdBdETMWDHqz1wjpLr7-fK9n-xsxyQ",
    expiresAt: 1761911278,
    scopes: ["offline_access", "profile", "openid", "email"],
    tokenUrl: "https://login.stageable.io/oauth2/default/v1/token",
    authorizeUrl: "https://login.stageable.io/oauth2/default/v1/authorize",
    issuer: "https://login.stageable.io/oauth2/default",
  },
});
Cypress.Commands.add("bypassLogin", (user) => {
  // 1. Dùng cy.request để truy cập một trang và thiết lập cookie
  // LƯU Ý: Bạn có thể cần hỏi Dev Lead tên cookie chính xác

  // cy.setCookie("app_session_token", "GIÁ_TRỊ_COOKIE_BẠN_LẤY_ĐƯỢC", {
  //   domain: "stageable.io",
  //   secure: true,
  // });

  // Hoặc nếu ứng dụng dùng Local Storage:
  cy.window().then((win) => {
    const parsedData = JSON.parse(STATIC_OKTA_TOKEN_STORAGE);
    win.localStorage.setItem("okta-token-storage", JSON.stringify(parsedData));
  });

  // 2. Truy cập thẳng trang dashboard
  cy.visit("/");
  // cy.url().should('include', '/dashboard');
  // Logic kiểm soát session...
  // if (user.session_control === 0) {
  //   cy.log(`Forced new login for user: ${user.username}`);
  //   performLogin();
  // } else {
  //   cy.log(`Using stored session for user: ${user.username}`);
  //   cy.session(user.username, performLogin);
  // }
});
