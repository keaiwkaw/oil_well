import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { queryGetParams } from "@/util"
import { Space, Table, Input, Button } from 'antd';

import './index.less'

const Index = () => {

  const [tableData, setTableData] = useState([])
  const [total, setTotal] = useState(0);
  const [info, setInfo] = useState({
    factoryName: "",
    stationName: "",
    wellName: "",
    workZoneName: ""
  })

  const columns = [
    {
      title: '工作id',
      dataIndex: 'id',
      width: 200,
    },
    {
      title: '稳定性时间',
      dataIndex: 'stableRunningTime',
      width: 200,
      render: (_,record) => {
        return Number(record.stableRunningTime).toFixed(2)
      }
    },
    {
      title: '正确率',
      dataIndex: 'correctRate',
      width: 200,
      render: (_,record) => Number(record.correctRate).toFixed(2)
    },
    {
      title: '采气厂名称',
      dataIndex: 'factoryName',
      width: 200,
    },
    {
      title: '集气站名称',
      width: 200,
      dataIndex: 'stationName',
    },
    {
      title: '油井编号',
      width: 200,
      dataIndex: 'wellName',
    },
    {
      title: '作业区名称',
      width: 200,
      dataIndex: 'workZoneName',
    },
    {
      title: '操作',
      width: 200,
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
    let req = {
      current,
      pageSize: 9,
      ...info
    }
    fetch(queryGetParams('http://101.34.38.102:8186/api/tasks', req), {
      method: "GET"
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
      <div className='c-search'>
        <div className='c-input'>
          采气厂名称:
          <Input placeholder="采气厂名称" onChange={(e) => {
            const value = e.target.value
            setInfo({
              ...info,
              factoryName: value
            })
          }} />
        </div>
        <div className='c-input'>
          集气站名称:
          <Input placeholder="集气站名称" onChange={(e) => {
            const value = e.target.value
            setInfo({
              ...info,
              stationName: value
            })
          }} />
        </div>
        <div className='c-input'>
          作业区名称:
          <Input placeholder="作业区名称" onChange={(e) => {
            const value = e.target.value
            setInfo({
              ...info,
              workZoneName: value
            })
          }} />
        </div>
        <div className='c-input'>
          油井编号:
          <Input placeholder="油井编号" onChange={(e) => {
            const value = e.target.value
            setInfo({
              ...info,
              wellName: value
            })
          }} />
        </div>
        <Button type="primary" onClick={() => {
          fetchTableData()
        }}>搜索</Button>
      </div>
      <Table columns={columns} dataSource={tableData} pagination={{ defaultPageSize: 9, total: total, onChange: handlePageChange }} />
    </div>
  )
}

export default Index