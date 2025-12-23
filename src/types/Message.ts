export type Message = {
  id: string;
  sender: "user" | "other";
  content: string;
  timestamp: string;
  name?: string;
  type?: "text" | "image";
};
