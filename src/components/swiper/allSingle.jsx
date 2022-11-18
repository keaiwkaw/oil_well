import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Table, Tag } from 'antd';
import { Line, Scatter } from "@ant-design/plots";

import Loading from '@/components/loading'
import 'echarts-gl';

import 'swiper/css';
import 'swiper/css/navigation';
import './allSingle.less'


const AllSingle = () => {
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
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    const params = useParams();
    const [loading, setLoading] = useState(true)

    const [meta2_1Data, setMeta2_1Data] = useState(null)

    const [meta2_2Data, setMeta2_2Data] = useState(null)
    const [stackLine2_2Data, setStackLine2_2Data] = useState(null)
    const [stackLine2_3Data, setStackLine2_3Data] = useState(null)

    const [meta2_3Data, setMeta2_3Data] = useState(null)
    const [stackLine2_4Data, setStackLine2_4Data] = useState(null)
    const [stackLine2_5Data, setStackLine2_5Data] = useState(null)
    const changeLine2_2Data = () => {
        const res = []
        const len = meta2_2Data.data.CONV3.length
        for (let i = 0; i < len; i++) {
            const data = {
                day: i + 1,
                value: meta2_2Data.data.CONV3[i],
                category: ""
            }
            res.push(data)
        }
        setStackLine2_2Data({
            data: res,
            xField: 'day',
            yField: 'value',
            seriesField: 'category',
            color: ['#1979C9'],
        })
    }
    const changeLine2_3Data = () => {
        const res = []
        const len = meta2_2Data.data.CONV4.length
        for (let i = 0; i < len; i++) {
            const data = {
                day: i + 1,
                value: meta2_2Data.data.CONV4[i],
                category: ""
            }
            res.push(data)
        }
        setStackLine2_3Data({
            data: res,
            xField: 'day',
            yField: 'value',
            seriesField: 'category',
            color: ['#1979C9'],
        })
    }
    const changeLine2_4Data = () => {
        const res = []
        const len = meta2_3Data.data.CONV3.length
        for (let i = 0; i < len; i++) {
            const data = {
                day: i + 1,
                value: meta2_3Data.data.CONV3[i],
                category: ""
            }
            res.push(data)
        }
        setStackLine2_4Data({
            data: res,
            xField: 'day',
            yField: 'value',
            seriesField: 'category',
            color: ['#1979C9'],
        })
    }
    const changeLine2_5Data = () => {
        const res = []
        const len = meta2_3Data.data.CONV4.length
        for (let i = 0; i < len; i++) {
            const data = {
                day: i + 1,
                value: meta2_3Data.data.CONV4[i],
                category: ""
            }
            res.push(data)
        }
        setStackLine2_5Data({
            data: res,
            xField: 'day',
            yField: 'value',
            seriesField: 'category',
            color: ['#1979C9'],
        })
    }
    useEffect(() => {
        let p3 = fetch(`http://101.34.38.102:8186/api/pictures/heat-map/${params.id}`).then(res => res.json()).then(res => {
            setMeta2_1Data(res)
        }).then(_ => true)
        let p4 = fetch(`http://101.34.38.102:8186/api/pictures/stable-running-time/${params.id}`).then(res => res.json()).then(res => {
            setMeta2_2Data(res)
        }).then(_ => true)
        let p5 = fetch(`http://101.34.38.102:8186/api/pictures/correct-rate/${params.id}`).then(res => res.json()).then(res => {
            setMeta2_3Data(res)
        }).then(_ => true)
        Promise.all([
            p3, p4, p5
        ]).then(values => {
            if (values.every(i => i == true)) {
                setLoading(false)
            }
        })
    }, [])
    useEffect(() => {
        if (meta2_2Data && meta2_2Data.data) {
            changeLine2_2Data()
            changeLine2_3Data()
        }
        if (meta2_3Data && meta2_3Data.data) {
            changeLine2_4Data()
            changeLine2_5Data()
        }
    }, [meta2_1Data, meta2_3Data])
    return (
        <div className="c-swiper" >
            {
                loading ? <Loading /> : <Swiper
                    modules={[Navigation]}
                    slidesPerView={1}
                    navigation
                    style={{ height: '100%' }}
                >
                    <SwiperSlide>
                        <div className='two-page page'>
                            <div className='content-flex'>
                                <div className='content'>
                                    <div className='title'>总分</div>
                                    <div className='all-scatter'>{stackLine2_2Data ? <Scatter {...stackLine2_2Data} /> : null}</div>
                                </div>
                            </div>
                            <div className='content-flex'>
                                <div className='content'>
                                    <div className='title'>正确率</div>
                                    <div className='stack-scatter'>{stackLine2_4Data ? <Scatter {...stackLine2_4Data} /> : null}</div>
                                </div>
                                <div className='content'>
                                    <div className='title'>稳定运行时间</div>
                                    <div className='stack-scatter'>{stackLine2_5Data ? <Scatter {...stackLine2_5Data} /> : null}</div>
                                </div>
                            </div>
                            <div className='content-flex'>
                                <div className='content'>
                                    <div className='title'>总体和子项的分值</div>
                                    <Table className='table' columns={columns} dataSource={data} pagination={false} />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper >
            }
        </div>
    )
}



export default AllSingle