export interface MainMenu {
  /**
   * @param name: Menu name, eg. 首页, 列表页...
   * @param key: Menu path, eg. /home, /list, /list/item
   */
  name: string;
  key: string;
  icon?: string;
  subMenu?: MainMenu[];
}

export type MainMenus = MainMenu[];

export interface LayoutProps {
  /**
   * @param hasSidebar: Sidebar menu layout, or top menu layout
   * @param theme: App theme, dark or light, dark is default
   * @param menus: App main menu
   */
  hasSidebar?: boolean;
  theme?: 'dark' | 'light';
  menus?: MainMenu[];
}

export interface AppConfig {
  /**
   * @param appId: Is also artifactId, eg. app:simple-demo, the simeple-demo is appId
   * @param appName: App name for users, default is appId, eg. Hotpool, 频道运营工具
   * @param logo: App logo along with appName
   * @param menus: App menus config
   * @param helpDoc: Help document url
   * @param layout: Layout config
   */
  appId: string;
  appName?: string;
  logo?: boolean | string;
  menus: MainMenu[];
  helpDoc?: string;
  layout: LayoutProps;
}
