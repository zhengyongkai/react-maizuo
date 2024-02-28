import { Toast } from "antd-mobile";

export function validateFn(file: File, acceptedFiles: string | string[]) {
  const acceptedFilesArray = Array.isArray(acceptedFiles)
    ? acceptedFiles
    : acceptedFiles.split(",");
  const fileName = file.name || "";
  const mimeType = file.type || "";
  const baseMimeType = mimeType.replace(/\/.*$/, "");
  return acceptedFilesArray.some((type) => {
    const validType = type.trim();
    // This is something like */*,*  allow all files
    if (/^\*(\/\*)?$/.test(type)) {
      return true;
    }
    // like .jpg, .png
    if (validType.charAt(0) === ".") {
      const lowerFileName = fileName.toLowerCase();
      const lowerType = validType.toLowerCase();
      console.log(lowerType);
      let affixList = [lowerType];
      if (lowerType === ".jpg" || lowerType === ".jpeg") {
        affixList = [".jpg", ".jpeg"];
      }
      return affixList.some((affix) => lowerFileName.endsWith(affix));
    }
    // This is something like a image/* mime type
    if (/\/\*$/.test(validType)) {
      return baseMimeType === validType.replace(/\/.*$/, "");
    }
    // Full match
    if (mimeType === validType) {
      return true;
    }
    // Invalidate type should skip
    if (/^\w+$/.test(validType)) {
      return true;
    }

    return false;
  });
}

export function acceptFile(file: File, acceptedFiles: string | string[]) {
  if (file && acceptedFiles) {
    const isValidate = validateFn(file, acceptedFiles);
    if (isValidate) {
      return true;
    } else {
      Toast.show("请上传文件后缀名为[" + acceptedFiles + "]的文件");
      return false;
    }
  }
  return false;
}
