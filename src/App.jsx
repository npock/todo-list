import { Provider } from "react-redux";
import { createStore } from "./store/createStore";
import { ToDos } from "./ToDos";
// import { useNavigate } from 'react-router-dom';

export const App = () => {
  // const navigate = useNavigate();
  const store = createStore();
  return (
    <Provider store={store}>
      <ToDos />
    </Provider>
  );
};
