class CommonData {
  static get BUTTON_NAMES() {
    return {
      EDIT: "Edit",
      JUMP_INTO: "Jump Into",
      DETAILS: "Details",
      NEW: "New",
      ASSIGN_APP: "Assign Applications",
      INITIALIZE: "Initialize",
      DELETE_ACCOUNT: "Delete Account",
      SUBMIT: "Submit",
      CANCEL: "Cancel",
    };
  }

  static get APPLICATIONS() {
    return {
      INTELLIGENCE_SERVICE_DEV: "Intelligence Service Dev",
      MY_FOOT: "MyFoot",
      SHIPPING_CONSUMER_MANAGER: "Shipping Consumer Manager",
      SITELINK_CORPORATE_CONTROL_CENTER: "Sitelink Corporate Control Center",
      SITELINK_MY_HUB: "Sitelink MyHub",
      SITELINK_WEB_EDITION: "Sitelink Web Edition",
      STORABLE_EASY: "Storable Easy",
      STORABLE_EDGE: "Storable Edge",
      STORABLE_PORTAL: "Storable Portal",
      SUPPORT_CENTER: "Support Center",
      WEBHOOKS: "Webhooks",
    };
  }

  static getTimestamp() {
    const now = new Date();

    // Lấy 2 số cuối của năm (YY)
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }
}

export default CommonData;
