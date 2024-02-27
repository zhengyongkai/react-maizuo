import { Dialog } from 'antd-mobile';

const normalConfig = {
  closeOnAction: true,
  closeOnMaskClick: true,
};

/**
 * @description: 一个封装的提示框
 * @return {*}
 */
export const showDialog = {
  show: ({
    title = '提示',
    content = '',
    maskClassName = '',
  }: {
    title?: string;
    content: string;
    maskClassName?: string;
  }) =>
    Dialog.show({
      ...normalConfig,
      title,
      content,
      maskClassName,
    }),
};
