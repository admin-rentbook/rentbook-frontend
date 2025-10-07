import { Button } from '@/components/ui';
import { useCountStore } from '@/store';

//we could also get the state outside of a component
const logCount = () => {
  const count = useCountStore.getState().count;
  console.log(count);
};

const setCount = () => {
  useCountStore.setState({ count: 1 });
};
function App() {
  const count = useCountStore((state) => state.count);
  return <OtherComponent count={count} />;
}

/*
best practices:
1. it is best to get only the specific state needed for performance optimization
for example if there are multiple states that change, returning the whole state
will cause unnecessary rerenders if any of the state changes

2. store should always contain related items- group by specific features
 */
const OtherComponent = ({ count }: { count: number }) => {
  // const increment = useCountStore((state) => state.increment);
  // const decrement = useCountStore((state) => state.decrement);
  // const incrementAsync = useCountStore((state) => state.incrementAsync);

  // useEffect(() => {
  //   logCount();
  // }, []);
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-primary-500">Your count is: {count}</h2>
      <div>
        <Button>Click me</Button>
      </div>
    </div>
  );
};
export default App;
