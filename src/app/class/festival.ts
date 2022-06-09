import { Tag } from "./tag";
import { User } from "./user";

export class Festival {
    id?: Number;
    name?: String;
    type?: String;
    description?: String;
    dateEnd?: Date;
    dateStart?: Date;
    color?: String;
    cancelled?: Boolean;
    User?: User;
    Tag?: Tag;
}