
import { env } from "process";

export const BASE_URL = `${window.location.protocol}//${
  window.location.hostname === "localhost" ||
  window.location.hostname === "192.168.2.166"
    ? "192.168.2.166"
    : "192.168.2.166"
}`;
// export const API_URL = "https://vedichind.com:7260/";
// production Time
export const API_URL = process.env.API_URL;

export const WEB_SOCKET_CONNECTION_URL =`${process.env.SOCKET_URL}`;

export const FrontendURL = `${window.location.protocol}//${window.location.hostname}:8000`;

export const FileUrl = `${window.location.protocol}//${window.location.hostname}/`;
