// Streamer
interface User {
  name: string;
  count: number;
  position: number;
}

interface Emote {
  name: string;
  count: number;
  url: string;
  position: number;
}

export interface Streamer {
  twitch_id: number;
  name: string;
  videos_count: number;
  messages_count: number;
  emotes_count: number;
  time_count: number;
  avatar: string;
  users: [User];
  emotes: [Emote];
}
