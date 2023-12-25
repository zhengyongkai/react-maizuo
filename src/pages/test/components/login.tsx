/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import { Button, Form, Input } from 'antd-mobile';
import { getUserData, login } from '@/pages/api/user';
import { useDispatch } from 'react-redux';
import { userAsync } from '@/store/user/user';
import { useLocation, useNavigate } from 'react-router-dom';
import { setUserData } from '@/store/common/user';
import cookie from '@/pages/utils/cookie';
import { REDIRECTURL } from '@/store/constants';
import { async } from 'fast-glob';
export default function Login() {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async () => {
    const values = form.getFieldsValue();
    const { data } = await login({
      userId: values.username,
      password: values.password,
    });
    await dispatch(setUserData(data));
    navigate('/');
  };
  return (
    <>
      <Form
        form={form}
        layout="horizontal"
        initialValues={{}}
        footer={
          <Button
            onClick={onSubmit}
            block
            type="submit"
            color="primary"
            size="large"
          >
            提交
          </Button>
        }
      >
        <Form.Item
          name="username"
          label="姓名"
          rules={[{ required: true, message: '姓名不能为空' }]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '密码不能为空' }]}
          label="密码"
        >
          <Input type="password" placeholder="请输入密码" />
        </Form.Item>
      </Form>
    </>
  );
}
