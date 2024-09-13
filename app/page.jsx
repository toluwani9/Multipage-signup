/**
 * This component represents the main page of a multi-stage form.
 * It imports Form1, Form2, Form3, and Form4 components, as well as other dependencies such as react-responsive, react-hook-form, and redux.
 * It uses react-responsive to determine the screen size and set the wrapper class accordingly.
 * It uses redux to manage the current step and user data, and react-hook-form to control the form.
 * The submitForm function dispatches the nextStep and updateUserData actions to the redux store.
 * The component returns a form with the four form components, as well as previous and next buttons.
 */
"use client";
import Form1 from "./components/Form1";
import Form2 from "./components/Form2";
import Form3 from "./components/Form3";
import Form4 from "./components/Form4";
import ThankYou from "./components/ThankYou";
import { useMediaQuery } from "react-responsive";
import { nextStep, prevStep, updateUserData } from "./redux/features/formSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useForm } from "react-hook-form";   
import { useEffect, useState } from "react";
import useFramer from "./utils/useFramer";
import { LayoutGroup } from "framer-motion";

function Page() {
  const sm = useMediaQuery({ query: "(max-width: 1020px)" });
  const { currentStep, userData } = useAppSelector((store) => store.form);
  const dispatch = useAppDispatch();
  const formControl = useForm({ mode: "onTouched", defaultValues: userData });
  const {
    formState: { isDirty, isValid },
  } = formControl;
  const submitForm = (data) => {
    dispatch(nextStep());
    dispatch(updateUserData(data));
  };

  const [wrapperClass, setWrapperClass] = useState("");
  useEffect(() => {
    setWrapperClass(sm ? "wrapper pb-12" : "");
  }, [sm]);

  const { scope, animate,m } =useFramer();
  useEffect(() => {
    // animate the form wrapper when the current step changes
    // const start
    if (sm) {
  
        animate(
          '.mobile-wrapper',
          { opacity: [0, 1], scale:[0,1], },
          { duration: 1, }
        );
        // animate("form", { opacity: [0, 1] }, {duration:1, delay: 0.8 });
        animate('.btn-container', { opacity: [0, 1] }, { duration: 1, delay: 1 })
      };
  

  }, [ animate, scope, sm]);
  


  return (
    <div key="page" ref={scope} className="flex flex-col   ">
      <m.div
        layout
        transition={{ layout: { duration: 1 } }}
        className={`${wrapperClass} mobile-wrapper `}>
        {/* <FormProvider {...formControl}> */}
        <form noValidate>
          <Form1 id={1} currentStep={currentStep} {...formControl} />
          <Form2 id={2} currentStep={currentStep} {...formControl} />
          <Form3 id={3} currentStep={currentStep} {...formControl} />
          <Form4 id={4} currentStep={currentStep} {...formControl} />
          <ThankYou id={5} currentStep={currentStep} />
        </form>
        {/* </FormProvider> */}
      </m.div>
      {currentStep <= 4 && (
        <div className="btn-container bg-white h-20 p-5 mt-5   ">
          <div className="max-w-xl lg:max-w-5xl flex items-center justify-between  lg:px-0 mx-auto">
            <button
              className={`prev btn ${
                currentStep === 1 && "opacity-0 pointer-events-none"
              } `}
              onClick={() => dispatch(prevStep())}>
              Go Back
            </button>

            <button
              type="submit"
              className={`next btn`}
              onClick={formControl.handleSubmit(submitForm)}>
              {currentStep < 4 ? "Next step" : "Confirm"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Page;
