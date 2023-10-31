import { useSelector, useDispatch } from "react-redux";

import { increment, decrement } from "../../store/actions/index";

const App: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div></div>
    </>
  );
};

export default App;
