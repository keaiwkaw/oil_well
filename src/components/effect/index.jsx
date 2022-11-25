import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { queryGetParams } from "@/util"
import { Space, Table, Input, Button, message, Modal } from 'antd';

import { baseUrl } from '../../util/http';

import './index.less'

export const columns1 = [
  {
    title: "序号",
    render: (_, __, index) => `${index + 1}`,
    width: 100,
  },
  {
    title: "采气厂",
    dataIndex: "factoryName",
    width: 200,
  },
  {
    title: "作业区",
    dataIndex: "workZoneName",
    width: 200,
  },
  {
    title: "集气站名称",
    dataIndex: "stationName",
    width: 200,
  },
  {
    title: "井号",
    dataIndex: "wellName",
    width: 200,
  },
  {
    title: '总分',
    dataIndex: 'grade',
    width: 200,
    render: (_, record) => Number(record.grade).toFixed(2)
  },
  {
    title: '正常率',
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
      let text = ''
      switch (record.drainageEffect) {
        case 0:
          text = "优"
          break;
        case 1:
          text = "良"
          break;
        case 2:
          text = "差"
          break;
        default:
          break;
      }
      return text
    }
  },
  {
    title: '增产效果',
    dataIndex: 'gasProduction',
    width: 200,
    render: (_, record) => {
      return `${(record.gasProduction * 100).toFixed(0)}%`
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
const columns2 = [
  {
    title: "序号",
    dataIndex: "id",
    key: 'id'
  },
  {
    title: "分组名称",
    dataIndex: "groupName",
    key: 'groupName'
  },
  {
    title: "井的数量",
    dataIndex: "sonNodeId",
    render: (_, record) => record.sonNodeId.length
  },
  {
    title: "总分",
    dataIndex: "totalGrade",
    key: 'totalGrade',
    render: (_, record) => Number(record.totalGrade).toFixed(2)
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: 'createTime',
  },
  {
    title: '操作',
    key: 'operation',
    render: (row, record) => {
      const handleDelete = () => {
        Modal.warning({
          content: "确认删除？",
          okText: "确认",
          closable: true,
          onOk: () => {
            fetch(`${baseUrl}/groups/${record.id}`, {
              method: "DELETE",
            }).then(response => response.json()).then(res => {
              if (res.code == 200) {
                message.success(res.msg)
                fetchTableData2()
              }
            })
          }
        })
      }
      return (
        <>
          <Space direction="horizontal" size="middle" >
            <Link to={`/all_single/${row.id}`}>查看详情</Link>
            <Link onClick={handleDelete}>删除</Link>
          </Space>
        </>
      )
    },
  },
];
const Index = () => {
  const navigate = useNavigate();

  const [selectedArr, setSelectedArr] = useState([]);
  const [tableData1, setTableData1] = useState([])
  const [tableData2, setTableData2] = useState([])
  const [childTableData, setChildTableData] = useState([])
  const [total1, setTotal1] = useState(0);
  const [total2, setTotal2] = useState(0);
  const [info1, setInfo1] = useState({
    factoryName: "",
    stationName: "",
    wellName: "",
    workZoneName: ""
  })

  const [info2, setInfo2] = useState({
    groupName: "",
    startTimeStamp: "",
    endTimeStamp: "",
  })
  const expandedRowRender = () => {
    return <Table columns={columns1} dataSource={childTableData} pagination={false} />;
  };
  useEffect(() => {
    fetchTableData1()
    fetchTableData2()
  }, [])


  const fetchTableData1 = (current = 1) => {
    let req = {
      current,
      pageSize: 10,
      ...info1
    }
    fetch(queryGetParams(`${baseUrl}/api/tasks`, req), {
      method: "GET"
    }).then(response => response.json()).then(res => {
      if (total1 !== res.data.total) {
        setTotal1(res.data.total)
      }
      const arr = res.data.records.map((item, index) => {
        return {
          ...item,
          key: index
        }
      })
      setTableData1(arr)
    })
  }

  const fetchTableData2 = (current = 1) => {
    let req = {
      current,
      pageSize: 10,
      ...info2
    }
    fetch(queryGetParams(`${baseUrl}/groups`, req), {
      method: "GET"
    }).then(response => response.json()).then(res => {
      if (total2 !== res.data.total) {
        setTotal2(res.data.total)
      }
      const arr = res.data.records.map((item, index) => {
        return {
          ...item,
          key: index
        }
      })
      setTableData2(arr)
    })
  }

  const fetchChildTableData = (list) => {
    fetch(`${baseUrl}/groups`, {
      method: "POST",
      body: JSON.stringify(list),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(res => {
      const arr = res.data.map((item, index) => {
        return {
          ...item,
          key: index
        }
      })
      setChildTableData([...arr])
    })
  }

  const handleChildChange = (expanded, record) => {
    expanded && fetchChildTableData(record.sonNodeId)
  }
  const handlePageChange1 = (pagination) => {
    fetchTableData1(pagination)
  }

  const handlePageChange2 = (pagination) => {
    fetchTableData2(pagination)
  }

  const handleSearch1 = () => {
    fetchTableData1()
  }

  const handleSearch2 = () => {
    fetchTableData2()
  }

  const handleChangeInputValue1 = (e) => {
    const { name, value } = e.target;

    setInfo1({
      ...info1,
      [name]: value
    })
  }

  const handleChangeInputValue2 = (e) => {
    const { name, value } = e.target;

    setInfo2({
      ...info2,
      [name]: value
    })
  }

  const start = () => {
    navigate(`/compare/${selectedArr}`);
  };
  const onSelectChange = (_, selectedRows) => {
    let arr = selectedRows.map(i => {
      return i.id
    })
    setSelectedArr(arr);
  };
  const rowSelection = {
    onChange: onSelectChange,
  };
  const hasSelected = selectedArr.length > 1;
  return (
    <div className="c-home">
      <div className="c-list">
        <h2 className='c-title'>单井效果</h2>
        <div className='c-search'>
          {
            [{ factoryName: '采气厂名称' }, { stationName: '集气站名称' }, { workZoneName: '作业区名称' }, { wellName: '井号' }].map((i, index) => {
              const k = Object.keys(i)[0];
              const v = i[k]
              return (<div className='c-input' key={index}>
                {v}:
                <Input placeholder={v} onChange={handleChangeInputValue1} name={k} />
              </div>)
            })
          }
          <Button type="primary" onClick={handleSearch1}>搜索</Button>
        </div>
        <Table columns={columns1} dataSource={tableData1} pagination={{ total: total1, pageSizeOptions: [], onChange: handlePageChange1 }} />
      </div>
      <div className="c-list">
        <h2 className='c-title'>总体效果</h2>
        <div className='c-search'>
          {
            [{ groupName: '分组名称' }, { startTimeStamp: '开始时间' }, { endTimeStamp: '结束时间' }].map((i, index) => {
              const k = Object.keys(i)[0];
              const v = i[k]
              return (<div className='c-input' key={index}>
                {v}:
                <Input placeholder={v} onChange={handleChangeInputValue2} name={k} />
              </div>)
            })
          }
          <Button type="primary" onClick={handleSearch2}>搜索</Button>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns2}
          expandable={{
            expandedRowRender,
            onExpand: handleChildChange,
            expandRowByClick: true,
          }}
          dataSource={tableData2}
          pagination={{ total: total2, pageSizeOptions: [], onChange: handlePageChange2 }} />
        <Button type="primary" onClick={start} disabled={!hasSelected} className="c-btn">
          对比分析
        </Button>
      </div>
    </div>
  )
}

export default Index