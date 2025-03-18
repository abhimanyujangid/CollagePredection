import { AxiosResponse } from "axios";
import { FreeAPISuccessResponseInterface } from "../interfaces/api";
import { UserInterface } from "../interfaces/user";

// A utility function for handling API requests with loading, success, and error handling
export const requestHandler = async (
  api: () => Promise<AxiosResponse<FreeAPISuccessResponseInterface, any>>,
  setLoading: ((loading: boolean) => void) | null,
  onSuccess: (data: FreeAPISuccessResponseInterface) => void,
  onError: (error: string) => void
) => {
  setLoading && setLoading(true);
  try {
    const response = await api();
    const { data } = response;
    if (data?.success) {
      onSuccess(data);
    }
  } catch (error: any) {
    if ([401, 403].includes(error?.response.data?.statusCode)) {
      localStorage.clear(); 
      if (isBrowser) window.location.href = "/login"; 
    }
    onError(error?.response?.data?.message || "Something went wrong");
  } finally {
    setLoading && setLoading(false);
  }
};

// A utility function to concatenate CSS class names with proper spacing
export const classNames = (...className: string[]) => {
  return className.filter(Boolean).join(" ");
};

// Check if the code is running in a browser environment
export const isBrowser = typeof window !== "undefined";


// A class that provides utility functions for working with local storage
export class LocalStorage {
  // Get a value from local storage by key
  static get(key: string) {
    if (!isBrowser) return;
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  // Set a value in local storage by key
  static set(key: string, value: any) {
    if (!isBrowser) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Remove a value from local storage by key
  static remove(key: string) {
    if (!isBrowser) return;
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  static clear() {
    if (!isBrowser) return;
    localStorage.clear();
  }
}
