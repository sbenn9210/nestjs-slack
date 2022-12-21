import { createContext, useContext, useState } from "react";

interface Context {
  channelId: String;
  setChannelId: Function;
}

const GlobalContext = createContext<Context>({
  channelId: "",
  setChannelId: () => ""
});

function GlobalProvider(props: any) {
  const [channelId, setChannelId] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        channelId,
        setChannelId
      }}
      {...props}
    />
  );
}

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalProvider;
