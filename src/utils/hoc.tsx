import { useLocation, useNavigate } from "react-router-dom";

export function withRouter(Child) {
  return (props: any) => {
    const location = useLocation();
    const navigate = useNavigate();
    return <Child {...props} navigate={navigate} location={location} />;
  };
}
