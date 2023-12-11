export type ApiResponse<T> = {
  data?: T;
  message?: string;
  status?: number;
  error?: boolean;
};
