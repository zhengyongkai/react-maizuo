import { ImgHTMLAttributes, useEffect, useState } from "react";
import ImgLoading from "@/assets/img/loading.gif";

type imgPropsInf = {
  src: string;
} & ImgHTMLAttributes<HTMLImageElement>;

export default function ImgLoad(props: imgPropsInf) {
  let { src } = props;

  const [imgSrc, setImgSrc] = useState(ImgLoading);

  useEffect(() => {
    let img = new Image();
    img.src = src;
    img.onload = function () {
      setImgSrc(img.src);
    };
  }, [src]);

  return <img {...props} src={imgSrc}></img>;
}
