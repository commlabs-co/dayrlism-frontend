import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import {
  ArrowLeftOutlined,
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,
  GlobalOutlined,
  UserOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";

import { color, types, titleAchievements } from "../helpers/consts";
import SEO from "../components/Seo";

const Home = () => {
  const [notionPage, setNotionPage] = useState(null);
  const [relatedData, setRelatedData] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    const fetchNotionPage = async () => {
      try {
        const response = await fetch(
          "https://mk-badminton.corplabs.co/pages/7ae5eaac97ca479a91a6ab83ac5805a4",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setNotionPage(data);

        // Fetch related data if there are relational properties
        const relationalProperties = Object.keys(data.properties).filter(
          (key) => data.properties[key].type === "relation"
        );

        const groupedRelatedDataPromises = relationalProperties.map(
          async (property) => {
            const relatedIds = data.properties[property].relation.map(
              (rel) => rel.id
            );
            const relatedPages = await Promise.all(
              relatedIds.map(fetchRelatedPage)
            );
            return { [property]: relatedPages };
          }
        );

        const groupedRelatedData = await Promise.all(
          groupedRelatedDataPromises
        );
        const mergedGroupedData = Object.assign({}, ...groupedRelatedData);
        setRelatedData(mergedGroupedData);
      } catch (error) {
        console.error("Error fetching data from Notion:", error);
      }
    };

    const fetchRelatedPage = async (id) => {
      const response = await fetch(
        `https://mk-badminton.corplabs.co/pages/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    };

    fetchNotionPage();
  }, []);

  return (
    <div className="bg-white">
      <SEO pageTitle={"Dayrl Lee: Resume"} />
      <div className="my-9 px-4">
        <div className="text-left">
          <a href="https://dayrlism.info" className="text-primary">
            <ArrowLeftOutlined className="text-2xl" />
          </a>
        </div>
        <div className="text-center mt-4">
          <ReactToPrint
            trigger={() => (
              <button className="bg-primary text-white px-4 py-2 rounded">
                PRINT RESUME
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </div>
      <Resume
        ref={componentRef}
        notionPage={notionPage}
        relatedData={relatedData}
      />
      <div className="my-9 px-4">
        <div className="text-center">
          <ReactToPrint
            trigger={() => (
              <button className="primary-500 text-white px-4 py-2 rounded">
                PRINT RESUME
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
        <div className="text-center mt-5">
          <a
            href="https://dayrlism.info"
            className="text-primary  text-xl font-bold"
          >
            BACK TO MAIN
          </a>
        </div>
      </div>
    </div>
  );
};

class Resume extends React.Component {
  render() {
    const { notionPage, relatedData } = this.props;
    const loading = !notionPage || !relatedData;

    const sortOrder = [
      "Tech Skills",
      "Skills",
      "Languages",
      "Certificates",
      "Educations",
      "Organizations",
      "Work Experience",
      "Volunteer Experience",
      "Interests",
      "Projects",
      "References",
    ];

    const sortedEntries = Object.entries(relatedData).sort((a, b) => {
      const indexA = sortOrder.indexOf(a[0]);
      const indexB = sortOrder.indexOf(b[0]);
      return indexA - indexB;
    });

    const getName = (page) => {
      if (page.properties.Name?.title?.[0]?.plain_text) {
        return page.properties.Name.title[0].plain_text;
      }
      if (page.properties.Name?.rich_text?.[0]?.plain_text) {
        return page.properties.Name.rich_text[0].plain_text;
      }
      return "Unnamed";
    };

    const getDescription = (page, propertyType) => {
      switch (propertyType) {
        case "Certificates":
          return page.properties.Skills?.rich_text?.[0]?.plain_text || "";
        case "Languages":
          return page.properties.Level?.select?.name || "";
        case "Educations":
          return page.properties.University?.rich_text?.[0]?.plain_text || "";
        default:
          return page.properties.Description?.rich_text?.[0]?.plain_text || "";
      }
    };

    const getPeriod = (page) => {
      return page.properties?.Period?.rich_text?.[0]?.plain_text || "";
    };

    return (
      <div
        className={`max-w-4xl mx-auto border border-black ${
          loading ? "opacity-50" : ""
        }`}
      >
        <div className="bg-primary text-white p-9">
          <div className="flex flex-wrap">
            <div className="w-full sm:w-5/6">
              <h1 className="text-4xl font-bold">
                {notionPage?.properties.Name.title[0].plain_text}
              </h1>
              <h2 className="text-xl text-primary mt-2 text-left">
                {notionPage?.properties.Role.rich_text[0].plain_text}
              </h2>
              <p className="mt-4">
                {notionPage?.properties.Bio.rich_text[0].plain_text}
              </p>
            </div>
            <div className="w-full sm:w-1/6 text-right mt-4 sm:mt-0">
              <img
                src={notionPage?.properties.Avatar.files[0]?.file.url}
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-grey inline-block"
              />
            </div>
          </div>
        </div>
        <div className="bg-primary text-white p-4 mt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center">
              <MailOutlined className="mr-2" />
              <span>{notionPage?.properties.Email.email}</span>
            </div>
            <div className="flex items-center">
              <PhoneOutlined className="mr-2" />
              <span>{notionPage?.properties["Phone Number"].phone_number}</span>
            </div>
            <div className="flex items-center">
              <LinkedinOutlined className="mr-2" />
              <a
                href={notionPage?.properties.Linkedin.rich_text[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {notionPage?.properties.Linkedin.rich_text[0].plain_text}
              </a>
            </div>
            <div className="flex items-center">
              <GlobalOutlined className="mr-2" />
              <a
                href={notionPage?.properties.Website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {notionPage?.properties.Website.url}
              </a>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4">
          {sortedEntries.map(([property, pages]) => {
            const title = property.replace(/([A-Z])/g, " $1").trim();
            let type;
            if (["Tech Skills", "Skills", "Interests"].includes(property)) {
              type = types.one;
            } else if (
              ["Certificates", "Languages", "Projects", "Educations"].includes(
                property
              )
            ) {
              type = types.two;
            } else if (
              ["Work Experience", "Volunteer Experience"].includes(property)
            ) {
              type = types.three;
            } else if (["References", "Organizations"].includes(property)) {
              type = types.four;
            }

            return (
              <div key={property} className="mb-6">
                <h3 className="text-2xl font-bold text-primary capitalize underline mb-2">
                  {title}
                </h3>
                <div>
                  {type === types.one && (
                    <div className="flex flex-wrap gap-2">
                      {pages.map((page) => (
                        <span
                          key={page.id}
                          className="bg-primary text-white px-2 py-1 rounded uppercase text-sm"
                        >
                          {getName(page)}
                        </span>
                      ))}
                    </div>
                  )}
                  {type === types.two && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {pages.map((page) => (
                        <div key={page.id} className="mb-2">
                          <div className="font-bold capitalize">
                            {getName(page)}
                            {property === "Certificates" && (
                              <span className="italic ml-2">
                                ({getPeriod(page)})
                              </span>
                            )}
                          </div>
                          <div className="uppercase">
                            {getDescription(page, property)}
                          </div>
                          {property === "Projects" &&
                            page.properties.Website?.url && (
                              <a
                                href={page.properties.Website.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                {page.properties.Website.url}
                              </a>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                  {type === types.three && (
                    <div>
                      {pages.map((page) => (
                        <div key={page.id} className="mb-4">
                          <div className="font-bold capitalize">
                            {getName(page)}
                          </div>
                          <div className="capitalize">
                            {page.properties.Company?.rich_text?.[0]
                              ?.plain_text || ""}
                          </div>
                          <div className="italic">{getPeriod(page)}</div>

                          {/* Responsibilities section */}
                          {page.properties.Responsibilities?.rich_text?.length >
                            0 && (
                            <>
                              <div className="italic mt-2">
                                Responsibilities:
                              </div>
                              {page.properties.Responsibilities.rich_text[0].plain_text
                                .split(",")
                                .map((responsibility, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start mt-1"
                                  >
                                    <CaretRightOutlined className="mr-2 mt-1" />
                                    <span className="capitalize">
                                      {responsibility.trim()}
                                    </span>
                                  </div>
                                ))}
                            </>
                          )}

                          {/* Existing Achievements section */}
                          <div className="italic mt-2">{titleAchievements}</div>
                          {page.properties.Achievements?.rich_text?.map(
                            (achievement, index) => (
                              <div
                                key={index}
                                className="flex items-start mt-1"
                              >
                                <CaretRightOutlined className="mr-2 mt-1" />
                                <span className="capitalize">
                                  {achievement.plain_text}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {type === types.four && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {pages.map((page) => (
                        <div key={page.id} className="mb-2">
                          <div className="font-bold capitalize">
                            {getName(page)}
                          </div>
                          <div
                            className={
                              property === "References"
                                ? "capitalize"
                                : "lowercase"
                            }
                          >
                            {getDescription(page, property)}
                          </div>
                          {page.properties.Contact && (
                            <div className="italic">
                              {page.properties.Contact.phone_number ||
                                page.properties.Contact.rich_text?.[0]
                                  ?.plain_text ||
                                ""}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
