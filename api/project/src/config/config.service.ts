class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  get(k: string, defaultValue?: any) {
    if (Object.keys(this.env).includes(k)) return this.env[k];
    return defaultValue;
  }
}

export const config = new ConfigService(process.env);
