// Define allowed keys for prop value
const props = {
  first_visit_logged: '',
  device_id: '',
  session_token: '',
  refresh_token: '',
  session_token_start: '',
  session_token_exp: '',
  session_token_last_refresh: '',
};
const disabledGroupClearProps = ['device_id'];

type LocalStorageValue = string | undefined | null;
type Prop = keyof typeof props;

// Function to get property value in localStorage
const get = (prop: Prop): LocalStorageValue => {
  return localStorage.getItem(prop);
};

// Function to get all property values in localStorage
const getAll = (): Record<Prop, LocalStorageValue> => {
  const keys = Object.keys(props) as Prop[];
  const result: Record<Prop, LocalStorageValue> = { ...props };

  keys.forEach((key: Prop) => {
    result[key] = get(key);
  });

  return result;
};

// Function to set property value in localStorage
const set = (prop: Prop, val: string): void => {
  return localStorage.setItem(prop, val);
};

// Function to remove property value in localStorage
const remove = (prop: Prop): void => {
  return localStorage.removeItem(prop);
};

// Function to clear all app-related property values in localStorage
const clear = (): void => {
  const keys = Object.keys(props) as Prop[];

  keys.forEach((key: Prop) => {
    if (disabledGroupClearProps.indexOf(key) === -1) set(key, '');
  });
};

export const LocalStorage = {
  get,
  getAll,
  set,
  remove,
  clear,
};
