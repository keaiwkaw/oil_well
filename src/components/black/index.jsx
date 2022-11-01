import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {queryGetParams} from "@/util"
import { Space, Table, Tag, Input } from 'antd';

import './index.less'
import { registerPostInit } from 'echarts';

const { Search } = Input;

const Index = () => {

  const [tableData, setTableData] = useState([])
  const [total, setTotal] = useState(0);


  const columns = [
    {
      title: 'factoryName',
      dataIndex: 'factoryName',
      key: 'wellId',
    },
    {
      title: 'stationName',
      dataIndex: 'stationName',
      key: 'age',
    },
    {
      title: 'wellName',
      dataIndex: 'wellName',
      key: 'address',
    },
    {
      title: 'workZoneName',
      key: 'workZoneName',
      dataIndex: 'workZoneName',
    },
    {
      title: '操作',
      key: 'action',
      render: (row, record) => (
        <Space size="middle">
          <Link to={`/mine/${row.wellId}`}>查看详情</Link>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchTableData()
  }, [])


  const fetchTableData = (current = 1) => {
    fetch(queryGetParams('http://101.34.38.102:8186/api/tasks', {
      current,
      pageSize:9
    }), {
      method:"GET"
    }).then(response => response.json()).then(res => {
      if (total !== res.data.total) {
        setTotal(res.data.total)
      }
      setTableData(res.data.records)
    })
  }

  const handlePageChange = (pagination) => {
    fetchTableData(pagination)
  }
  return (
    <div className="c-home">
      <Search
        placeholder="input search text"
        onSearch={(v) => { console.log(v); }}
      />
      <Table columns={columns} dataSource={tableData} style={{ width: "100%", height: "100%" }} pagination={{ defaultPageSize: 9,total:total }} onChange />
    </div>
  )
}

export default Index