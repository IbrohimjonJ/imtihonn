import { useEffect } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let images = formData.get("images");
  let time = formData.get("time");
  let Ingredients = formData.get("Ingredients");
  let Method = formData.get("Method");
  let Price = formData.get("Price");
  return { title,Price, images, time, Ingredients, Method };
};

function Create() {
  const { user } = useSelector((state) => state.user);
  const userData = useActionData();
    useEffect(() => {
    if (userData) {
      
      const Recipe = {
        title: userData.title,
        images: userData.images,
        time: userData.time,
        Ingredients: userData.Ingredients,
        Method: userData.Method,
        Price:userData.Price,
        uid: user.uid,
        createAt:serverTimestamp(),
       
      };
      addDoc(collection(db, "Recipes"), Recipe)
        .then(() => {
          toast.success("New Recipe Added");
        })
        .catch((error) => toast.error(error.message));
      userData.title = "";
      userData.images = "";
      userData.time = "";
      userData.Ingredients = "";
      userData.Method = "";
      userData.Price = "";
      user.uid = "";
    }
  }, [userData]);
  return (
    <>
      <img src="./e.webp" alt="img" className="absolute bg-cob" width={1600} />
      <div className=" w-full  flex justify-center h-[500px] absolute ">
        <div>
          <h1 className="text-3xl text-center text-white mt-2">New Retcep</h1>
          <Form method="post" className="sm:w-96 w-72 mt-1">
            <div>
              <h3 className="text-lg text-white ">Title:</h3>
              <input
                className="border w-full border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block mt-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Enter your meal name"
                name="title"
              />
            </div>
            <div>
              <h3 className="text-lg text-white ">Price:</h3>
              <input
                className="border w-full border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block mt-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                placeholder="Enter your price"                name="Price"
              />
            </div>
            <div>
              <h className="text-lg  text-white ">Cooking time:</h>
              <input
                className="border w-full border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block mt-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                placeholder="Enter preparation time of your meal"
                name="time"
                min="2"
                max="3600"
              />
            </div>
            <div>
              <h3 className="text-lg  text-white ">Ingredients:</h3>
              <div className="flex items-center gap-2">
                <input
                  className="border w-full border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block mt-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="Enter ingredients of meal"
                  name="Ingredients"
                  min="3"
                />
                <button className="btn btn-accent  rounded-xl w-20">Add</button>
              </div>
            </div>
            <div>
              <h3 className="text-lg  text-white ">Image URL:</h3>
              <div className="flex items-center gap-2">
                <input
                  className="border w-full border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block mt-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="url"
                  placeholder="Enter image URL"
                  name="images"
                  min="3"
                />
                <button className="btn btn-accent rounded-xl  w-20">Add</button>
              </div>
            </div>
            <div>
              <h3 className="text-lg  text-white ">Method:</h3>
              <textarea
                className="border w-full border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block mt-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="Method"
                id=""
                cols="30"
                rows="5"
                placeholder="Enter method of meal"
              ></textarea>
            </div>
                       <label className="grid grid-cols-2 gap-5 mt-2">
              <button className="btn btn-accent">Applay</button>
              <button className="btn btn-success">Preview</button>
            </label>
                     </Form>
        </div>
      </div>
    </>
  );
}

export default Create;
