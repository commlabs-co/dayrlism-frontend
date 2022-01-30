import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Hero from "../../components/hero/Hero";
import Index from "../../components/about/index";
import Address from "../../components/Address";
// import Portfolio from "../../components/portfolio/Portfolio";
// import Blog from "../../components/blog/Blog";
import Contact from "../../components/Contact";
import Social from "../../components/Social";
import Sponsor from "../../components/Sponsor";

import { menuItem, routes } from "../../helpers/consts";

const HomeDark = () => {
  return (
    <div className="yellow">
      <div className="demo-sticker">
        <a href={routes.light}>
          <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
        </a>
      </div>
      <Tabs>
        <div className="header">
          <TabList className=" icon-menu  revealator-slideup revealator-once revealator-delay1">
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
              className="container-fluid main-container container-home p-0 "
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
              <div className="title-section text-left text-sm-center">
                <h1>
                  ABOUT <span>ME</span>
                </h1>
                <span className="title-bg">Resume</span>
              </div>
              {/* End title */}
              <Index />
            </div>
          </TabPanel>
          {/* About Content Ends */}

          {/* Portfolio Content Starts */}
          {/* <TabPanel className="portfolio professional">
            <div
              className="title-section text-left text-sm-center"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <h1>
                my <span>portfolio</span>
              </h1>
              <span className="title-bg">works</span>
            </div>
            <div
              className="container grid-gallery main-content"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="100"
            >
              <Portfolio />
            </div>
          </TabPanel> */}
          {/* Portfolio Content Ends */}

          {/* Contact Content Starts */}
          <TabPanel className="contact">
            <div
              className="title-section text-left text-sm-center"
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
                  <h3 className="text-uppercase custom-title mb-0 ft-wt-600 pb-3">
                    Don't be shy !
                  </h3>
                  <p className="open-sans-font mb-4">
                    Feel free to get in touch with me. I am always open to
                    discussing new projects, creative ideas or opportunities to
                    be part of your visions.
                  </p>
                  <Address />
                  {/* End Address */}
                  <h3 className="text-uppercase custom-title mb-0 ft-wt-600 pb-1 pt-3">
                    Follow Me
                  </h3>
                  <Social />
                  {/* End Social */}
                  <h3 className="text-uppercase custom-title mb-0 ft-wt-600 pb-1 pt-3">
                    Buy Me a Coffee
                  </h3>
                  <Sponsor />
                  {/* End Sponsor */}
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

          {/* Blog Content Starts */}
          {/* <TabPanel className="blog">
            <div
              className="title-section text-left text-sm-center "
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <h1>
                my <span>blog</span>
              </h1>
              <span className="title-bg">posts</span>
            </div>
            <div
              className="container"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <div className="row pb-50">
                <Blog />
              </div>
            </div>
          </TabPanel> */}
          {/* Blog Content Ends */}
          {/* Version Content Starts */}
          <TabPanel className="version">
            <div
              className="title-section text-left text-sm-center "
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
                <h3 className="text-uppercase  mb-0 ft-wt-600 pb-3">
                  Changelog
                </h3>
                <p className="open-sans-font mb-4">
                  Latest version 8.0.0, 2022-01-29: <br />
                  <a href="https://dayrlism.info">https://dayrlism.info</a>
                </p>
                <h3 className="text-uppercase  mb-0 ft-wt-600 pb-3">
                  Older versions
                </h3>
                <p className="open-sans-font mb-4">
                  Version 5.0.0, 2020-01-30: <br />
                  <a href="https://v5.dayrlism.info">
                    https://v5.dayrlism.info
                  </a>
                </p>
                <p className="open-sans-font mb-4">
                  Version 4.0.0, 2018-01-29: <br />
                  <a href="https://v4.dayrlism.info">
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
  );
};

export default HomeDark;
