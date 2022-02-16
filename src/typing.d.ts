export type BuildEnv = 'development' | 'testing' | 'production';

export interface InquirerAnswers {
  /**
   * @param appId: application id, eg: simple-admin
   * @param appName: application name, eg: Simple Admin
   * @param template: template id, eg: app-template-admin
   * @param config: template config, eg: { theme: 'dark' }
   * @param command: which command to exec
   */
  appId?: string;
  appName?: string;
  template?: string;
  tplConfig?: Array<{ [key: string]: any }>;
  config?: Array<{ [key: string]: any }>;
  command?: string;
  buildEnv?: BuildEnv;
}

// eris actions support
export type ActionType =
  | 'create'
  | 'start'
  | 'build'
  | 'exit'
  | 'install';
