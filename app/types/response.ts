export type ApiResponse<T> =
  | {
      data: T | null;
      message?: string;
    }
  | {
      status: number;
      error: boolean;
    };
