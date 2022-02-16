import appConfig from '@/config/app.config';
import { VueConstructor } from 'vue/types/umd';
import { Menu, Item } from '@/components/GenericMenu/types';
import { MenuItem, MenuItemWithSubMenu } from './app';

type Route = {
  path: string;
  component: VueConstructor;
};

function doesMenuItemHaveSubmenu(menuItem: MenuItem): menuItem is MenuItemWithSubMenu {
  return (menuItem as MenuItemWithSubMenu).subMenu !== undefined;
}

function getActualPath(path: string): string {
  return `/${path !== '/' ? path : ''}`;
}

export function getRoutesFromConfig(): Route[] {
  if (!appConfig.menuItems) {
    return [];
  }

  const res = appConfig.menuItems.map(item => {
    if (!doesMenuItemHaveSubmenu(item)) {
      return {
        path: getActualPath(item.path),
        component: item.component,
      };
    }
    return item.subMenu.map<Route>(subItem => {
      return {
        path: getActualPath(subItem.path),
        component: subItem.component,
      };
    });
  });
  return res.flat();
}

export function getMenuItemsFromConfig(): Menu {
  return appConfig.menuItems
    ? appConfig.menuItems.map<Item>(item => {
        const res: Item = {
          name: item.name,
          icon: item.icon,
        };
        if (doesMenuItemHaveSubmenu(item)) {
          res.subItems = item.subMenu.map<Item>(item => {
            return {
              path: getActualPath(item.path),
              name: item.name,
              icon: item.icon,
            };
          });
        } else {
          res.path = getActualPath(item.path);
        }
        return res;
      })
    : [];
}

export function getDefaultAvatarFromConfig(): string {
  return appConfig.miscellaneous.defaultAvatar;
}

export function getLogo(): string {
  return appConfig.logo || '';
}

export function getAppName(): string {
  return appConfig.appName;
}
