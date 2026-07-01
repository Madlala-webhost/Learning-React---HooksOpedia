import { useEffect, useState, useRef } from "react";
import SampleDemo from "./SampleDemo";

function LifecycleDemo(props) {
  const [childCounter, setChildCounter] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const isFirstRender = useRef(true); // this is a ref that will keep track of whether the component is rendering for the first time or not. it will be true on the first render and false on subsequent renders. this is useful when you want to run some code only on the first render and not on subsequent renders. in this example, we are using this ref to log a message only on the first render and not on subsequent renders.
  const inputRef = useRef(null); // this is a ref that will be used to focus the input element when the component mounts. we will pass this ref to the input element and then we can call the focus method on this ref in the useEffect hook that runs when the component mounts. this is useful when you want to focus an input element when the component mounts or when you want to access the value of an input element without using state.
  const renderCount = useRef(1); // this is a ref that will keep track of the number of times the component has rendered. it will be incremented on every render and we can log its value to see how many times the component has rendered. this is useful when you want to see how many times a component has rendered and whether it is rendering more times than expected, which could indicate a performance issue or an infinite loop.
  const prevCount = useRef();
  //useEffect(() => {
  //console.log("Component Rendered");
  //}); // if there is no array [], this will run every time the component renders. eg incrementing the child counter will cause the component to re-render and this effect will run again
  useEffect(() => {
    if (isFirstRender.current) {
      return; // this will prevent the code below from running on the first render
    }
    console.log("Child counter updated", childCounter);
    prevCount.current = childCounter;
  }, [childCounter]); // this will run only when the childCounter state changes. eg incrementing the child counter will cause this effect to run again, but incrementing the parent counter will not cause this effect to run because it is not a dependency of this effect});

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }
    console.log("Parent counter updated", props.parentCounter);
  }, [props.parentCounter]); // this will run only when the parentCounter prop changes. eg incrementing the parent counter will cause this effect to run again, but incrementing the child counter will not cause this effect to run because it is not a dependency of this effect;

  useEffect(() => {
    //we had to move this function to thebottom because we want to check the isFirstRender ref before running the code in this effect. if we had this effect at the top, it would run before the other effects and it would set the isFirstRender ref to false before the other effects have a chance to check it, which would cause the other effects to run on the first render when they are not supposed to.
    console.log("Component Mounted"); // this will run only once when the component mounts
    isFirstRender.current = false; // this will set the isFirstRender ref to false after the first render
    inputRef.current?.focus(); //this will focus the input element when the component mounts. the optional chaining operator (?.) is used to prevent errors in case the ref is not attached to any element yet. if the ref is not attached to any element, inputRef.current will be null and the focus method will not be called, which will prevent errors.
    const intervalId = setInterval(() => {
      console.log("Interval Running", Date.now()); // this will run every second until the component unmounts. eg clicking the toggle button will cause the component to unmount and this effect will run again
    }, 50000);
    // with useEffect, you can monitor some propertoes when the component mounts and unmounts, and you can also return a function that will run when the component unmounts. this is useful when you want to clean up some resources or cancel some subscriptions when the component unmounts. in this example, we are clearing the interval when the component unmounts to prevent memory leaks and unnecessary function calls.

    return () => {
      console.log("Component Unmounted");
      clearInterval(intervalId); // this will run only once when the component unmounts. eg clicking the toggle button will cause the component to unmount and this effect will run again
    };
  }, []); // this will run only once when the component mounts and unmounts because the dependency array is empty. eg clicking the toggle button will cause the component to unmount and this effect will run again

  useEffect(() => {
    console.log("Component Updated");
    renderCount.current = renderCount.current + 1; // this will increment the render count on every render and we can log its value to see how many times the component has rendered. this is useful when you want to see how many times a component has rendered and whether it is rendering more times than expected, which could indicate a performance issue or an infinite loop.
  }); // this will run every time the component renders. eg incrementing the child counter or the parent counter will cause the component to re-render and this effect will run again

  return (
    <div>
      <p>
        Child Counter : {childCounter} ==[Previous value: {prevCount.current} ]
      </p>
      <p>Render Counter: {renderCount.current}</p>
      <button onClick={() => setChildCounter((o) => o + 1)}>
        Increment Child Counter
      </button>
      <br />
      <br />
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder="Auto-focus on mount"
      />
    </div>
  );
}

export default LifecycleDemo;
