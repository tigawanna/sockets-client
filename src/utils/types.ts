

export type Chat ={ newMessage:{message: string; time: string,user:string }};
export interface User{username:string ; room:string}
export interface Room{users:number ; room:string}
export interface Message{
  message: string;
  time: string;
  user: string;
}
