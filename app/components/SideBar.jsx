"use client";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import mobileSidebar from "public/images/bg-sidebar-mobile.svg";
import desktopSidebar from "public/images/bg-sidebar-desktop.svg";
import { useMediaQuery } from "react-responsive";
import useFramer from "app/utils/useFramer";

export default function SideBar() {
  const { steps, currentStep } = useSelector((store) => store.form);
  const lg = useMediaQuery({ query: "(min-width: 1024px)" });
  const [sidebarSrc, setSidebarSrc] = useState("");
  
  useEffect(() => {
    setSidebarSrc(lg ? desktopSidebar.src : mobileSidebar.src);
  }, [lg]);
  const { scope, animate,stagger,m } = useFramer();
  useEffect(() => {
    animate(
      ".step",
      { opacity: [0, 1], y: [-100, 0] },
      { duration: 0.5, delay:stagger(0.5)}
    );
   }, []);

  return (
    <header
      ref={scope}
      className={` pt-12 min-h-[200px] w-full lg:w-[250px]  bg-slate-600 bg-no-repeat bg-cover lg:rounded-xl lg:pl-5 bg-center  text-white `}
      style={{
        backgroundImage: `url(${sidebarSrc})`,
      }}>
      <div className="flex lg:flex-col  justify-center gap-5 lg:gap-7">
        {steps.map((step, i) => {
          const { id, title, description: desc } = step;
          return (
            <div
              key={id}
              id={id}
              className={`step flex items-center justify-center lg:justify-start lg:gap-5 uppercase `}>
              <div
               
                className={`bullet border-2 rounded-full h-8 w-8 flex items-center justify-center p-4 ${
                  currentStep === id && "active"
                } font-bold  `}>
                {id}
              </div>
              <div className="lg:flex flex-col  hidden ">
                <p className="text-xs  text-white ">{title}</p>
                <p className="font-bold  text-white ">{desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </header>
  );
}
