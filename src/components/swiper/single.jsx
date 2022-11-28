import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom'
import { Tag } from 'antd';
import { Line, Column, Scatter } from "@ant-design/plots";
import { Button } from 'antd';
import Loading from '@/components/loading'
import 'echarts-gl';

import 'swiper/css';
import 'swiper/css/navigation';

import './single.less'
import { baseUrl } from '../../util/http';

const Single = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true)
    const [meta, setMeta] = useState(null)
    const [stackLine2Data, setStackLine2Data] = useState(null)
    const [stackLine3Data, setStackLine3Data] = useState(null)

    const [rate, setRate] = useState({
        correctRate: 0,
        stableRunningTime: 0
    })

    const [meta2_1Data, setMeta2_1Data] = useState(null)
    const [meta2_2Data, setMeta2_2Data] = useState(null)
    const [meta2_3Data, setMeta2_3Data] = useState(null)

    const [stackLine2_1Data, setStackLine2_1Data] = useState(null)
    const [stackLine2_2Data, setStackLine2_2Data] = useState(null)
    const [stackLine2_3Data, setStackLine2_3Data] = useState(null)

    const [isSc, setSc] = useState(false)
    const changeLine1Data = () => {
        const res = []
        const len = meta.data.originBpiSubBi.length
        for (let i = 0; i < len; i++) {
            const bpiSubBi = {
                day: i + 1,
                value: meta.data.originBpiSubBi[i],
                category: "油套压差"
            }
            res.push(bpiSubBi)
        }
        setStackLine2Data({
            data: res,
            xField: 'day',
            yField: 'value',
            seriesField: 'category',
            color: ['#1979C9'],
        })
    }
    const changeLine2Data = () => {
        const res = []
        const len1 = meta.data.fftBpi.x.length
        for (let i = 0; i < len1; i++) {
            const fftBpi = {
                x: meta.data.fftBpi.x[i],
                y: meta.data.fftBpi.y[i],
                category: "油压傅立叶变换数据"
            }
            res.push(fftBpi)
        }
        const len2 = meta.data.fftPi.x.length
        for (let i = 0; i < len2; i++) {
            const fftPi = {
                x: meta.data.fftPi.x[i],
                y: meta.data.fftPi.y[i],
                category: "套压傅立叶变换数据"
            }
            res.push(fftPi)
        }
        setStackLine3Data({
            data: res,
            xField: 'x',
            yField: 'y',
            seriesField: 'category',
            color: ['#1979C9', '#D62A0D'],
        })
    }
    const changeLine2_1Data = () => {
        let res = []
        const len = meta2_1Data.data.length
        for (let i = 0; i < len; i++) {
            const data = {
                day: i + 1,
                value: meta2_1Data.data[i],
                category: "权重"
            }
            res.push(data)
        }
        const len2 = meta.data.originBpi.length
        for (let i = 0; i < len2; i++) {
            const bpi = {
                day: i + 1,
                value: meta.data.originBpi[i],
                category: "套压"
            }
            const pi = {
                day: i + 1,
                value: meta.data.originPi[i],
                category: "油压"
            }
            const zuv = {
                day: i + 1,
                value: meta.data.originZuv[i],
                category: "开关井状态"
            }
            const scms = {
                day: i + 1,
                value: meta.data.originScms[i],
                category: "生产制度"
            }
            res.push(bpi, pi, zuv, scms)
        }

        const len3 = meta.data.originBpiSubBi.length
        for (let i = 0; i < len3; i++) {
            const bpiSubBi = {
                day: i + 1,
                value: meta.data.originBpiSubBi[i],
                category: "油套压差"
            }
            res.push(bpiSubBi)
        }
        setStackLine2_1Data({
            data: res,
            xField: 'day',
            yField: 'value',
            seriesField: 'category',
            color: ['#1979C9', '#D62A0D', '#FAA219', "#000", "green", "purple"],
        })
    }
    const changeLine2_2Data = () => {
        const res = []
        const len1 = meta2_2Data.data.drainage.length
        for (let i = 0; i < len1; i++) {
            const bpi = {
                day: i,
                value: meta2_2Data.data.drainage[i],
                category: "排液系数"
            }
            res.push(bpi)
        }
        setStackLine2_2Data({
            data: res,
            xField: 'day',
            yField: 'value',
            seriesField: 'category',
            color: ['#D62A0D', '#FAA219'],
        })
    }
    const changeLine2_3Data = () => {
        const res = []
        const len = meta2_3Data.data.length
        for (let i = 0; i < len; i++) {
            const data = {
                type: meta2_3Data.data[i].startTimeStamp + meta2_3Data.data[i].endTimeStamp,
                sales: Number(Number(meta2_3Data.data[i].sumOfProd).toFixed(2))
            }
            res.push(data)
        }
        const config = {
            data: res,
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
                    alias: '产气量',
                },
            },
        };
        setStackLine2_3Data(config)
    }
    useEffect(() => {
        let p1 = fetch(`${baseUrl}/api/pictures/fft/${params.taskid}`).then(res => res.json()).then(res => {
            setMeta(res)
        }).then(_ => true)
        let p2 = fetch(`${baseUrl}/api/pictures/heat-map/${params.taskid}`).then(res => res.json()).then(res => {
            setMeta2_1Data(res)
        }).then(_ => true)
        let p3 = fetch(`${baseUrl}/api/pictures/rate-and-time/${params.taskid}`).then(res => res.json()).then(res => {
            setRate({
                stableRunningTime: res.data.stableRunningTime.toFixed(2),
                correctRate: res.data.correctRate.toFixed(2)
            })
        }).then(_ => true)
        let p4 = fetch(`${baseUrl}/api/pictures/pressure-diagram/${params.taskid}`).then(res => res.json()).then(res => {
            setMeta2_2Data(res)
        }).then(_ => true)
        let p5 = fetch(`${baseUrl}/api/pictures/gas-prod/${params.taskid}`).then(res => res.json()).then(res => {
            setMeta2_3Data(res)
        }).then(_ => true)
        Promise.all([
            p1, p2, p3, p4, p5
        ]).then(values => {
            if (values.every(i => i == true)) {
                setLoading(false)
            }
        })
    }, [])
    useEffect(() => {
        if (meta && meta.data) {
            changeLine1Data()
            changeLine2Data()
        }
        if (meta2_1Data && meta && meta2_1Data.data && meta.data) {
            changeLine2_1Data()
        }
        if (meta2_2Data && meta2_2Data.data) {
            changeLine2_2Data()
        }
        if (meta2_3Data && meta2_3Data.data) {
            changeLine2_3Data()
        }
    }, [meta, meta2_1Data, meta2_2Data, meta2_3Data])
    return (
        <div className="c-swiper" >
            {
                loading ? <Loading /> : <div className='two-page page'>
                    <div className='content-flex'>
                        <div className='content'>
                            <div className='title'>热力图</div>
                            <div className='heat-map'>
                                <div className='rate'>
                                    <Tag color='success' style={{ fontSize: 15, padding: 10 }}>稳定性时间:{rate.stableRunningTime}</Tag>
                                    <Tag color='success' style={{ fontSize: 15, padding: 10 }}>正确率:{rate.correctRate}</Tag>
                                </div>
                                {stackLine2_1Data ? <Line {...stackLine2_1Data} /> : null}</div>
                        </div>
                    </div>
                    <div className="content-flex">
                        <div className='content'>
                            <div className='title'>油套压频谱图</div>
                            <div className='stack-line'>{stackLine3Data ? <Line {...stackLine3Data} /> : null}</div>
                        </div>
                        <div className='content'>
                            <div className='title'>排液效果图</div>
                            <div className='stack-line'>{stackLine2_2Data ? <Line {...stackLine2_2Data} /> : null}</div>
                        </div>
                    </div>
                    <div className='content-flex'>
                        <div className='content'>
                            <div className='flex'>
                                <div className='title' onClick={() => { setSc(true) }}>产气量柱状图</div>
                                <div className='title' onClick={() => { setSc(false) }}>产气量散点图</div>
                            </div>
                            {
                                isSc ? (
                                    <div className='stack-line'>{stackLine2_3Data ? <Column {...stackLine2_3Data} /> : null}</div>
                                ) : (
                                    <div className='stack-line'>{stackLine2_3Data ? <Scatter {...stackLine2_3Data} /> : null}</div>
                                )
                            }
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}



export default Single