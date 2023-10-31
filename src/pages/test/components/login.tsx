import { Button } from "antd-mobile";
import { getUserData } from "@/pages/api/user";
import { useDispatch } from "react-redux";
import { userAsync } from "@/store/user/user";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await dispatch(userAsync());
    navigate("/name/home/1");
  };
  return (
    <>
      <Button onClick={handleLogin}>登录</Button>
    </>
  );
}
