import React from 'react';
import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { Space } from 'antd';

interface ChartFormProps {
  onFinish: (values: any) => Promise<void>;
}

/**
 * 图表创建表单
 * @param props
 * @constructor
 */
const CreateChartForm: React.FC<ChartFormProps> = (props) => {
  const { onFinish } = props;

  return (
    <ProForm<API.Chart>
      onFinish={onFinish}
      formKey={'name'}
      submitter={{
        searchConfig: {
          submitText: '开始生成',
          resetText: '重置表单',
        },
        render: (_, dom) => {
          return (
            <div style={{ textAlign: 'right' }}>
              <Space>
                {dom[0]}
                {dom[1]}
              </Space>
            </div>
          );
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
    </ProForm>
  );
};

export default CreateChartForm;
