import React from "react";

const Address = () => {
  return (
    <>
      <p className="open-sans-font custom-span-contact position-relative">
        <i className="fa fa-map position-absolute"></i>
        <span className="d-block">Address Point</span>Kuala Lumpur, Malaysia
      </p>
      {/* End .custom-span-contact */}

      <p className="open-sans-font custom-span-contact position-relative">
        <i className="fa fa-envelope-open position-absolute"></i>
        <span className="d-block">mail me</span>{" "}
        <a href="mailto:steve@mail.com">halo@dayrlism.info</a>
        <br />
        <a href="mailto:steve@mail.com">dayrl.lee@im90s.org</a>
      </p>
      {/* End .custom-span-contact */}

      <p className="open-sans-font custom-span-contact position-relative">
        <i className="fa fa-phone-square position-absolute"></i>
        <span className="d-block">call me</span>{" "}
        <a href="Tel: +60166727208">+(60)166727208</a>
        <br />
        <a href="Tel: +6583937108">+(65)83937108</a>
      </p>
      {/* End .custom-span-contact */}
    </>
  );
};

export default Address;
