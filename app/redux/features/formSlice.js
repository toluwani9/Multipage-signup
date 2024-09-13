import Form1 from "@/components/Form1";
import Form2 from "@/components/Form2";
import Form3 from "@/components/Form3";
import Form4 from "@/components/Form4";
import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    currentStep: 1,
    isYearly: false,
    steps: [
        { id: 1, title: 'step 1', description: 'your info', },
        { id: 2, title: 'step 2', description: 'select plan', },
        { id: 3, title: 'step 3', description: 'add-ons', },
        { id: 4, title: 'step 4', description: 'summary', },
    ],
    userData: { name: '', email: '', phoneNo: '', plan: '', addOns: ['online service'] },
    prices: {
        monthly: {
            planPrices: [{ name: 'arcade', price: 9 }, { name: 'advanced', price: 12 }, { name: 'pro', price: 15 }],
            addOnsPrices: [{ name: 'online service', price: 1 }, { name: 'larger storage', price: 2 }, { name: 'customizable profile', price: 2 }]
        },
        yearly: {
            planPrices: [{ name: 'arcade', price: 90 }, { name: 'advanced', price: 120 }, { name: 'pro', price: 150 }],
            addOnsPrices: [{ name: 'online service', price: 10 }, { name: 'larger storage', price: 20 }, { name: 'customizable profile', price: 20 }]
        }
    }
  
}

export const formSlice = createSlice({
    name: "formdata",
    initialState,
    reducers: {
        nextStep: (state) => {
            if (state.currentStep < 5)
            state.currentStep += 1;
        },
        prevStep: (state) => {
            if (state.currentStep > 1)
            state.currentStep -= 1;
        },
        setIsYearly: (state) => {
            state.isYearly = !state.isYearly;
        },
        updateUserData: (state, { payload }) => { 
            state.userData = payload;
        }
    },
});

export const {nextStep,prevStep,setIsYearly,updateUserData } = formSlice.actions;
export default formSlice.reducer;
