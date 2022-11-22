import { Params } from "@angular/router";

export type ISubmenu = {
  path: string;
  title: string;
  authorities: string[];
  queryParam?: Params;
};

export type IMenu = {
  path?: string;
  title?: string;
  icon?: string;
  root?: boolean;
  queryParam?: Params;
  authorities?: string[];
  submenu?: ISubmenu[];
}
