/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import { Button, Form, Input } from "antd-mobile";
import { login } from "@/api/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "@/store/common/user";
import sha256 from "crypto-js/sha256";

import Styles from "@/assets/css/login.module.scss";

import Logo from "@/assets/img/logo.png";
import { GITHUB_LOGIN_URL } from "@/constant";

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
      password: sha256(values.password).toString(),
    });
    await dispatch(setUserData(data));
    !exact && navigate("/");
  };

  function onGithubSubmit() {
    window.location.replace(GITHUB_LOGIN_URL);
  }

  return (
    <div className={Styles["login-wrapper"]}>
      <Form
        className={Styles["login-content"]}
        form={form}
        layout="horizontal"
        initialValues={{
          username: "",
          password: "",
        }}
        footer={
          <>
            <Button
              onClick={onSubmit}
              block
              type="submit"
              color="primary"
              size="large"
            >
              提交
            </Button>
            <br />
            <Button
              onClick={onGithubSubmit}
              block
              type="submit"
              color="warning"
              size="large"
            >
              gitHub登录
            </Button>
          </>
        }
      >
        <div className={Styles["login-logo"]}>
          <img src={Logo} />
        </div>
        <Form.Item
          name="username"
          label="姓名"
          rules={[{ required: true, message: "姓名不能为空" }]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "密码不能为空" }]}
          label="密码"
        >
          <Input type="password" placeholder="请输入密码" />
        </Form.Item>
      </Form>
    </div>
  );
}
