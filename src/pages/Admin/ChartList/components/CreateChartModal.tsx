import '@umijs/max';
import { message } from 'antd';
import React from 'react';
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { addChartUsingPost } from '@/services/trajectory-backend/chartController';

interface Props {
  onCancel: () => void;
  visible: boolean;
  onSubmit: () => Promise<void>;
}

/**
 * 创建帖子
 * @param values
 */
const handleAdd = async (values: API.ChartAddRequest) => {
  const hide = message.loading('正在创建...');
  try {
    const res = await addChartUsingPost(values);
    if (res.code === 0 && res.data) {
      message.success('创建成功,3s之后跳转到创建的帖子页');
      return true;
    } else {
      message.error(`创建失败${res.message}`);
      return false;
    }
  } catch (error: any) {
    message.error(`创建失败${error.message}`);
    return false;
  } finally {
    hide();
  }
};

/**
 * 常见弹窗
 * @param props
 * @constructor
 */
const CreateChartModal: React.FC<Props> = (props) => {
  const { visible, onCancel, onSubmit } = props;
  const [form] = ProForm.useForm<API.ChartAddRequest>();

  return (
    <ModalForm
      open={visible}
      form={form}
      title={'新建帖子'}
      onFinish={async (values) => {
        const success = await handleAdd({
          ...values,
        });
        if (success) {
          onSubmit?.();
        }
      }}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          onCancel?.();
        },
      }}
      submitter={{
        searchConfig: {
          submitText: '开始生成',
          resetText: '重置表单',
        },
      }}
    >
      <ProFormText
        name="name"
        rules={[{ required: true, message: '请输入你的图表名称' }]}
        label="图表名称"
      />
      <ProFormTextArea
        rules={[{ required: true, message: '请输出你的分析目标' }]}
        name="goal"
        label="分析目标"
      />
      <ProFormSelect
        fieldProps={{
          labelInValue: true,
        }}
        rules={[{ required: true, message: '请选择想要生成的图表类型' }]}
        request={async () => [
          { label: '柱状图', value: '柱状图' },
          { label: '折线图', value: '折线图' },
          { label: '饼图', value: '饼图' },
          { label: '堆叠图', value: '堆叠图' },
          { label: '雷达图', value: '雷达图' },
        ]}
        name="chartType"
        label="请选择生成图表的类型"
      />
      <ProFormUploadDragger max={1} name="file" label="上传CSV文件" />
    </ModalForm>
  );
};
export default CreateChartModal;
