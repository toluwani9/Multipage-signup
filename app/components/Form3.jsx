"use client";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import useFramer from "app/utils/useFramer";
export default function Form3({ id, currentStep, register, watch }) {
  const { isYearly } = useAppSelector((store) => store.form);
  const addOns = watch("addOns");

  const { scope, animate, AnimatePresence, m, stagger } = useFramer();
  const [isPresent, setIsPresent] = useState(false);
  useEffect(() => {
    // currentStep === id ? setIsPresent(true): setIsPresent(false);
    currentStep === id && setIsPresent(true);
  }, [currentStep, id, isPresent]);

  useEffect(() => {
    if (scope.current === null) return;
    animate(
      "header",
      { opacity: [0, 1], scale: [1.2, 1] },
      { duration: 0.5, delay: 1 }
    );
    animate(
      ".checkbox-container",
      { opacity: [0, 1], scale: [0, 1] },
      {
        type: "spring",
        bounce: 0.5,
        duration: 0.8,
        delay: stagger(0.4, { startDelay: 2 }),
      }
    );
  }, [isPresent, scope]);

  return (
    <AnimatePresence mode="wait">
      {currentStep !== id ? null : (
        <m.div
          ref={scope}
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1],
            transition: { type: "spring", duration: 0.5, bounce: 0.5 },
          }}
          exit={{ display: "none", opacity: 0 }}
          id={id}
          className="lg:w-[420px] lg:h-[500px] ">
          <header className="pb-5 lg:pb-8">
            <h1>Pick add-ons</h1>
            <p>Add-ons help enhance your gaming experience.</p>
          </header>
          <div className="flex flex-col gap-4 ">
            <div
              className={`checkbox-container border p-3 lg:p-5 lg:px-7 lg:gap-5 gap-3 flex items-center rounded-md cursor-pointer accent-indigo-700 ${
                addOns.includes("online service") &&
                "border-indigo-700  bg-sky-100/25"
              }`}>
              <input
                type="checkbox"
                value="online service"
                {...register("addOns")}
                className="w-6 h-6 mr-1.5 "
              />
              <label
                htmlFor="addOns"
                className="flex items-center w-full justify-center   ">
                <div className="w-full">
                  <span className="font-bold text-lg">Online service</span>

                  <p className="text-xs lg:text-sm ">
                    {" "}
                    Access to multiplayer games
                  </p>
                </div>
                {isYearly ? (
                  <span className="text-indigo-700 text-xs"> +$10/yr</span>
                ) : (
                  <span className="text-indigo-700 text-xs"> +$1/mo</span>
                )}
              </label>
            </div>
            <div
              className={`checkbox-container border p-3 lg:p-5 lg:px-7 lg:gap-5 gap-3 flex items-center rounded-md cursor-pointer accent-indigo-700 ${
                addOns.includes("larger storage") &&
                "border-indigo-700  bg-blue-100/40"
              }`}>
              <input
                type="checkbox"
                value="larger storage"
                {...register("addOns")}
                className="w-6 h-6 mr-1.5 "
              />
              <label
                htmlFor="addOns"
                className="flex items-center w-full justify-center ">
                <div className="w-full ">
                  <span className="font-bold text-lg ">Larger storage</span>

                  <p className="text-xs lg:text-sm ">
                    {" "}
                    Extra 1TB of cloud space{" "}
                  </p>
                </div>
                {isYearly ? (
                  <span className="text-indigo-700 text-xs "> +$20/yr</span>
                ) : (
                  <span className="text-indigo-700 text-xs "> +$2/mo</span>
                )}
              </label>
            </div>
            <div
              className={`checkbox-container border p-3 lg:p-5 lg:px-7 lg:gap-5 gap-3 flex items-center rounded-md cursor-pointer accent-indigo-700 ${
                addOns.includes("customizable profile") &&
                "border-indigo-700  bg-blue-100/40"
              }`}>
              <input
                type="checkbox"
                value="customizable profile"
                {...register("addOns")}
                className="w-6 h-6 mr-1.5 "
              />
              <label
                htmlFor="addOns"
                className="flex items-center w-full justify-center ">
                <div className="w-full">
                  <span className="font-bold text-lg">
                    customizable profile
                  </span>

                  <p className="text-xs lg:text-sm">
                    Custom theme on your profile
                  </p>
                </div>
                {isYearly ? (
                  <span className="text-indigo-700 text-xs"> +$20/yr</span>
                ) : (
                  <span className="text-indigo-700 text-xs"> +$2/mo</span>
                )}
              </label>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
