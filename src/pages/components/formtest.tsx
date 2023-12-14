import { useState } from "react";
import { Form, FormItem } from "./Form";
import Input from "./Input/Input";

/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */

interface FormImf {
  username: string;
  password: string;
}

const FormText = () => {
  const [form, setForm] = useState<FormImf>({
    username: "3",
    password: "4",
  });

  return (
    <>
      <Form>
        <FormItem name="username">
          <Input type="password"></Input>
        </FormItem>
        <FormItem name="password">
          <Input></Input>
        </FormItem>
      </Form>
    </>
  );
};

export default FormText;
