type Environment =
  | 'local'
  | 'dev1'
  | 'dev2'
  | 'dev3'
  | 'dev4'
  | 'dev5'
  | 'dev6'
  | 'staging1'
  | 'staging2'
  | 'staging3'
  | 'staging4'
  | 'staging5'
  | 'staging6'
  | 'loadtest'
  | 'qa'
  | 'prod';
type LogLevel = 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'SILENT';

interface Config {
  name: string;
  app_url: string;
  app_icon_url: string;
  env: Environment;
  is_prod: boolean;
  version: string;
  uuid: string;
  logger_levels: {
    main: LogLevel;
  };
  base_url: {
    lhu: string;
  };
  web3_modal: {
    projectId: string;
  };
}
