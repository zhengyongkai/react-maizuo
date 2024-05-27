/*
 * @Author: 郑永楷
 * @LastEditors: zhengyongkai 825947557@qq.com
 * @Description: 登录页面
 */
import { Button, Form, Input } from 'antd-mobile';
import { login } from '@/api/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '@/store/common/user';
import sha256 from 'crypto-js/sha256';

import Logo from '@/assets/img/logo.png';
import { GITHUB_LOGIN_URL } from '@/constant';

interface LoginPropsInf {
  exact?: boolean;
}

export default function Login(props: LoginPropsInf) {
  const { exact } = props;
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * @description: 登录，登陆成功将数据塞到 userData 中
   * @return {*}
   */
  const onSubmit = async () => {
    const values = form.getFieldsValue();
    const { data } = await login({
      userId: values.username,
      password: sha256(values.password).toString()
    });
    await dispatch(setUserData(data));
    !exact && navigate('/');
  };

  /**
   * @description: gitHub登录
   * @return {*}
   */
  function onGithubSubmit() {
    window.location.replace(GITHUB_LOGIN_URL);
  }

  return (
    <div h-screen pl-16 pr-16 pt-60 bg-white>
      <Form
        form={form}
        layout="horizontal"
        initialValues={{
          username: '',
          password: ''
        }}
        footer={
          <>
            <div mb-8>
              <Button
                style={{ width: '100%' }}
                onClick={onSubmit}
                block
                type="submit"
                color="primary"
                size="large">
                提交
              </Button>
            </div>
            <Button
              style={{ width: '100%' }}
              onClick={onGithubSubmit}
              block
              type="submit"
              color="warning"
              size="large">
              gitHub登录
            </Button>
          </>
        }>
        <div text-center mb-16>
          <img src={Logo} w-64 br-8 />
        </div>
        <Form.Item
          name="username"
          label="姓名"
          rules={[{ required: true, message: '姓名不能为空' }]}>
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '密码不能为空' }]}
          label="密码">
          <Input type="password" placeholder="请输入密码" />
        </Form.Item>
      </Form>
    </div>
  );
}
