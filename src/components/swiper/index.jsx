import React, { useState, useEffect, useLayoutEffect } from 'react';

import { useParams } from 'react-router-dom'
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Tag } from 'antd';
import { Line, Heatmap, Pie } from "@ant-design/plots";
import Loading from '@/components/loading'
import ReactECharts from 'echarts-for-react';
import 'echarts-gl';

// import meta from "./data.js"
// import meta3d from "./res.js"

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
  const changeLine1Data = () => {
    const res = []
    const len = meta.data.originBpi.length
    for (let i = 0; i < len; i++) {
      const bpi = {
        day: i + 1,
        value: meta.data.originBpi[i],
        category: "原始套压Mpa"
      }
      const pi = {
        day: i + 1,
        value: meta.data.originPi[i],
        category: "原始油压Mpa"
      }
      const zuv = {
        day: i + 1,
        value: meta.data.originZuv[i],
        category: "原始状态"
      }
      const scms = {
        day: i + 1,
        value: meta.data.originScms[i],
        category: "原始生产制度"
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
        category: "原始bpi-原始bi"
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
        category: "傅里叶变换后的Bpi模型"
      }
      res.push(fftBpi)
    }
    const len2 = meta.data.fftPi.x.length
    for (let i = 0; i < len2; i++) {
      const fftPi = {
        x: meta.data.fftPi.x[i],
        y: meta.data.fftPi.y[i],
        category: "傅里叶变换后的Pi模型"
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
        category: "傅里叶变换后的Bpi-Pi模型"
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
  useEffect(() => {
    let p1 = fetch(`http://101.34.38.102:8186/api/pictures/fft/${params.id}`).then(res => res.json()).then(res => {
      setMeta(res)
    }).then(_ => true)
    let p2 = fetch(`http://101.34.38.102:8186/api/pictures/stft/${params.id}`).then(res => res.json()).then(res => {
      setMeta3d(res.data)
    }).then(_ => true)
    Promise.all([
      p1, p2
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
  }, [meta,meta3d])

  const Map = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
      asyncFetch();
    }, []);
    const asyncFetch = () => {
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/heatmap.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          console.log('fetch data failed', error);
        });
    };
    const config = {
      data,
      type: 'density',
      xField: 'g',
      yField: 'l',
      colorField: 'tmp',
      color: '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2',
      legend: {
        position: 'bottom',
      },
      annotations: [
        {
          type: 'image',
          start: ['min', 'max'],
          end: ['max', 'min'],
          src: 'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
        },
      ],
    };

    return <Heatmap {...config} />;
  };
  const DemoPie = () => {
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
    return <Pie {...config} />;
  };
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
                <div className='content'>
                  <div className='title'>指标评价</div>
                  <div className='heat-map'>
                    <div className='rate'>
                      <Tag color='success' style={{ fontSize: 15, padding: 10 }}>稳定性时间:A</Tag>
                      <Tag color='success' style={{ fontSize: 15, padding: 10 }}>正确率:B</Tag>
                    </div>
                    <Map />
                  </div>
                </div>
              </div>
              {/* <div className="content-flex">
              <div className='content'>
                <div className='title'>指标评价</div>
                <div className='heat-map'>
                  <div className='rate'>
                    <Tag color='success' style={{fontSize:15,padding:10}}>稳定性时间:A</Tag>
                    <Tag color='success' style={{fontSize:15,padding:10}}>正确率:B</Tag>
                  </div>
                  <Map />
                </div>
              </div>
            </div> */}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='two-page page'>
              <DemoPie />
            123
          </div>
          </SwiperSlide>
        </Swiper >
      }
    </div>
  )
}



export default Index