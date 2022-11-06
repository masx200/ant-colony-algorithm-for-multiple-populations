import * as comlink from "comlink";

import { TSP_Worker_API } from "./TSP_Worker_API";

export type TSP_Worker_Remote = { worker: Worker; terminate: () => void } & {
    remote: comlink.RemoteObject<TSP_Worker_API> & comlink.ProxyMethods;
};
