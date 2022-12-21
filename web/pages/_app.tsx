import "../styles/globals.css";
import type { AppProps } from "next/app";
import SocketsProvider from "../context/socket.context";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { useState } from "react";
import GlobalProvider from "../context/global.context";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SocketsProvider>
          <GlobalProvider>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </GlobalProvider>
        </SocketsProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
