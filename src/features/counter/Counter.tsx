import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import { counterActions } from "./counterSlice";
import { Button } from "@/common/components/ui/Button";
import type { FunctionComponent } from "react";

export const Counter: FunctionComponent = () => {
 const count = useSelector((state:RootState) => state.counter.value);

 const dispatch = useDispatch();

  return (
    <div>
      <p>You clicked {count} times</p>
      <Button
        shape="primary"
        onClick={() => {
          dispatch(counterActions.incrementByAmount(3));
        }}
      >
        Click me
      </Button>
    </div>
  );
};
