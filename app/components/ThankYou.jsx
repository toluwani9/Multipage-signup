"use client";
import {useEffect,useState} from "react";
import thanksIcon from "public/images/icon-thank-you.svg";
import Image from "next/image";
import Confetti from "react-confetti";
import useFramer from "app/utils/useFramer";
export default function ThankYou({ id, currentStep }) {
  const { scope, animate, AnimatePresence, m } = useFramer();
  if (currentStep !== id) return null;
  return (
    <AnimatePresence mode="wait">
      {currentStep !== id ? null :
        (<m.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1], transition: { type: "spring", duration: 1, bounce: 0.5 }, }}
        exit={{ display: "none" ,opacity:0}}
        id={id}
        className="lg:w-[420px] lg:h-[500px] flex items-center justify-center ">
        <div className="flex flex-col  items-center justify-center gap-0.5 ">
          <Confetti tweenDuration={25000} />
          <Image src={thanksIcon} alt="thanks" className="pb-4" />
          <h1>Thank you</h1>
          <p className="text-center">
            Thanks for confirming your subscription! We hope you have fun using
            our platform. If you ever need support, please feel free to email us
            at hillarynicholas13@gmail.com.
          </p>
        </div>
      </m.div>)}
    </AnimatePresence>
    
  );
}
