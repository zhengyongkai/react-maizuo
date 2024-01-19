import { JSXElementConstructor, ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function WithRouter<T>(Child: JSXElementConstructor<T>) {
  return (props: any) => {
    const location = useLocation();
    const navigate = useNavigate();
    return <Child {...props} navigate={navigate} location={location} />;
  };
}
