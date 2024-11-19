import React from 'react';
import { Avatar, Col, Row, Statistic, Tag, Typography } from 'antd';
import { ProCard } from '@ant-design/pro-components';

interface Props {
  user: API.UserVO;
}

/**
 * 推荐用户
 * @param props
 * @constructor
 */
const RecommendUser: React.FC<Props> = (props) => {
  const { user } = props;
  return (
    <ProCard gutter={[16, 16]} bodyStyle={{ padding: 4 }}>
      <Row justify="space-between" align="middle">
        <Col span={18}>
          <Row justify={'center'}>
            <Col span={24}>
              <Statistic
                prefix={<Avatar src={user?.userAvatar} />}
                valueRender={() => <Typography.Text>{user?.userName}</Typography.Text>}
                valueStyle={{ fontSize: 12 }}
              />
            </Col>
            <Col span={24}>
              {user.tags &&
                user.tags.map((tag) => (
                  <Tag
                    style={{
                      fontSize: 10,
                    }}
                    bordered={false}
                    color="volcano"
                    key={tag}
                  >
                    {tag}
                  </Tag>
                ))}
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Statistic
            title="相似度"
            value={100 * (user?.similarity ?? 0)}
            precision={2}
            valueStyle={{ color: '#3f8600', fontSize: 14 }}
            suffix={'%'}
          />
        </Col>
      </Row>
    </ProCard>
  );
};

export default RecommendUser;
