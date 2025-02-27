import { useState, type FunctionComponent } from "react";
import { Button } from "../../shared/components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import { counterActions } from "./counterSlice";

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
