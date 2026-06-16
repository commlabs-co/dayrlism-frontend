import React, { useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Hero from "../components/hero/Hero";
import AboutMain from "../components/about";
import Wrapper from "../layout/wrapper";
import SEO from "../components/Seo";
import Address from "../components/Address";
import Social from "../components/Social";
import Contact from "../components/Contact";
import Sponsor from "../components/Sponsor";

import SwitchDark from "../components/switch/SwitchDark";
import { menuItem } from "../helpers/consts";

const HomeDark = () => {
  useEffect(() => {
    document.querySelector("body").classList.remove("rtl");
  }, []);
  return (
    <Wrapper>
      <SEO
        pageTitle={
          "DAYRLISM: (There is a Reason) a positive attitude can change everything"
        }
      />

      <div className="yellow">
        <SwitchDark />
        {/* End Switcher */}
        <Tabs>
          <div className="header">
            <TabList className=" icon-menu revealator-slideup revealator-once revealator-delay1">
              {menuItem.map((item, i) => (
                <Tab className="icon-box" key={i}>
                  <i className={`fa ${item.icon}`}></i>
                  <h2>{item.menuName}</h2>
                </Tab>
              ))}
            </TabList>
          </div>
          {/* End Menu Content */}

          <div className="tab-panel_list">
            {/* Hero Content Starts */}
            <TabPanel className="home ">
              <div
                className="p-0 container-fluid main-container container-home g-0"
                data-aos="fade-up"
                data-aos-duration="1200"
              >
                <div className="color-block d-none d-lg-block"></div>
                <Hero />
              </div>
            </TabPanel>
            {/* Hero Content Ends */}

            {/* About Content Starts */}
            <TabPanel className="about">
              <div data-aos="fade-up" data-aos-duration="1200">
                <div className="title-section text-start text-sm-center">
                  <h1>
                    ABOUT <span>ME</span>
                  </h1>
                  <span className="title-bg">Resume</span>
                </div>
                {/* End title */}
                <AboutMain />
              </div>
            </TabPanel>
            {/* About Content Ends */}

            {/* Contact Content Starts */}
            <TabPanel className="contact">
              <div
                className="title-section text-start text-sm-center"
                data-aos="fade-up"
                data-aos-duration="1200"
              >
                <h1>
                  get in <span>touch</span>
                </h1>
                <span className="title-bg">contact</span>
              </div>
              <div
                className="container"
                data-aos="fade-up"
                data-aos-duration="1200"
              >
                <div className="row">
                  {/*  Left Side Starts */}
                  <div className="col-12 col-lg-4">
                    <h3 className="pb-3 mb-0 text-uppercase custom-title ft-wt-600">
                      Let&apos;s Connect
                    </h3>
                    <p className="mb-4 open-sans-font">
                      Feel free to reach out. I&apos;m open to discussing new
                      projects, creative ideas, or being part of your vision.
                    </p>
                    <Address />
                    {/* End Address */}
                    <h3 className="pt-3 pb-1 mb-0 text-uppercase custom-title ft-wt-600">
                      Follow Me
                    </h3>
                    <Social />
                    {/* End Social */}
                    <h3 className="pt-3 pb-1 mb-0 text-uppercase custom-title ft-wt-600">
                      Buy Me a Coffee
                    </h3>
                    <Sponsor />
                    {/* End Social */}
                  </div>
                  {/* Left Side Ends */}

                  {/*  Contact Form Starts  */}
                  <div className="col-12 col-lg-8">
                    <Contact />
                  </div>
                  {/*  Contact Form Ends */}
                </div>
              </div>
              {/* End .container */}
            </TabPanel>
            {/* Contact Content Ends */}

            {/* Version Content Starts */}
            <TabPanel className="version">
              <div
                className="text-left title-section text-sm-center "
                data-aos="fade-up"
                data-aos-duration="1200"
              >
                <h1>
                  Previous <span>version</span>
                </h1>
                <span className="title-bg">Changelog</span>
              </div>
              <div
                className="container"
                data-aos="fade-up"
                data-aos-duration="1200"
              >
                <div className="row pb-50">
                  <h3 className="pb-3 mb-0 text-uppercase ft-wt-600">
                    Changelog
                  </h3>
                  <p className="mb-4 open-sans-font">
                    Latest version 8.0.1, 2023-08-02: <br />
                    <a
                      style={{ color: "#70ffe1" }}
                      href="https://dayrlism.info"
                    >
                      https://dayrlism.info
                    </a>
                  </p>
                  <h3 className="pb-3 mb-0 text-uppercase ft-wt-600">
                    Previous versions
                  </h3>
                  <p className="mb-4 open-sans-font">
                    Version 5.0.0, 2020-01-30: <br />
                    <a
                      style={{ color: "#70ffe1" }}
                      href="https://v5.dayrlism.info"
                    >
                      https://v5.dayrlism.info
                    </a>
                  </p>
                  <p className="mb-4 open-sans-font">
                    Version 4.0.0, 2018-01-29: <br />
                    <a
                      style={{ color: "#70ffe1" }}
                      href="https://v4.dayrlism.info"
                    >
                      https://v4.dayrlism.info
                    </a>
                  </p>
                </div>
              </div>
            </TabPanel>
            {/* Version Content Ends */}
          </div>
        </Tabs>
      </div>
    </Wrapper>
  );
};

export default HomeDark;
