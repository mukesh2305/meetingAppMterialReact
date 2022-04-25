import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "970c25658bc14010ae84f0a2ffc8fdee";
const token = "006970c25658bc14010ae84f0a2ffc8fdeeIACgFQRCG4OuUrGf4CLo35bVx9JRSrfAfLs0pw6ZsDYq8GTNKL8AAAAAEADzxwcSbhgNYgEAAQBuGA1i";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
