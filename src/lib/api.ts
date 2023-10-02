import { createAlova } from "alova";
import ReactHook from "alova/react";
import GlobalFetch from "alova/GlobalFetch";

const fetcher = createAlova({
  baseURL: "http://localhost:3000",
  requestAdapter: GlobalFetch(),
  statesHook: ReactHook,
  responded: (response) => response.json()
});

export default fetcher;
