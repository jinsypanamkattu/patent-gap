import { useSelector, useDispatch } from "react-redux";

export const useStore = () => {
  const auth = useSelector((state) => state.auth);
  const patents = useSelector((state) => state.patents);
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  return { auth, patents, ui, dispatch };
};