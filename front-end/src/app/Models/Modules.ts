import { IconName } from "@fortawesome/fontawesome-common-types";

export class Modules {
    id?: any;
    slug?: string;
    name?: string;
    icon?: IconName;
    active?: boolean;
    limitPerPage?: number;
    menuOrder?: number;
}