import {
  Table,
  Button,
  DatePicker,
  Select,
  Modal,
  Progress,
  Popover,
  Input,
  Upload
} from "antd";
import { useState } from "react";
import FuncDescModal from "./func-desc-modal";
import { baseUrl } from "../../util/http";
const { RangePicker } = DatePicker;
// import { QuestionCircleOutlined } from "@ant-design/icons";
import "./index.less";


import { queryGetParams } from "@/util"

const { Search } = Input;

const Sample = () => {
  const columns = [
    {
      title: "序号",
      render: (_, __, index) => `${index + 1}`,
    },
    {
      title: "采气厂",
      dataIndex: "gasProductionPlant",
      width: 200,
    },
    {
      title: "作业区",
      dataIndex: "operationArea",
      width: 200,
    },
    {
      title: "集气站名称",
      dataIndex: "gasGatheringStation",
      width: 200,
    },
    {
      title: "井号",
      dataIndex: "wellNum",
      render: (text) => {
        return (
          <Select
            defaultValue={text}
            options={[
              {
                value: text,
                label: text,
              },
            ]}
          />
        );
      },
    },
    {
      title: "诊断状态",
      width: 200,
      dataIndex: "diagnosticStatus",
      render: (_, record) => {
        return (
          <span
            style={{ color: !record.diagnosticStatus.code ? "red" : "black" }}
          >
            {record.diagnosticStatus.text}
          </span>
        );
      },
    },
    {
      title: "算法类型",
      width: 200,
      dataIndex: "algorithmType",
      render: (text) => {
        return (
          <Select
            defaultValue={text}
            options={[
              {
                value: text,
                label: text,
              },
            ]}
          />
        );
      },
    },
    {
      title: "开始时间",
      width: 200,
      dataIndex: "beginTime",
    },
    {
      title: "截至时间",
      width: 200,
      dataIndex: "endTime",
    },
    {
      title: "操作",
      width: 200,
      render: (row, record) => <Button type="primary">移除</Button>,
    },
  ];

  const tableData = [
    {
      gasProductionPlant: "第二采气厂",
      operationArea: "作业二区",
      gasGatheringStation: "榆10站",
      wellNum: "榆47-11C1",
      diagnosticStatus: {
        code: 1,
        text: "基本正常",
      },
      algorithmType: "huffman",
      beginTime: "2022-1-1",
      endTime: "2022-3-5",
    },
    {
      gasProductionPlant: "第二采气厂",
      operationArea: "作业二区",
      gasGatheringStation: "榆10站",
      wellNum: "榆47-11C1",
      diagnosticStatus: {
        code: 1,
        text: "正常无排液",
      },
      algorithmType: "huffman",
      beginTime: "2022-1-1",
      endTime: "2022-3-5",
    },
    {
      gasProductionPlant: "第二采气厂",
      operationArea: "作业二区",
      gasGatheringStation: "榆10站",
      wellNum: "榆47-11C1",
      diagnosticStatus: {
        code: 1,
        text: "正常",
      },
      algorithmType: "huffman",
      beginTime: "2022-1-1",
      endTime: "2022-3-5",
    },
    {
      gasProductionPlant: "第二采气厂",
      operationArea: "作业二区",
      gasGatheringStation: "榆10站",
      wellNum: "榆47-11C1",
      diagnosticStatus: {
        code: 0,
        text: "油压异常",
      },
      algorithmType: "huffman",
      beginTime: "2022-1-1",
      endTime: "2022-3-5",
    },
    {
      gasProductionPlant: "第二采气厂",
      operationArea: "作业二区",
      gasGatheringStation: "榆10站",
      wellNum: "榆47-11C1",
      diagnosticStatus: {
        code: 1,
        text: "正常",
      },
      algorithmType: "huffman",
      beginTime: "2022-1-1",
      endTime: "2022-3-5",
    },
  ];

  const [analyzeModalVisible, setAnalyzeModalVisible] = useState(false);

  const [explainModalVisible, setExplainModalVisible] = useState(false);

  const [popoverVisible, setPopoverVisible] = useState(false);

  const [searchDataVisible, setSearchDataVisible] = useState(false)

  const handlePageChange = () => { };

  const handleCloseExplainModal = () => {
    setExplainModalVisible(false);
  };
  const handleCloseAnalyzeModal = () => {
    setAnalyzeModalVisible(false);
  };

  const handleOpenAnalyzeModal = () => {
    setAnalyzeModalVisible(true);
  };
  const handleOpenExplainModal = () => {
    setExplainModalVisible(true);
  };
  const setRowColor = (record, index) => {
    if (index % 2 == 1) {
      return "c-table-grey";
    }
  };

  const handleRangeTimeChange = (dates) => {
    console.log(dates);
  };

  const handleOpenSearchWell = () => {
    setPopoverVisible(true);
  };

  const handleOpenSearchData = () => {
    setSearchDataVisible(true)
  }
  const fetchWellById = (value) => {
    fetch(queryGetParams('/api/getBaseData', {
      pageNo: 1,
      wellId: value,
      pageSize: 500
    }), {
      method: "POST",
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
  };

  /** 下载导入的Excel模板 */
  const handleDownloadExcelSample = () => {
    window.open(`${baseUrl}/api/commons/download`)
  }

  /** 导入excel请求数据 */
  const handleImportExcel = (info) => {
    const { file } = info;
    const { status, response } = file;
    if (status === 'uploading') {

    }
    if (status === 'done') {
      console.log(response)
    }
    if (status === 'error') { }
  }
  const total = 5;

  const SearchNode = (
    <Search
      placeholder="输入井的ID"
      onSearch={fetchWellById}
      style={{ width: 200 }}
    />
  );
  return (
    <div className="c-sample">
      <FuncDescModal explainModalVisible={explainModalVisible} handleCloseExplainModal={handleCloseExplainModal} />

      <div className="c-sample-header">
        <div className="c-sample-header-icon">
          {/* <QuestionCircleOutlined /> */}
          <span
            style={{ color: "#2F18FF", cursor: "pointer" }}
            onClick={handleOpenExplainModal}
          >
            功能说明
          </span>
        </div>
        <div className="c-sample-header-input">
          <div className="c-sample-header-input-batch">
            <span className="c-sample-header-input-text">批量快捷选择</span>
            <Select style={{ width: 220 }} />
          </div>
          <div className="c-sample-header-input-time">
            <span className="c-sample-header-input-text"> 默认起止时间</span>
            <RangePicker onChange={handleRangeTimeChange} />
          </div>
        </div>
        <div className="c-sample-header-btn">
          <Upload name="file" action={`${baseUrl}/api/commons/upload`} onChange={handleImportExcel}>
            <Button type="primary" >导入</Button>
          </Upload>
          <Button type="primary" onClick={handleDownloadExcelSample}>下载模板</Button>
          <Button type="primary" onClick={handleOpenAnalyzeModal}>
            开始分析
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{
          defaultPageSize: 9,
          total: total,
          onChange: handlePageChange,
        }}
        rowClassName={setRowColor}
      />

      <Popover
        type="primary"
        content={SearchNode}
        trigger="click"
        open={popoverVisible}
        onOpenChange={handleOpenSearchWell}
      >
        <Button type="primary">添加新样本</Button>
      </Popover>
    </div>
  );
};

export default Sample;
