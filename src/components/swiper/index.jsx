import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom'
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Tag } from 'antd';
import { Line } from "@ant-design/plots";
import Loading from '@/components/loading'
import ReactECharts from 'echarts-for-react';
import 'echarts-gl';

import 'swiper/css';
import 'swiper/css/navigation';

import './index.less'

const Index = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true)
  const [meta, setMeta] = useState(null)
  const [meta3d, setMeta3d] = useState(null)
  const [stackLine1Data, setStackLine1Data] = useState(null)
  const [stackLine2Data, setStackLine2Data] = useState(null)
  const [stackLine3Data, setStackLine3Data] = useState(null)
  const [stackLine4Data, setStackLine4Data] = useState(null)
  const [stackLine3d, setStackLine3d] = useState(null)

  const [rate, setRate] = useState({
    correctRate: 0,
    stableRunningTime: 0
  })

  const [meta2_1Data, setMeta2_1Data] = useState(null)
  const [stackLine2_1Data, setStackLine2_1Data] = useState(null)

  const [meta2_2Data, setMeta2_2Data] = useState(null)
  const [stackLine2_2Data, setStackLine2_2Data] = useState(null)
  const [stackLine2_3Data, setStackLine2_3Data] = useState(null)

  const [meta2_3Data, setMeta2_3Data] = useState(null)
  const [stackLine2_4Data, setStackLine2_4Data] = useState(null)
  const [stackLine2_5Data, setStackLine2_5Data] = useState(null)
  const changeLine1Data = () => {
    const res = []
    const len = meta.data.originBpi.length
    for (let i = 0; i < len; i++) {
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
    setStackLine1Data({
      data: res,
      xField: 'day',
      yField: 'value',
      seriesField: 'category',
      color: ['#1979C9', '#D62A0D', '#FAA219'],
    })
  }
  const changeLine2Data = () => {
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
  const changeLine3Data = () => {
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
      color: ['#1979C9'],
    })
  }
  const changeLine4Data = () => {
    const res = []
    const len1 = meta.data.fftBpiSubPi.x.length
    for (let i = 0; i < len1; i++) {
      const fftBpiSubPi = {
        x: meta.data.fftBpiSubPi.x[i],
        y: meta.data.fftBpiSubPi.y[i],
        category: "油套压差傅立叶变换数据"
      }
      res.push(fftBpiSubPi)
    }
    setStackLine4Data({
      data: res,
      xField: 'x',
      yField: 'y',
      seriesField: 'category',
      color: ['#1979C9'],
    })
  }
  const changeStackLine3d = () => {
    const res = []
    let len1 = meta3d.data.FrequencyDomain.length
    for (let i = 0; i < len1; i++) {
      let len2 = meta3d.data.FrequencyDomain[i].length
      for (let j = 0; j < len2; j++) {
        let arr = [meta3d.data.timeDomain[i][j], meta3d.data.FrequencyDomain[i][j], meta3d.data.timeFrequencyDomain[i][j]]
        res.push(arr)
      }
    }
    setStackLine3d(
      {
        tooltip: {},
        visualMap: {
          show: false,
          dimension: 2,
          min: 0,
          max: 30,
          inRange: {
            color: [
              '#313695',
              '#4575b4',
              '#74add1',
              '#abd9e9',
              '#e0f3f8',
              '#ffffbf',
              '#fee090',
              '#fdae61',
              '#f46d43',
              '#d73027',
              '#a50026'
            ]
          }
        },
        xAxis3D: {
          type: 'value',
          name: "时域信息"
        },
        yAxis3D: {
          type: 'value',
          name: "频域信息"
        },
        zAxis3D: {
          type: 'value',
          name: "时间频域信息"
        },
        grid3D: {
          show: true,
          boxWidth: 90,
          boxHeight: 90,
          boxDepth: 90,
          viewControl: {
            projection: 'orthographic'
          }
        },
        series: [
          {
            type: 'line3D',
            data: res,
            lineStyle: {
              width: 4
            }
          }
        ]
      })
  }
  const changeLine2_1Data = () => {
    const res = []
    const len = meta2_1Data.data.length
    for (let i = 0; i < len; i++) {
      const data = {
        day: i + 1,
        value: meta2_1Data.data[i],
        category: "权重"
      }
      res.push(data)
    }
    setStackLine2_1Data({
      data: res,
      xField: 'day',
      yField: 'value',
      seriesField: 'category',
      color: ['#1979C9'],
    })
  }
  const changeLine2_2Data = () => {
    const res = []
    const len = meta2_2Data.data.CONV3.length
    for (let i = 0; i < len; i++) {
      const data = {
        day: i + 1,
        value: meta2_2Data.data.CONV3[i],
        category: "权重"
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
        category: "权重"
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
        category: "权重"
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
        category: "权重"
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
    let p1 = fetch(`http://101.34.38.102:8186/api/pictures/fft/${params.id}`).then(res => res.json()).then(res => {
      setMeta(res)
    }).then(_ => true)
    let p2 = fetch(`http://101.34.38.102:8186/api/pictures/stft/${params.id}`).then(res => res.json()).then(res => {
      setMeta3d(res)
    }).then(_ => true)
    let p3 = fetch(`http://101.34.38.102:8186/api/pictures/heat-map/${params.id}`).then(res => res.json()).then(res => {
      setMeta2_1Data(res)
    }).then(_ => true)
    let p4 = fetch(`http://101.34.38.102:8186/api/pictures/stable-running-time/${params.id}`).then(res => res.json()).then(res => {
      setMeta2_2Data(res)
    }).then(_ => true)
    let p5 = fetch(`http://101.34.38.102:8186/api/pictures/correct-rate/${params.id}`).then(res => res.json()).then(res => {
      setMeta2_3Data(res)
    }).then(_ => true)
    let p6 = fetch(`http://101.34.38.102:8186/api/pictures/rate-and-time/${params.taskid}`).then(res => res.json()).then(res => {
      setRate({
        stableRunningTime: res.data.stableRunningTime.toFixed(2),
        correctRate: res.data.correctRate.toFixed(2)
      })
    }).then(_ => true)
    Promise.all([
      p1, p2, p3, p4, p5, p6
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
      changeLine3Data()
      changeLine4Data()
    }
    if (meta3d && meta3d.data) {
      changeStackLine3d()
    }
    if (meta2_1Data && meta2_1Data.data) {
      changeLine2_1Data()
    }
    if (meta2_2Data && meta2_2Data.data) {
      changeLine2_2Data()
      changeLine2_3Data()
    }
    if (meta2_3Data && meta2_3Data.data) {
      changeLine2_4Data()
      changeLine2_5Data()
    }
  }, [meta, meta3d, meta2_1Data, meta2_3Data])
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
            <div className='one-page page'>
              <div className='content-flex'>
                <div className='content'>
                  <div className='title'>油压套压原图</div>
                  <div className='stack-line'>{stackLine1Data ? <Line {...stackLine1Data} /> : null}</div>
                </div>
                <div className='content'>
                  <div className='title'>油压套压差图</div>
                  <div className='stack-line'>{stackLine2Data ? <Line {...stackLine2Data} /> : null}</div>
                </div>
              </div>
              <div className="content-flex">
                <div className='content'>
                  <div className='title'>油压套压FFT变换，频谱图</div>
                  <div className='stack-line'>{stackLine3Data ? <Line {...stackLine3Data} /> : null}</div>
                </div>
                <div className='content'>
                  <div className='title'>油套压差FFT变换，频谱图</div>
                  <div className='stack-line'>{stackLine4Data ? <Line {...stackLine4Data} /> : null}</div>
                </div>
              </div>
              <div className="content-flex">
                <div className='content'>
                  <div className='title'>时频图</div>
                  <div className='stack-line3D'>{stackLine3d ? <ReactECharts option={stackLine3d} style={{ height: 600 }} /> : null}</div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='two-page page'>
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
              <div className='content-flex'>
                <div className='content'>
                  <div className='title'>稳定运行时间：神经网络第三层</div>
                  <div className='stack-line'>{stackLine2_2Data ? <Line {...stackLine2_2Data} /> : null}</div>
                </div>
                <div className='content'>
                  <div className='title'>稳定运行时间：神经网络第四层</div>
                  <div className='stack-line'>{stackLine2_3Data ? <Line {...stackLine2_3Data} /> : null}</div>
                </div>
              </div>
              <div className='content-flex'>
                <div className='content'>
                  <div className='title'>正确率：神经网络第三层</div>
                  <div className='stack-line'>{stackLine2_4Data ? <Line {...stackLine2_4Data} /> : null}</div>
                </div>
                <div className='content'>
                  <div className='title'>正确率：神经网络第四层</div>
                  <div className='stack-line'>{stackLine2_5Data ? <Line {...stackLine2_5Data} /> : null}</div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper >
      }
    </div>
  )
}



export default Index