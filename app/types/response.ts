export type ApiResponse<T> =
  | {
      data: null;
      message?: string;
      status?: number;
      error: true;
    }
  | { data: T | null; message?: string; error?: false; status?: number };
