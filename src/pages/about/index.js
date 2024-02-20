import React from "react";

const AboutPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          'url("https://pixelz.cc/wp-content/uploads/2018/05/planet-earth-at-night-uhd-8k-wallpaper.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto p-8 text-white rounded-lg shadow-md backdrop-blur-sm">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-gray-600">
          We are a platform that provides comprehensive information about
          countries. Our goal is to offer in-depth knowledge about different
          countries worldwide.
        </p>
        <p className="text-gray-600 mt-2">
          On our site, we aim to create an interactive environment for visitors
          to explore cross-cultural differences, geographies, histories, and
          more. We want to embrace anyone who travels, studies, or is simply
          curious about the world.
        </p>
        <p className="text-gray-600 mt-2">
          Navigate through our extensive collection of countries, discover
          interesting facts, and dive into the beauty of diversity. Thank you
          for being part of our global community!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
