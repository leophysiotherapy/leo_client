/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   env: {
      localhost: "http://localhost:4000/graphql",
      websocketLocalhost: "ws://localhost:4000/graphql",
      PAYPAL_CLIENT_ID:
         "AftuRb9G9NQzEK-cL9xR2DULgH9u2vuW3a7EsojNS_ownVdqifZ89mVnQH3M5LpveaaB3oyGcYjkr2cj",
   },
   images: {
      domains: [
         "ustproject.s3.ap-southeast-1.amazonaws.com",
         "i.ibb.co",
         "leophysio.s3.us-east-2.amazonaws.com",
      ],
   },
};

module.exports = nextConfig;
