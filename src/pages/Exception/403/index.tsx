import { Link } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

/**
 * 无权限访问
 * @constructor
 */
const UnAccessiblePage: React.FC = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Link to="/">
        <Button type="primary">Back to home</Button>
      </Link>
    }
  />
);
export default UnAccessiblePage;
