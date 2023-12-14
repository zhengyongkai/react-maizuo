/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import Schema from "async-validator";
import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  createElement,
  cloneElement,
  forwardRef,
  useImperativeHandle,
  useContext,
} from "react";

interface FormItemImf {
  children: ReactNode;
  name: string;
  rules?: Array<any>;
}

interface FormImf {
  children: ReactNode[];
  onFinish?: () => void;
}

export const Context = createContext({});

export const Form = forwardRef(({ children, onFinish }: FormImf, ref) => {
  const [formData, setFormData] = useState({
    username: "3123",
    password: "dasd",
  });

  function validateAll() {
    // console.log("dasdsd", children[1]);
  }

  useImperativeHandle(ref, () => {
    validateAll;
  });

  return (
    <>
      <Context.Provider value={{ onFinish, setFormData, formData }}>
        {children.map((item) => {
          return item;
        })}
      </Context.Provider>
      <button onClick={() => validateAll()}>点击我获取ref</button>
    </>
  );
});

export const FormItem = forwardRef(
  ({ children, name, rules }: FormItemImf, ref) => {
    //   const Children = createElement(children);
    const context = useContext(Context);

    const { formData } = context;

    useImperativeHandle(ref, () => {
      validate;
    });

    function validate() {
      const descriptor = rules[name];

      const validator = new Schema(descriptor);

      validator.validate({ name: formData[name] }, (errors, fields) => {
        if (errors) {
          // 校验不通过 do something
          return;
        }
        // 校验通过 do something
      });
    }

    return <>{cloneElement(children, { name })}</>;
  }
);
