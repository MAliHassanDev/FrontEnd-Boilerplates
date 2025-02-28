import { logger } from "@/lib/logger";
import { useEffect, useReducer, type Reducer } from "react";

// Define the state type
type State<T> = {
  isLoading: boolean;
  data: T | null;
  error: unknown;
};

// Define the action types
type Action<T> =
  | {
      type: "data";
      data: T;
    }
  | {
      type: "error";
      error: unknown;
    };

// Reducer function
function reducer<T>(_: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case "data":
      return { isLoading: false, data: action.data, error: null };
    case "error":
      return { isLoading: false, data: null, error: action.error };
  }
}

// useService hook
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useService = <Fn extends (...args: any[]) => Promise<any>>(
  serviceAction: Fn,
  ...args: Parameters<Fn>
): State<Awaited<ReturnType<Fn>>> => {
  // Initialize state with the correct types
  const [state, dispatch] = useReducer<
    Reducer<State<Awaited<ReturnType<Fn>>>, Action<Awaited<ReturnType<Fn>>>>
  >(reducer, {
    isLoading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    const runService = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await serviceAction(...args);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        dispatch({ type: "data", data });
      } catch (error: unknown) {
        logger.error(error, "useService");
        dispatch({ type: "error", error });
      }
    };

    runService().catch(logger.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
};
