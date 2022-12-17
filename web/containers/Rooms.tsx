// import { useRef } from "react";
// import EVENTS from "../config/events";
// import { useSockets } from "../context/socket.context";

// function RoomsContainer() {
//   const { socket, roomId, rooms } = useSockets();
//   const newRoomRef = useRef(null);

//   function handleCreateRoom() {
//     //get the room name
//     const roomName = newRoomRef.current.value || "";

//     if (!String(roomName).trim()) return;

//     // emit room created event
//     socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

//     // set room anme input to empty string
//     newRoomRef.current.value = "";
//   }

//   function handleJoinRoom(key) {
//     if (key === roomId) return;

//     socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
//   }

//   return (
//     <nav>
//       <div>
//         <input ref={newRoomRef} type="text" placeholder="Room name" />
//         <button onClick={handleCreateRoom}>CREATE ROOM</button>
//       </div>

//       {Object.keys(rooms).map((key) => {
//         return (
//           <div key={key}>
//             <button
//               className="bg-black-500"
//               disabled={key === roomId}
//               title={`Join ${rooms[key].name}`}
//               onClick={() => handleJoinRoom(key)}
//             >
//               {rooms[key].name}
//             </button>
//           </div>
//         );
//       })}
//     </nav>
//   );
// }

// export default RoomsContainer;

export {};
