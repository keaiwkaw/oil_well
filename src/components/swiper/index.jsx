import React, { useState, useEffect } from 'react';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Tag } from 'antd';
import { Line, Heatmap, Pie } from "@ant-design/plots";

import json from "./data.js"

import 'swiper/css';
import 'swiper/css/navigation';

import './index.less'

const Index = () => {
  const StackLine = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      asyncFetch();
    }, []);

    const asyncFetch = () => {
      // fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
      //     .then((response) => response.json())
      //     .then((json) => setData(json))
      //     .catch((error) => {
      //         console.log('fetch data failed', error);
      //     });
      const res = []
      json.forEach((item, index) => {
        const bpi = {
          day: item.ts,
          value: item.bpi,
          category: "bpi"
        }
        const pi = {
          day: item.ts,
          value: item.pi,
          category: "pi"
        }
        const zuv = {
          day: item.ts,
          value: item.zuv,
          category: "zuv"
        }
        const scms = {
          day: item.ts,
          value: item.scms,
          category: "scms"
        }
        res.push(bpi, pi, zuv, scms)
      })
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
              <div className='title'>原始数据</div>
              <div className='stack-line'><StackLine /></div>
            </div>
            <div className='content'>
              <div className='title'>原始数据</div>
              <div className='stack-line'><StackLine /></div>
            </div>
            <div className='content'>
              <div className='title'>原始数据</div>
              <div className='stack-line'><StackLine /></div>
            </div>
            <div className='content'>
              <div className='title'>原始数据</div>
              <div className='stack-line'><StackLine /></div>
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