import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SponsorShare } from "../helpers/consts";

const Social = () => {
  const [sponsorMsg, setSponsorMsg] = React.useState("");
  return (
    <>
      <div className="mb-5">
        <ul className="social list-unstyled pt-1">
          {SponsorShare.map((val, i) => (
            <li key={i}>
              <CopyToClipboard
                text={val.link}
                onCopy={() => {
                  setSponsorMsg(`Copied ${val.token} Address: ${val.link}`);
                }}
              >
                <a
                  href="!#"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  <i className={val.iconName}></i>
                </a>
              </CopyToClipboard>
            </li>
          ))}
        </ul>
        {sponsorMsg && (
          <span className="valid-feedback mt-0">{sponsorMsg}</span>
        )}
      </div>
    </>
  );
};

export default Social;
