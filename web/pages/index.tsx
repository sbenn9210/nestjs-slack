import { useRef } from "react";
import Chat from "../components/Chat";
import Search from "../components/Search";
import Sidebar from "../components/Sidebar";

import { useSockets } from "../context/socket.context";

export function Index(props: any) {
  const { socket, username, setUsername } = useSockets();
  const usernameRef = useRef({});

  function handleSetUsername() {
    const value = usernameRef?.current?.value;
    if (!value) {
      return;
    }

    setUsername(value);

    localStorage.setItem("username", value);
  }

  // useEffect(() => {
  //   if (usernameRef)
  //     usernameRef.current.value = localStorage.getItem("username") || "";
  // }, []);

  return (
    <div>
      {/* {!username && (
        <div>
          <input placeholder="Username" ref={usernameRef} />
          <button onClick={handleSetUsername}>START</button>
        </div>
      )}
      {username && (
        <>
          <RoomsContainer />
          <MessagesContainer />
        </>
      )} */}
      <div className="flex flex-col bg-gray-100 overflow-y-auto">
        <Search />
        <div className="flex">
          <Sidebar />
          <Chat />
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context: any) {
//   let user = {};
//   const res = await fetch("http://localhost:3333/api");
//   user = await res.json();

//   return {
//     props: {
//       user
//     }
//   };
// }

export default Index;
