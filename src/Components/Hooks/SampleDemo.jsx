import { useState } from "react";
import LifecycleDemo from "./LifecycleDemo";
function SampleDemo() {
  const [counter, setCounter] = useState(0);
  const [showComponent, setShowComponent] = useState(true);
  return (
    <div style={{ padding: "1rem" }}>
      <h2>React Hooks</h2>
      <button onClick={() => setShowComponent((o) => !o)}> {/* this will toggle the showComponent state between true and false, which will cause the component to unmount and mount again */}
        {showComponent ? "Unmount Component" : "Mount Component"}
      </button>
      <p>Parent Counter : {counter}</p>
      <button onClick={() => setCounter((o) => o + 1)}>Increment Parent Counter</button> {/* this will cause the parent component to re-render and the child component will also re-render because of the state change in the parent component */   }
      <br />
      <br />
      {showComponent && <LifecycleDemo parentCounter={counter} />} {/* conditional rendering-means that this component will be rerendered*/}
    </div>
  );
}

export default SampleDemo;
// useEffect is a hook that allows you to perform side effects in your components. It takes a function as an argument and runs that function after the component renders. You can also specify a dependency array as the second argument to control when the effect runs. If the dependency array is empty, the effect will only run once after the initial render. If the dependency array contains variables, the effect will run whenever any of those variables change.