import React, { useState, useEffect } from 'react';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Tag } from 'antd';
import { Line, Heatmap, Pie } from "@ant-design/plots";

import ReactECharts from 'echarts-for-react';
import 'echarts-gl';

import meta from "./data.js"

import 'swiper/css';
import 'swiper/css/navigation';

import './index.less'

const Index = () => {
  const StackLine1 = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      asyncFetch();
    }, []);

    const asyncFetch = () => {
      const res = []
      const len = meta.data.originBpi.length
      for (let i = 0; i < len; i++) {
        const bpi = {
          day: i + 1,
          value: meta.data.originBpi[i],
          category: "bpi"
        }
        const pi = {
          day: i + 1,
          value: meta.data.originPi[i],
          category: "pi"
        }
        const zuv = {
          day: i + 1,
          value: meta.data.originZuv[i],
          category: "zuv"
        }
        const scms = {
          day: i + 1,
          value: meta.data.originScms[i],
          category: "scms"
        }
        res.push(bpi, pi, zuv, scms)
      }
      setData(res)
    };
    const config = {
      data,
      xField: 'day',
      yField: 'value',
      seriesField: 'category',
      color: ['#1979C9', '#D62A0D', '#FAA219'],
    };

    return <Line {...config} />;
  };
  const StackLine2 = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      asyncFetch();
    }, []);

    const asyncFetch = () => {
      const res = []
      const len = meta.data.originBpiSubBi.length
      for (let i = 0; i < len; i++) {
        const bpiSubBi = {
          day: i + 1,
          value: meta.data.originBpiSubBi[i],
          category: "bpiSubBi"
        }
        res.push(bpiSubBi)
      }

      setData(res)
    };
    const config = {
      data,
      xField: 'day',
      yField: 'value',
      seriesField: 'category',
      color: ['#1979C9'],
    };

    return <Line {...config} />;
  };
  const StackLine3 = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      asyncFetch();
    }, []);

    const asyncFetch = () => {
      const res = []
      const len1 = meta.data.fftBpi.x.length
      for (let i = 0; i < len1; i++) {
        const fftBpi = {
          x: meta.data.fftBpi.x[i],
          y: meta.data.fftBpi.y[i],
          category: "fftBpi"
        }
        res.push(fftBpi)
      }
      const len2 = meta.data.fftPi.x.length
      for (let i = 0; i < len2; i++) {
        const fftPi = {
          x: meta.data.fftPi.x[i],
          y: meta.data.fftPi.y[i],
          category: "fftPi"
        }
        res.push(fftPi)
      }
      setData(res)
    };
    const config = {
      data,
      xField: 'x',
      yField: 'y',
      seriesField: 'category',
      color: ['#1979C9'],
    };

    return <Line {...config} />;
  };
  const StackLine4 = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      asyncFetch();
    }, []);

    const asyncFetch = () => {
      const res = []
      const len1 = meta.data.fftBpiSubPi.x.length
      for (let i = 0; i < len1; i++) {
        const fftBpiSubPi = {
          x: meta.data.fftBpiSubPi.x[i],
          y: meta.data.fftBpiSubPi.y[i],
          category: "fftBpiSubPi"
        }
        res.push(fftBpiSubPi)
      }
      setData(res)
    };
    const config = {
      data,
      xField: 'x',
      yField: 'y',
      seriesField: 'category',
      color: ['#1979C9'],
    };

    return <Line {...config} />;
  };
  const StackLine3D = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      asyncFetch();
    }, []);

    const asyncFetch = () => {
      setData([[-1, -1, -1], [0, 0, 0], [1, 1, 1]])
    };
    const option = {
      grid3D: {},
      xAxis3D: {},
      yAxis3D: {},
      zAxis3D: {},
      series: [{
        type: 'scatter3D',
        symbolSize: 50,
        data: data,
        itemStyle: {
          opacity: 1
        }
      }]
    };
    return (
      <ReactECharts option={option} />
    );
  }
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
    <div className="c-swiper">
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        navigation
        style={{ height: '100%' }}
      >
        <SwiperSlide>
          <div className='one-page page'>
            <div className='content'>
              <div className='title'>油压套压原图</div>
              <div className='stack-line'><StackLine1 /></div>
            </div>
            <div className='content'>
              <div className='title'>油压套压差图</div>
              <div className='stack-line'><StackLine2 /></div>
            </div>
            <div className='content'>
              <div className='title'>油压套压FFT变换，频谱图</div>
              <div className='stack-line'><StackLine3 /></div>
            </div>
            <div className='content'>
              <div className='title'>油套压差FFT变换，频谱图</div>
              <div className='stack-line'><StackLine4 /></div>
            </div>
            <div className='content'>
              <div className='title'>时频图</div>
              <div className='stack-line'><StackLine3D /></div>
            </div>
            <div className='content'>
              <div className='title'>指标评价</div>
              <div className='heat-map'>
                <div className='rate'>
                  <Tag color='success'>稳定性时间:A</Tag>
                  <Tag color='success'>正确率:B</Tag>
                </div>
                <Map />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='two-page page'>
            <DemoPie />
            123
          </div>
        </SwiperSlide>
      </Swiper >
    </div>
  )
}



export default Index