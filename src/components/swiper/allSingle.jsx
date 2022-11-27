import { useState, useEffect } from "react"
import { useParams } from "react-router"

import { Table } from 'antd';
import { Pie, Column } from '@ant-design/plots';

import { baseUrl } from "../../util/http";

import "./allSingle.less"
import { columns1 } from "../effect";
const AllSingle = () => {
    let { id } = useParams()
    const [childTableData, setChildTableData] = useState([])
    const [pie1Config, setPie1Config] = useState()
    const [pie2Config, setPie2Config] = useState()
    const [pie3Config, setPie3Config] = useState()
    const [pie4Config, setPie4Config] = useState()
    const [columConfig, setColumConfig] = useState()
    const fetchTableData1 = (current = 1) => {
        fetch(`http://101.34.38.102:8186/groups/${id}`, {
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
                value: 0,
            },
            {
                type: '总分高于80%',
                value: 0,
            },
            {
                type: '总分在60%到80%',
                value: 0,
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
    const fetchPie1 = () => {
        fetch(`${baseUrl}/api/pictures/pie-grade/${id}`, {
            method: "GET",
        }).then(response => response.json()).then(res => {
            const pie = res.data
            setPie1Config({
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
    const fetchPie2 = () => {
        fetch(`${baseUrl}/api/pictures/pie-correct-rate/${id}`, {
            method: "GET",
        }).then(response => response.json()).then(res => {
            const pie = res.data
            setPie2Config({
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
    const fetchPie3 = () => {
        fetch(`${baseUrl}/api/pictures/pie-stable-time/${id}`, {
            method: "GET",
        }).then(response => response.json()).then(res => {
            const pie = res.data
            setPie3Config({
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
    const fetchPie4 = () => {
        fetch(`${baseUrl}/api/pictures/pie-drainage-effect/${id}`, {
            method: "GET",
        }).then(response => response.json()).then(res => {
            const pie = res.data
            setPie4Config({
                ...config,
                data: [
                    {
                        type: '优',
                        value: parseInt(pie.perfect),
                    },
                    {
                        type: '良',
                        value: parseInt(pie.good),
                    },
                    {
                        type: '差',
                        value: parseInt(pie.bad),
                    },
                    {
                        type: '无排液',
                        value: parseInt(pie.NoDrainage),
                    },
                ],
            })
        })
    }
    const fetchColumn = () => {
        fetch(`${baseUrl}/api/pictures/pie-gas-prod/${id}`, {
            method: "GET",
        }).then(response => response.json()).then(res => {
            let colums = []
            for (let i = 0; i < res.data.length; i++) {
                colums.push({
                    type: i + "1",
                    sales: Number(Number(res.data[i]).toFixed(5))
                })
            }
            setColumConfig({
                data: colums,
                xField: 'type',
                yField: 'sales',
                label: {
                    position: 'middle',
                    style: {
                        fill: '#FFFFFF',
                    },
                },
                meta: {
                    type: {
                        alias: '时间',
                    },
                    sales: {
                        alias: '增产量',
                    },
                },
            })
        })
    }
    useEffect(() => {
        fetchTableData1()
        fetchPie1()
        fetchPie2()
        fetchPie3()
        fetchPie4()
        fetchColumn()
    }, [])
    return (
        <div className="c-all">
            <Table columns={columns1} dataSource={childTableData} pagination />
            <div className="c-container">
                <div className="c-content">
                    <div className="c-title">总分</div>
                    {
                        pie1Config ? <Pie {...pie1Config}></Pie> : null
                    }
                </div>
                <div className="c-content">
                    <div className="c-title">排液效果</div>
                    {
                        pie4Config ? <Pie {...pie4Config}></Pie> : null
                    }
                </div>
            </div>
            <div className="c-container">
                <div className="c-content">
                    <div className="c-title">正常率</div>
                    {
                        pie2Config ? <Pie {...pie2Config}></Pie> : null
                    }
                </div>
                <div className="c-content">
                    <div className="c-title">排液效果</div>
                    {
                        pie3Config ? <Pie {...pie3Config}></Pie> : null
                    }
                </div>
            </div>
            <div className="c-container">
                <div className="c-content">
                    <div className="c-title">增产效果柱状图</div>
                    {
                        columConfig ? <Column {...columConfig}></Column> : null
                    }
                </div>
            </div>
        </div>
    )
}


export default AllSingle