import { Button } from 'antd-mobile';
import { getUserData, login } from '@/pages/api/user';
import { useDispatch } from 'react-redux';
import { userAsync } from '@/store/user/user';
import { useLocation, useNavigate } from 'react-router-dom';
import { setUserData } from '@/store/common/user';
import cookie from '@/pages/utils/cookie';
import { REDIRECTURL } from '@/store/constants';
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data } = await login({
      extra: {},
      imgCode: '',
      imgKey: '',
      mobile: '13247526905',
      smsCode: '759802',
    });
    await dispatch(setUserData(data));
    navigate(cookie.getCookie(REDIRECTURL));
  };
  return (
    <>
      <Button onClick={handleLogin}>登录</Button>
    </>
  );
}
