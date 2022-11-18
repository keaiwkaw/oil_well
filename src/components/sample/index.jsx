import {
  Table,
  Button,
  DatePicker,
  Select,
  Modal,
  Progress,
  Popover,
  Input,
} from "antd";
import { useState } from "react";
const { RangePicker } = DatePicker;
// import { QuestionCircleOutlined } from "@ant-design/icons";
import "./index.less";

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

  const handlePageChange = () => {};
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

  const fetchWellById = (value) => {
    console.log(value);
    fetch("http://101.34.38.102:8000/api/getBaseData", {
      method:"POST",
      body:JSON.stringify({
        pageNo:1,
        wellId
      })
    });
  };
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
      <Modal
        title=" "
        open={explainModalVisible}
        footer={[
          <Button type="primary" onClick={handleCloseExplainModal}>
            确认
          </Button>,
        ]}
      >
        <p>
          1、各种控制方法的效果体现在所应用气井的历史数据中，本页面功能用于选择进行算法评价的气井数据样本。故障时段的数据不能用于评价，在默认下会根据识别算法自动排除。若需精确指定时段，可以手动选择，并取消勾选“自动剔除异常时段”
        </p>
        <p>
          2、在使用总体分析时，为了充分体现被评价算法特征，避免样本极值对效果的影响，通常单次各算法分析不少于10口井/7天的生产数据。(单井分析不受样本数量限制)
        </p>
        <p>3、默认不选择各样本时间的状态下，会自动填充上方总时间。</p>
        <p>
          4、本页面支持批量导入、导出，空表格模板可在未选择任何样本时点击导出进行下载，然后填写后点击顶部右侧导入按钮。
        </p>
        <p>
          5、“算法类型选择”一栏，可在选择样本时输入，指定该样本所属算法的名称。所有该项不填的样本会被分成同一类，各算法样本数量应满足条目2中的要求。
        </p>
        <p>
          6、“批量快捷选择”一栏，可通过勾选单井、站点、作业区后点击“确认”的方法，批量变更样本。
        </p>
      </Modal>
      <Modal
        open={analyzeModalVisible}
        footer={[
          <Button type="primary" onClick={handleCloseAnalyzeModal}>
            终止
          </Button>,
        ]}
        className="c-modal-analyze"
        bodyStyle={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p>算法分析中......</p>
        <p>开始时间:2022/11/10 22:17:03</p>
        <p>预计剩余时间：1小时32分</p>
        <Progress percent={30} showInfo={false} />
        <p>30%</p>
      </Modal>
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
          <Button type="primary">导入</Button>
          <Button type="primary">导出</Button>
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
