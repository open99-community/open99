import { Pluto } from "@use-pluto/satellite";
const { CommsHandler } = Pluto._core;
const comms = CommsHandler.getInstance();

await comms.call("hello from init")