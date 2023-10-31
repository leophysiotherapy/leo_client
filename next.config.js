/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   images: {
      domains: [
         "ustproject.s3.ap-southeast-1.amazonaws.com",
         "i.ibb.co",
         "leophysio.s3.us-east-2.amazonaws.com",
      ],
   },
};

module.exports = nextConfig;
