import '@umijs/max';
import { message, Select } from 'antd';
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
import { userRole, UserRoleEnum } from '@/enums/UserRoleEnum';
import { ChartType, chartTypeEnum } from '@/enums/ChartTypeEnum';

interface Props {
  onCancel: () => void;
  visible: boolean;
  onSubmit: () => Promise<void>;
}

/**
 * 创建图表
 * @param values
 */
const handleAdd = async (values: API.ChartAddRequest) => {
  const hide = message.loading('正在创建...');
  try {
    const res = await addChartUsingPost(values);
    if (res.code === 0 && res.data) {
      message.success('创建成功,3s之后跳转到创建的图表页');
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
 * 创建弹窗
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
      title={'新建图表'}
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
        rules={[{ required: true, message: '请选择想要生成的图表类型' }]}
        name="chartType"
        label="请选择生成图表的类型"
      >
        <Select>
          <Select.Option value={ChartType.Line}>
            {chartTypeEnum[ChartType.Line].text}
          </Select.Option>
          <Select.Option value={ChartType.Bar}>
            {chartTypeEnum[ChartType.Bar].text}
          </Select.Option>
          <Select.Option value={ChartType.Pie}>
            {chartTypeEnum[ChartType.Pie].text}
          </Select.Option>
          <Select.Option value={ChartType.Radar}>
            {chartTypeEnum[ChartType.Radar].text}
          </Select.Option>
          <Select.Option value={ChartType.Scatter}>
            {chartTypeEnum[ChartType.Scatter].text}
          </Select.Option>
          <Select.Option value={ChartType.Bubble}>
            {chartTypeEnum[ChartType.Bubble].text}
          </Select.Option>
          <Select.Option value={ChartType.Area}>
            {chartTypeEnum[ChartType.Area].text}
          </Select.Option>
          <Select.Option value={ChartType.Stacked}>
            {chartTypeEnum[ChartType.Stacked].text}
          </Select.Option>
        </Select>
      </ProFormSelect>
      <ProFormUploadDragger max={1} name="file" label="上传CSV文件" />
    </ModalForm>
  );
};
export default CreateChartModal;
