import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { queryGetParams } from "@/util"
import { Space, Table, Input, Button, Select } from 'antd';

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
      title: '总分',
      dataIndex: 'grade',
      width: 200,
      render: (_, record) => Number(record.grade).toFixed(2)
    },
    {
      title: '正确率',
      dataIndex: 'correctRate',
      width: 200,
      render: (_, record) => Number(record.correctRate).toFixed(2)
    },
    {
      title: '稳定性时间',
      dataIndex: 'stableRunningTime',
      width: 200,
      render: (_, record) => {
        return Number(record.stableRunningTime).toFixed(2)
      }
    },
    {
      title: '排液效果',
      dataIndex: 'drainageEffect',
      width: 200,
      render: (_, record) => {
        return record.drainageEffect === 1 ? "有积液" : "无积液"
      }
    },
    {
      title: '产气量',
      dataIndex: 'gasProduction',
      width: 200,
      render: (_, record) => {
        return Number(record.gasProduction).toFixed(2)
      }
    },
    {
      title: '操作',
      width: 200,
      render: (row, record) => (
        <Space size="middle">
          <Link to={`/mine/${row.wellId}/${row.id}`}>查看详情</Link>
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

  const handleSearch = () => {
    fetchTableData()
  }
  const handleChangeInputValue = (e) => {
    const { name, value } = e.target;

    setInfo({
      ...info,
      [name]: value
    })
  }
  return (
    <div className="c-home">
      <div className='menu'>
        <Select
          defaultValue="auto"
          style={{
            width: 120,
            margin: "0 20px"
          }}
          options={[
            {
              value: 'auto',
              label: '均衡',
            },
            {
              value: 'stable',
              label: '稳定性优先',
            },
          ]}
        />
        <Button type="primary">单井效果</Button>
      </div>
      <div className='c-search'>
        {
          [{ factoryName: '采气厂名称' }, { stationName: '集气站名称' }, { workZoneName: '作业区名称' }, { wellName: '油井编号' }].map(i => {
            const k = Object.keys(i)[0];
            const v = i[k]
            return (<div className='c-input'>
              {v}:
              <Input placeholder={v} onChange={handleChangeInputValue} name={k} />
            </div>)
          })
        }
        <Button type="primary" onClick={handleSearch}>搜索</Button>
      </div>
      <Table columns={columns} dataSource={tableData} pagination={{ defaultPageSize: 9, total: total, onChange: handlePageChange }} />
    </div>
  )
}

export default Index