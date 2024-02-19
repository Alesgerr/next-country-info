import React, { useEffect } from "react";
import Link from "next/link";
import ThemeComp from "./ThemeComp";
// import ThemeComp from "./ThemeComp";
const Header = () => {
//  useEffect(() => {
//    // Hydration kontrolü
//    if (typeof window !== "undefined") {
//      if (window.__NEXT_DATA__.dataManager) {
//        console.log("Client-side Hydration Tamamlandı");
//      } else {
//        console.log("Server-side Render (SSR) Tamamlandı");
//      }
//    }
//  }, []);
  const menu = [
    {
      name: "Category",
      url: "/category",
    },
    {
      name: "Sign In",
      url: "/login",
    },
  ];
  const menu2 = [
    {
      name: "Tv",
      url: "/tv/tvseries",
    },
    {
      name: "Movie",
      url: "/movieseries",
    },
  ];
  return (
    <header>
      <div className="px-5">
        <div className="flex items-center justify-between gap-3 h-20">
          <div className="text-3xl">
            <Link className="logo" href="/">Asgo</Link>
          </div>
          <div className="text-2x1 flex">
            {/* {menu2?.map((mn,i) => (
            <div key={i}>
               <Link className="me-1" href={mn.url}>{mn.name}</Link>
            </div>
          ))} */}
          </div>
          {/* <div className="flex items-center gap-2 border p-2 rounded-md flex-1 ">
            <input
              className="outline-none flex-1 bg-transparent"
              placeholder="Search..."
              type="text"
            />
            <CiSearch size={20} />
          </div> */}
          <ThemeComp />
          {/* {menu?.map((mn, i) => (
            <div key={i}>
              <Link href={mn.url}>{mn.name}</Link>
            </div>
          ))} */}
        </div>
      </div>
    </header>
  );
};

export default Header;
