import { Connection } from "mongoose";

declare global {
    var mongoose : {
        // conn : Connection || null;
        conn : Connection | null;
        promise : Promise<Connection> | null
    }
}