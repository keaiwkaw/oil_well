import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Link } from 'react-router-dom';

import { Space, Table } from 'antd';
import { Pie } from '@ant-design/plots';

import { baseUrl } from "../../util/http";

import "./allSingle.less"
const AllSingle = () => {
    let { id } = useParams()
    id = id.split(',')
    const columns1 = [
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
            title: '准确率',
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
    const data = [
        {
            type: '分类一',
            value: 27,
        },
        {
            type: '分类二',
            value: 25,
        },
        {
            type: '分类三',
            value: 18,
        },
        {
            type: '分类四',
            value: 15,
        },
        {
            type: '分类五',
            value: 10,
        },
        {
            type: '其他',
            value: 5,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    };
    const [childTableData, setChildTableData] = useState([])
    const fetchTableData1 = (current = 1) => {
        fetch(`${baseUrl}/groups`, {
            method: "POST",
            body: JSON.stringify(id),
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
    useEffect(() => {
        fetchTableData1()
    }, [])
    return (
        <div className="c-all">
            <Table columns={columns1} dataSource={childTableData} pagination={false} />
            <Pie {...config} />
        </div>
    )
}


export default AllSingle