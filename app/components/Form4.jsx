"use client";
import { setIsYearly } from "@/redux/features/formSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import useFramer from "app/utils/useFramer";
import { useEffect, useState } from "react";

export default function Form4({ id, currentStep, getValues }) {
  const dispatch = useAppDispatch();
  const { prices, isYearly } = useAppSelector((store) => store.form);
  const userData = getValues();
  const addOns = userData.addOns;
  const billingCycle = isYearly ? "yearly" : "monthly";

  /**
   * Calculates the total price of the selected plan and add-ons based on the billing cycle.
   * @param {string} plan - The name of the selected plan.
   * @param {string} billingCycle - The billing cycle (either "yearly" or "monthly").
   * @param {array} addOns - An array of selected add-ons.
   * @returns {object} An object containing the selected plan, selected add-ons, and grand total.
   */
  const getPrice = (plan, billingCycle, addOns) => {
    const { planPrices, addOnsPrices } = prices[billingCycle];
    const selectedPlan = planPrices.find((p) => p.name === plan);
    const selectedAddOns = addOnsPrices.filter((a) => addOns.includes(a.name));
    const addOnsTotal = selectedAddOns.reduce((total, a) => total + a.price, 0);
    const grandTotal = addOnsTotal + selectedPlan?.price;

    return { selectedPlan, selectedAddOns, grandTotal };
  };

  const { selectedPlan, selectedAddOns, grandTotal } = getPrice(
    userData.plan,
    billingCycle,
    addOns
  );
  const { scope, animate, AnimatePresence, m, stagger } = useFramer();
  const [isPresent, setIsPresent] = useState(false);
  useEffect(() => {
    // currentStep === id ? setIsPresent(true) : setIsPresent(false);
    currentStep === id && setIsPresent(true);
  }, [isPresent, currentStep, id]);
  useEffect(() => {
    if (scope.current === null) return;
    animate(
      "header",
      { opacity: [0, 1], scale: [1.2, 1] },
      { duration: 0.5, delay: 1 }
    );
    animate(
      ".selected-container",
      { opacity: [0, 1] },
      { duration: 0.8, delay: 2 }
    );
    animate(".selected-plan", { opacity: [0, 1] }, { duration: 0.8, delay: 2 });
    animate(
      ".selected-addOn",
      { opacity: [0, 1], y: [-50, 0] },
      { duration: 0.8, delay: stagger(0.3, { startDelay: 2 }) }
    );
    animate(".total", { opacity: [0, 1] }, { duration: 0.8, delay: 3 });
  }, [isPresent, scope]);

  if (currentStep !== id) return null;
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
          className="lg:w-[420px] lg:h-[500px]">
          <header className="pb-5 lg:pb-8">
            <h1>Finishing up</h1>
            <p>Double-check everything looks OK before confirming.</p>
          </header>
          <div className="flex flex-col gap-5 lg:gap-8">
            <div className="selected-container bg-gray-100 flex flex-col p-3 lg:p-5 rounded-md gap-3">
              <div className=" selected-plan flex items-center justify-between border-b pb-2">
                <div className="">
                  <h2 className="capitalize">{`${userData.plan} (${
                    !isYearly ? "monthly" : "yearly"
                  })`}</h2>
                  <p
                    onClick={() => dispatch(setIsYearly(!isYearly))}
                    className=" underline cursor-pointer hover:text-indigo-700">
                    Change
                  </p>
                </div>
                <h2>{`$${selectedPlan.price}/${!isYearly ? "mo" : "yr"}`}</h2>
              </div>
              {selectedAddOns.length > 0 &&
                selectedAddOns.map((a) => {
                  return (
                    <div
                      key={a.name}
                      className="selected-addOn flex items-center justify-between">
                      <p>{a.name}</p>
                      <p className="text-blue-900">{`+$${a.price}/${
                        !isYearly ? "mo" : "yr"
                      }`}</p>
                    </div>
                  );
                })}
            </div>
            <div className="total flex items-center justify-between px-2">
              <p>{`Total (per ${isYearly ? "month" : "year"})`}</p>
              <p className="text-indigo-700 font-bold">{`+$${grandTotal}/${
                !isYearly ? "mo" : "yr"
              }`}</p>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
