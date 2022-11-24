import { useState, useEffect } from "react"
import { useParams } from "react-router"

import { Table } from 'antd';
import { Pie } from '@ant-design/plots';

import { baseUrl } from "../../util/http";

import "./allSingle.less"
import { columns1 } from "../effect";
const AllSingle = () => {
    let { id } = useParams()
    const [childTableData, setChildTableData] = useState([])
    const [pieConfig, setPieConfig] = useState()
    const fetchTableData1 = (current = 1) => {
        fetch(`${baseUrl}/groups/${id}`, {
            method: "GET",
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
    const config = {
        width: 600,
        data: [
            {
                type: '总分低于60%',
                value: 5,
            },
            {
                type: '总分高于80%',
                value: 5,
            },
            {
                type: '总分在60%到80%',
                value: 5,
            },
        ],
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 20,
                textAlign: 'center',
            },
        },
    };
    const fetchPie = () => {
        fetch(`${baseUrl}/api/pictures/pie/${id}`, {
            method: "GET",
        }).then(response => response.json()).then(res => {
            const pie = res.data
            setPieConfig({
                ...config,
                data: [
                    {
                        type: '总分低于60%',
                        value: parseInt(pie.gradeLower60Percent),
                    },
                    {
                        type: '总分高于80%',
                        value: parseInt(pie.gradeUpper80Percent),
                    },
                    {
                        type: '总分在60%到80%',
                        value: parseInt(pie.gradeBetween60PercentAnd80Percent),
                    },
                ],
            })
        })
    }
    useEffect(() => {
        fetchTableData1()
        fetchPie()
    }, [])
    return (
        <div className="c-all">
            <Table columns={columns1} dataSource={childTableData} pagination />
            <div className="c-pie">
                {
                    pieConfig ? <Pie {...pieConfig}></Pie> : null
                }
            </div>
        </div>
    )
}


export default AllSingle