import React from 'react';
import { Link } from 'react-router-dom';

import { Space, Table, Tag, Input } from 'antd';

import './index.less'

const { Search } = Input;

const Index = () => {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';

            if (tag === 'loser') {
              color = 'volcano';
            }

            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (row, record) => (
        <Space size="middle">
          <Link to={`/mine/${row.age}`}>查看详情</Link>
        </Space>
      ),
    },
  ];
  const data = new Array(18).fill({}).map((item, index) => {
    return {
      key: index + 1,
      name: 'John Brown',
      age: index,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    }
  });

  return (
    <div className="c-home">
      <Search
        placeholder="input search text"
        onSearch={(v) => { console.log(v); }}
      />
      <Table columns={columns} dataSource={data} style={{ width: "100%", height: "100%" }} pagination={{ defaultPageSize: 9 }} />
    </div>
  )
}

export default Index