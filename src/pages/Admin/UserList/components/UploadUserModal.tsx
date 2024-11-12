import '@umijs/max';
import { message } from 'antd';
import React, { useState } from 'react';
import { ModalForm, ProForm, ProFormUploadDragger } from '@ant-design/pro-components';
import { importUserDataByExcelUsingPost } from '@/services/stephen-backend/excelController';

interface Props {
  onCancel: () => void;
  onSubmit: () => Promise<void>;
  visible: boolean;
}

/**
 * 常见弹窗
 * @param props
 * @constructor
 */
const UploadUserModal: React.FC<Props> = (props) => {
  const { visible, onSubmit, onCancel } = props;
  const [form] = ProForm.useForm();
  return (
    <ModalForm
      title={'批量导入用户信息'}
      open={visible}
      form={form}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          onCancel?.();
        },
      }}
      onFinish={async (values: any) => {
        const hide = message.loading('正在上传用户中，请稍候...');
        try {
          const res = await importUserDataByExcelUsingPost({
            file: values.file[0].originFileObj,
          });
          if (res.code === 0 && res?.data?.errorRecords.length === 0) {
            message.success('用户导入成功');
            onSubmit?.();
          } else {
            message.error(`用户导入失败${res?.data?.errorRecords?.errorMessage}` + '请重试');
          }
        } catch (error: any) {
          message.error(`用户导入失败${error.message}` + '请重试');
        } finally {
          hide();
        }
      }}
      submitter={{
        searchConfig: {
          submitText: '上传',
          resetText: '取消',
        },
      }}
    >
      <ProFormUploadDragger
        onChange={async (info) => {
          const { status } = info.file;
          if (status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
          }
        }}
        name={'file'}
        max={1}
      />
    </ModalForm>
  );
};

export default UploadUserModal;
