import { on } from "events";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Context } from "../Form";

interface InputImf {
  type?: "password" | "text";
  name: "";
}

const Input = forwardRef(({ type = "text", name = "" }: InputImf, ref) => {
  const [data, setData] = useState("");
  const { formData, setFormData } = useContext(Context);

  useEffect(() => {
    setData(formData[name]);
    // console.log("dasd", formData[name]);
  }, [formData[name]]);

  function onchange(e) {
    setData(e.target.value);
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  }

  useImperativeHandle(ref, () => {});

  return (
    <input
      type={type}
      onChange={(e) => onchange(e)}
      defaultValue={data}
    ></input>
  );
});

export default Input;
