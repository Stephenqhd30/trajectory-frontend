import {ActionType, ProColumns, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, message, Popconfirm, Space, Tag, Typography} from 'antd';
import React, {useRef, useState} from 'react';
import {CreatePostModal, UpdatePostModal} from '@/pages/Admin/PostList/components';
import {deletePostUsingPost, listPostByPageUsingPost} from '@/services/stephen-backend/postController';
import {PlusOutlined} from '@ant-design/icons';
import {TagTreeSelect} from '@/components';
import {TAG_EMPTY} from '@/constants';

/**
 * 删除节点
 *
 * @param row
 */
const handleDelete = async (row: API.DeleteRequest) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    const res = await deletePostUsingPost({
      id: row.id,
    });
    if (res.code === 0 && res.data) {
      message.success('删除成功');
    } else {
      message.error(`删除失败${res.message}, 请重试!`);
    }

  } catch (error: any) {
    message.error(`删除失败${error.message}, 请重试!`);
  } finally {
    hide();
  }
};

/**
 * 用户管理列表
 * @constructor
 */
const PostList: React.FC = () => {
  // 新建窗口的Modal框
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 更新窗口的Modal框
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户的所点击的数据
  const [currentRow, setCurrentRow] = useState<API.Post>();

  /**
   * 表格列数据
   */
  const columns: ProColumns<API.Post>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '标题',
      dataIndex: 'title',
      valueType: 'text',
    },
    {
      title: '内容',
      dataIndex: 'content',
      valueType: 'text',
      width: 500,
      render: (_, record) => {
        return (
          <Typography.Paragraph ellipsis={{ rows: 5, expanded: false, expandable: false }}>
            {record.content}
          </Typography.Paragraph>
        );
      },
    },
    {
      title: '封面',
      dataIndex: 'cover',
      valueType: 'image',
      fieldProps: {
        width: 64,
      },
      hideInSearch: true,
    },
    {
      title: '点赞数',
      dataIndex: 'favourNum',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '收藏数',
      dataIndex: 'thumbNum',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      render: (_, record) => {
        if (record.tags) {
          const tagList = JSON.parse(record.tags as string);
          return tagList.map((tag) => <Tag key={tag} color={'blue'}>{tag}</Tag>);
        }
        return <Tag>{TAG_EMPTY}</Tag>;
      },
      renderFormItem: () => <TagTreeSelect name={'tags'}/>,
    },
    {
      title: '创建用户id',
      dataIndex: 'userId',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={'middle'}>
          <Typography.Link
            key="update"
            onClick={() => {
              setUpdateModalVisible(true);
              setCurrentRow(record);
              actionRef.current?.reload();
            }}
          >
            修改
          </Typography.Link>
          {/*删除表单用户的PopConfirm框*/}
          <Popconfirm
            title="确定删除？"
            description="删除后将无法恢复?"
            okText="确定"
            cancelText="取消"
            onConfirm={async () => {
              await handleDelete(record);
              actionRef.current?.reload();
            }}
          >
            <Typography.Link
              key={'delete'}
              type={'danger'}
              onClick={() => {
                setCurrentRow(record);
              }}
            >
              删除
            </Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <ProTable<API.Post, API.PageParams>
        headerTitle={'帖子列表'}
        actionRef={actionRef}
        rowKey={'id'}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Space key={'space'} wrap>
            <Button
              type={'primary'}
              icon={<PlusOutlined />}
              key="create"
              onClick={() => {
                setCreateModalVisible(true);
              }}
            >
               新建
            </Button>
          </Space>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listPostByPageUsingPost({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.PostQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: data?.total || 0,
          };
        }}
        columns={columns}
      />

      {/*新建表单的Modal框*/}
      {createModalVisible && (
        <CreatePostModal
          onCancel={() => {
            setCreateModalVisible(false);
          }}
          visible={createModalVisible}
          onSubmit={async () => {
            setCreateModalVisible(false);
            actionRef.current?.reload();
          }}
        />
      )}
      {/*更新表单的Modal框*/}
      {updateModalVisible && (
        <UpdatePostModal
          onCancel={() => {
            setUpdateModalVisible(false);
          }}
          visible={updateModalVisible}
          oldData={currentRow}
          onSubmit={async () => {
            setUpdateModalVisible(false);
            actionRef.current?.reload();
          }}
        />
      )}
    </>
  );
};
export default PostList;
