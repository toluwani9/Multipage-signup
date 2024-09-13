"use client";
import { useEffect, useState } from "react";
import arcadeIcon from "public/images/icon-arcade.svg";
import advancedIcon from "public/images/icon-advanced.svg";
import proIcon from "public/images/icon-pro.svg";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setIsYearly } from "@/redux/features/formSlice";
import useFramer from "app/utils/useFramer";
import { useIsPresent } from "framer-motion";
export default function Form2({
  id,
  currentStep,
  register,
  setValue,
  getValues,
  formState: { errors },
}) {
  const { isYearly } = useAppSelector((store) => store.form);
  const dispatch = useAppDispatch();
  const handleOptionClick = (option) => {
    //  Update the selected option value in the form
    setValue("plan", option, { shouldValidate: true });
  };
  const plan = getValues("plan");

  const { scope, animate, AnimatePresence, m, stagger } = useFramer();
  const [isPresent, setIsPresent] = useState(false);
  useEffect(() => {
    // currentStep === id ? setIsPresent(true): setIsPresent(false);
    currentStep === id && setIsPresent(true);
  }, [currentStep, id, isPresent]);
  //  animate header when component is mounted
  useEffect(() => {
    if (scope.current === null) return;
    animate(
      "header",
      { opacity: [0, 1], scale: [1.2, 1] },
      { duration: 0.5, delay: 1 }
    );
    animate(
      ".card-option",
      { opacity: [0, 1], scale: [0, 1] },
      {
        type: "spring",
        bounce: 0.5,
        duration: 0.8,
        delay: stagger(0.4, { startDelay: 2 }),
      }
    );
    animate(".plan-switch", { opacity: [0, 1] }, { duration: 1, delay: 3 });
  }, [animate, scope, isPresent]);
  //animate the height of the card otion when isYearly changes
  useEffect(() => {
    if (scope.current === null) return;
    if (isYearly) {
      animate(".card-option p", { opacity: [0, 1] }, { duration: 0.5 });
    } else {
      animate(".card-option p", { opacity: [0, 1] }, { duration: 0.5 });
    }
  }, [isYearly]);

  return (
    <AnimatePresence mode='wait' >
      {currentStep !== id ? null : (
        <m.div
          key={id}
          id={id}
          ref={scope}
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1],
            transition: { type: "spring", duration: 0.5, bounce: 0.5 },
          }}
          exit={{ display: "none", opacity: 0 }}
          className="lg:w-[450px] lg:h-[500px]">
          <header className="header pb-5 lg:pb-8">
            <h1>Select plan</h1>
            <p>You have the option of monthly or yearly billing.</p>
          </header>
          <div className="flex flex-col gap-3 lg:gap-5 lg:flex-row ">
            <m.div
             
              className={`card-option   ${
                plan === "arcade" && "border-indigo-700 bg-sky-100/25 "
              }`}
              onClick={() => handleOptionClick("arcade")}>
              <Image width={40} height={48} src={arcadeIcon} alt="arcade" />
              <div className="flex flex-col ">
                <h2>arcade</h2>
                {!isYearly ? (
                  <p>$9/mo</p>
                ) : (
                  <>
                    <p>$90/yr</p>
                    <p className="text-blue-900 text-sm">2 months free</p>
                  </>
                )}
              </div>
            </m.div>
            <m.div
            
              className={`card-option ${
                plan === "advanced" && "border-indigo-700  bg-sky-100/25 "
              }`}
              onClick={() => handleOptionClick("advanced")}>
              <Image width={40} height={48} src={advancedIcon} alt="advanced" />
              <div className="flex flex-col ">
                <h2>advanced</h2>
                {!isYearly ? (
                  <p>$12/mo</p>
                ) : (
                  <>
                    <p>$120/yr</p>
                    <p className="text-blue-900 text-sm">2 months free</p>
                  </>
                )}
              </div>
            </m.div>
            <m.div
             
              className={`card-option ${
                plan === "pro" && "border-indigo-700  bg-sky-100/25 "
              }`}
              onClick={() => handleOptionClick("pro")}>
              <Image width={40} height={48} src={proIcon} alt="pro" />
              <div className="flex flex-col ">
                <h2>pro</h2>
                {!isYearly ? (
                  <p>$15/mo</p>
                ) : (
                  <>
                    <p>$150/yr</p>
                    <p className="text-blue-900 text-sm">2 months free</p>
                  </>
                )}
              </div>
            </m.div>

            {/* The `<input type="hidden" {...register("plan", { required: true })} />` is creating a hidden input field in the form. It is using the `register` function from the form library to register the input field with the name "plan" and apply validation rules to it. In this case, the validation rule is set to `required: true`, which means that the field must have a value in order for the form to be considered valid. */}
            <input type="hidden" {...register("plan", { required: true })} />
          </div>
          {errors.plan && (
            <p className="text-red-500 text-xs">Please select a plan</p>
          )}
          <div className="plan-switch w-full p-4 mt-5 lg:mt-8 flex justify-center items-center gap-3 bg-gray-100 rounded-md">
            <p className={`${!isYearly && "text-blue-900 font-bold"}`}>
              Monthly
            </p>
            <button
              type="button"
              onClick={() => dispatch(setIsYearly())}
              className=" bg-blue-900 rounded-xl p-1 w-10  ">
              <div
                className={`bg-white rounded-full w-3 h-3 ${
                  isYearly && "float-right"
                }   `}></div>
            </button>
            <p className={`${isYearly && "text-blue-900 font-bold"}`}>Yearly</p>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
