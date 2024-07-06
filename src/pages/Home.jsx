import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import CreateRetsep from "../componets/CreateRetsep";

function Home() {
  const { user } = useSelector((state) => state.user);
    const { data } = useCollection(
   "Recipes",
   ["uid", "==", user.uid],["createAt"]
 );
 console.log((data))
 
  return (

    <div className="w-full bg-cover bg-center h-screen pt-5 bg-[url('././im.jpg')] dark:bg-[url('')]">
      <div>
        {data ? (
          <div className="flex justify-center">
            <div>
              <h1 className="text-3xl mb-5 text-white">Recipe</h1>
              {data && <CreateRetsep data={data} />}
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:mb-20 mb-0 md:grid-cols-2 sm:grid-cols-1 gap-5 mx-auto text-white">
                     </div>
        )}
      </div>
    </div>
  );
}

export default Home;