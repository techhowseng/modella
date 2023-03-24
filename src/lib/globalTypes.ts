export type GlobalStateStructure<T> = {
  data: T;
  loading: boolean;
  error: boolean;
  message: string;
}
