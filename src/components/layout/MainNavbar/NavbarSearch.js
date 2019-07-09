import React from "react";

export default ({setting}) => (
  <div className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
    <span className="brand">
      { setting && setting.site_name }
    </span>
  </div>
);
