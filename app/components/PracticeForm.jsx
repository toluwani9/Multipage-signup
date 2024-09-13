"use client";
import React, { useEffect, useRef } from "react";
import { useForm, useFieldArray, get } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
// import useGetData from "./utils/useGetData";
import axios from "axios";
import { use } from "react";
export default function PracticeForm() {
  // const {
  //   data: user,
  //   error,
  //   isLoading,
  // } = useGetData("https://jsonplaceholder.typicode.com/users/1");
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const userData = (
        await axios.get("https://jsonplaceholder.typicode.com/users/1")
      ).data;
      // console.log(userData)
      return {
        username: userData?.username,
        email: userData?.email,
        phoneNo: "",
        socialMedia: [{ linkedin: "" }],
        age:0,
        dob:null,
      };
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialMedia",
  });
  const handleGetValues = () => {
    console.log(getValues());
    setValue("username", "chisom");
}

  // to perform a side effect affter watching the value
  // can also be used to get the input element if notjhing is provided as a parameter
  // useEffect(() => {
    
//     const subscription = watch((username) => {
// console.log(username)
//     });

//     return () => subscription.unsubscribe();
    // must cleanUp
  //  }, [getValues,watch]);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="bg-blue-500 w-2/3 mx-auto p-10">
      <form
        className="flex flex-col capitalize gap-3 "
        onSubmit={handleSubmit(onSubmit)}
        noValidate>
        <div className="form-group flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            {...register("username", {
              required: { value: true, message: "username is required" },
            }
            )}
            className="p-2 rounded-md "
            type="text"
            id="username"
          />
          <p className="text-sm">{errors.username?.message}</p>
        </div>

        <div className="form-group flex flex-col">
          <label htmlFor="email">email address</label>
          <input
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "invalid email address",
              },
              validate: {
                notAdmin: (fieldValue) =>
                  fieldValue !== "chisomokereke1999@gmail.com" ||
                  "you are not authorized to use that email, try another email ",
                blackListed: (fieldValue) =>
                  !fieldValue.endsWith("@hello.com") || "domain not allowed ",
              },
            })
            }
            className="p-2 rounded-md"
            type="email"
            id="email"
          />
          <p className="text-sm">{errors.email?.message}</p>
        </div>

        <div className="form-group flex flex-col">
          <label htmlFor="phone">phone number</label>
          <input
            {...register("phoneNo", {
              pattern: {
                value:
                  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                message: "invalid phone number",
              },
            })}
            className="p-2 rounded-md"
            type="tel"
            id="phoneNo"
          />
          <p className="text-sm">{errors.phoneNo?.message}</p>
        </div>

        <div className="form-group social flex flex-col border p-5 pt-2">
          <h3 className="mx-auto">Social Media Handles</h3>
          <div className="flex gap-3 items-center">
            <div className="flex flex-col">
              {fields.map((field, i) => {
                return (
                  <div key={field.id} className="linkedin-input flex flex-col">
                    <label htmlFor="linkedin" className=" text-sm">
                      linkedin
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        {...register(`socialMedia.${i}.linkedin`)}
                        className="p-1 rounded-md w-full"
                        type="text"
                        id="linkedin"
                      />
                      {i > 0 && (
                        <button
                          type="button"
                          className="border rounded-md text-sm p-1 w-1/2"
                          onClick={() => remove(i)}>
                          remove
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              <button
                type="button"
                className="border rounded-md text-sm p-1  mt-3"
                onClick={() => append({ linkedin: "" })}>
                add
              </button>
            </div>

            {/* <div className="twitter-input flex flex-col">
          <label htmlFor="twitter" className=" text-sm">
            twitter
          </label>
          <input
            {...register("socialMedia.twitter", {
            })}
            className="p-1 rounded-md w-full"
            type="text"
            id="twitter"
          />
          </div> */}
          </div>
        </div>

        <div className="form-group flex flex-col">
          <label htmlFor="age">age</label>
          <input
            {...register("age", {
              valueAsNumber: true,
              min: { value: 1, message: "age is required" },
            })}
            className="p-2 rounded-md "
            type="number"
            id="age"
          />
          <p className="text-sm">{errors.age?.message}</p>
        </div>
        <div className="form-group flex flex-col">
          <label htmlFor="dob">date of birth</label>
          <input
          
            {...register("dob", {
              valueAsDate: true,
              required: { value: true, message: "date of birth is required" },
            })}
            className="p-2 rounded-md "
            type="date"
            id="dob"
          />
          <p className="text-sm">{errors.dob?.message}</p>
        </div>
        <button
          type="submit"
          className=" bg-blue-800 p-4 text-white text-xl uppercase w-1/2 mx-auto mt-3 rounded-md">
          submit
        </button>
        <button
          // type="button"
          onClick={handleGetValues}
          className=" bg-blue-800 p-4 text-white text-xl uppercase w-1/2 mx-auto mt-3 rounded-md">
          get values
        </button>
        {/* <DevTool control={control}/> */}
      </form>
    </div>
  );
}
