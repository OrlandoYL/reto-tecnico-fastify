export interface ResponseGeneric<T> {
    status: "success" | "error";
    message: string;
    data?: T;
    details?: { field: string; error: string }[];
  }
  