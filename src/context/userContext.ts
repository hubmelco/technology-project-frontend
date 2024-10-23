import { createContext } from "react";

export interface User {
    itemID: string,
    username: string,
    role: string,
    bio: string,
    genres: string[]
}

export const UserContext = createContext<User | undefined>(undefined);