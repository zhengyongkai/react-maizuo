import redux from "@/store/store";

export const NumAction = () => {
  return {
    type: "add",
  };
};
export const asyncAction = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: "add",
      });
    });
  };
};
