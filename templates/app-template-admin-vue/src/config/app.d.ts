import { VueConstructor } from 'vue/types/umd';

export type BaseConfig = {
  appId: string;
  appName: string;
  logo?: string;
  toolId?: number;
};

type MenuItemBase = {
  name: string;
  icon?: string;
};

export interface MenuItemWithoutSubMenu extends MenuItemBase {
  path: string;
  component: VueConstructor;
}

export interface MenuItemWithSubMenu extends MenuItemBase {
  subMenu: MenuItemWithoutSubMenu[];
}

type MenuItem = MenuItemWithSubMenu | MenuItemWithoutSubMenu;

type MenuItems = MenuItem[];

export type MenuConfig = {
  menuItems?: MenuItems;
};

export type MiscellaneousConfig = {
  miscellaneous: {
    defaultAvatar: string;
  };
};

export interface AppConfig extends BaseConfig, MenuConfig, MiscellaneousConfig {}
