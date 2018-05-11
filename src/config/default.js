/* @flow */

module.exports = {
  host: process.env.NODE_HOST || 'localhost', // Define your host from 'package.json'
  port: process.env.PORT,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Dayrlism',
    titleTemplate: 'DayrlismApp - %s',
    meta: [
      {
        name: 'description',
        content: 'dayrlism application'
      }
    ]
  }
};
