"use client";
import useFramer from "app/utils/useFramer";
import { useEffect } from "react";

export default function Form1({
  id,
  currentStep,
  register,
  formState: { errors },
}) {
  //  const { register } = useFormContext();
  const { scope, animate, AnimatePresence, m, stagger, } = useFramer();

  useEffect(() => {

      animate('header', { opacity:[0,1], scale:[1.2,1] },{duration:0.5, delay:1,});
      animate(
        "label",
        {scale: [0, 1],opacity:[0,1] },
        {
          type: "spring",
          duration:0.8,
          bounce:0.5,
          delay: stagger(0.4, { startDelay: 2 }),
        }
      );
      animate(
        "input",
        {scale: [0, 1],opacity:[0,1] },
        {
          type: "spring",
          duration:0.8,
          bounce:0.5,
          delay: stagger(0.4, { startDelay: 2 }),
        }
      );
    
     
  },[] );

  // if(currentStep!==id) return null
  return (
    <AnimatePresence mode="wait">
      {currentStep !== id ? null : (
        <m.div
          layout
          key={id}
          id={id}
          ref={scope}
          className=" lg:w-[420px] lg:h-[500px] overflow-hidden"
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1],
            transition: { type: "spring", duration: 0.5, bounce: 0.5 },
          }}
          exit={{ display: "none", opacity: 0 }}>
          <header className="pb-5 lg:pb-8 ">
            <h1>Personal info</h1>
            <p>Please provide your name, email address, and phone number.</p>
          </header>
          <div className="input-container flex flex-col gap-5 ">
            <div className="flex flex-col gap-1  ">
              <div className="flex items-center justify-between">
                <label htmlFor="name">name</label>
                <p className="text-red-500 text-xs">{errors.name?.message}</p>
              </div>
              <input
                type="text"
                placeholder="e.g. Hillary Ifechukwu"
                className="  p-3 lg:p-4 w-full border bg-white text-blue-900 focus:bg-transparent rounded-md outline-0 focus:shadow-slate-800 focus:shadow-sm focus:border-2 focus:border-blue-800"
                id="name"
                {...register("name", {
                  required: { value: true, message: "name is required" },
                })}
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <div className="flex items-center justify-between">
                <label htmlFor="email">email address</label>
                <p className="text-red-500 text-xs">{errors.email?.message}</p>
              </div>
              <input
                type="email"
                placeholder="e.g.hillary@mail.com"
                className="  p-3 lg:p-4 w-full border bg-white text-blue-900 focus:bg-transparent rounded-md outline-0 focus:shadow-slate-800 focus:shadow-sm focus:border-2 focus:border-blue-800"
                id="email"
                {...register("email", {
                  required: { value: true, message: "email is required" },
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                    message: "invalid email",
                  },
                })}
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <div className="flex items-center justify-between">
                <label htmlFor="phoneNo">phone number</label>
                <p className="text-red-500 text-xs">
                  {errors.phoneNo?.message}
                </p>
              </div>
              <input
                type="phoneNo"
                placeholder="e.g.+234 000 000 0000"
                className="  p-3 lg:p-4 w-full border bg-white text-blue-900 focus:bg-transparent rounded-md outline-0 focus:shadow-slate-800 focus:shadow-sm focus:border-2 focus:border-blue-800"
                id="phoneNo"
                {...register("phoneNo", {
                  required: {
                    value: true,
                    message: "phone number is required",
                  },
                  pattern: {
                    value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i,
                    message: "invalid phone number",
                  },
                })}
              />
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
