import {
  Table,
  Button,
  DatePicker,
  Cascader,
  Popover,
  Input,
  Upload,
  message,
  TreeSelect,
  AutoComplete
} from "antd";
import { useState } from "react";
import FuncDescModal from "./func-desc-modal";
import SearchResModal from "./search-res-modal";
import request, { baseUrl, oldBaseUrl } from "../../util/http";
import { arrayToTree, arrayToTreeFlat } from "../../util";
const { RangePicker } = DatePicker;
import dayjs from 'dayjs'
import "./index.less";


import { queryGetParams } from "@/util"
import { useEffect } from "react";

const { Search } = Input;

// const DEFAULT_ALG = "";
const ALGS = [
  {
    label: '均衡',
    value: '0',
  },
  {
    label: '稳定运行时间优先',
    value: '1',
  },
  {
    label: '正确率优先',
    value: '2',
  },
  {
    label: '自选模式',
    value: '3',
    children: [
      {
        label: '稳定运行时间',
        value: '1',
        disabled: true,
      },
      {
        label: '正确率',
        value: '2',
        disabled: true,
      },
      {
        label: '排液效果',
        value: '3',
      },
      {
        label: '增产效果',
        value: '4',
      },
    ],
  },
];

const Sample = () => {
  const columns = [
    {
      title: "序号",
      render: (_, __, index) => `${index + 1}`,
    },
    {
      title: "采气厂",
      dataIndex: "factoryName",
      width: 200,
    },
    {
      title: "作业区",
      dataIndex: "workZoneName",
      width: 200,
    },
    {
      title: "集气站名称",
      dataIndex: "stationName",
      width: 200,
    },
    {
      title: "井号",
      dataIndex: "wellName",
      width: 200,
    },
    {
      title: "算法类型",
      width: 200,
      dataIndex: "weightChoose",
      render: (_, record) => {
        let text = ''
        switch (types && types[0]) {
          case '0':
            text = "均衡"
            break;
          case '1':
            text = "稳定运行时间优先"
            break;
          case '2':
            text = "正确率优先"
            break;
          case "3":
            text = "自选模式"
            break;
          default:
            break;
        }
        return text;
      },
    },
    {
      title: "开始时间",
      width: 200,
      dataIndex: "startTimeStamp",
      render: () => sbTime[0]
    },
    {
      title: "截至时间",
      width: 200,
      dataIndex: "endTimeStamp",
      render: () => sbTime[1]
    },
    {
      title: "操作",
      width: 200,
      render: (row, record, index) => <Button type="primary" onClick={() => { handleDeleteTableItem(index) }}>移除</Button>,
    },
  ];


  const [analyzeModalVisible, setAnalyzeModalVisible] = useState(false);

  const [explainModalVisible, setExplainModalVisible] = useState(false);

  const [popoverVisible, setPopoverVisible] = useState(false);

  const [searchDataVisible, setSearchDataVisible] = useState(false)

  const [tableData, setTableData] = useState([])
  const [copyTableData, setCopyTableData] = useState([])
  const [total, setTotal] = useState(0)
  const [allSelect, setAllSelect] = useState([])

  const [sampleValue, setSampleValue] = useState('')
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([])

  const [analysesValue, setAnalysesValue] = useState('')

  const [disableAnalysesBtn, setDisableAnalysesBtn] = useState(true)


  const [sbTime, setSbTime] = useState([]);

  const [types, setTypes] = useState([]);


  const handlePageChange = () => {

  };

  const handleCloseExplainModal = () => {
    setExplainModalVisible(false);
  };
  const handleCloseAnalyzeModal = () => {
    request('/api/commons/stop')
    setAnalyzeModalVisible(false);
  };

  /** 开始分析 */
  const handleOpenAnalyzeModal = () => {
    setAnalyzeModalVisible(true);
    const list = tableData.map(i => {
      return {
        endTimeStamp: i.endTimeStamp,
        startTimeStamp: i.startTimeStamp,
        wellId: i.wellId,
        wellName: i.wellName
      }
    })

    let typeArr = types
    if (types[0] === "3") {
      // 自选模式
      typeArr.shift()
      if (typeArr.length === 0) {
        // 全选
        typeArr = ["3", "4"]
      }
    }

    const data = {
      data: list,
      groupName: analysesValue,
      weightChoose: types[0],
      customModule: typeArr || []
    }
    fetch(`${baseUrl}/dynamics`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(res => {
      message.success(res.msg)
      setAnalyzeModalVisible(false);
    })
  };
  const handleOpenExplainModal = () => {
    setExplainModalVisible(true);
  };
  const setRowColor = (record, index) => {
    if (index % 2 == 1) {
      return "c-table-grey";
    }
  };

  const handleRangeTimeChange = (dates, dayStrings) => {
    if (dayStrings) {
      setSbTime(dayStrings)
    }
    if (!dates) {
      setTableData(copyTableData)
      setSbTime([])
    } else {
      const br = dayjs(dayStrings[0]).unix()
      const er = dayjs(dayStrings[1]).unix()
      const data = tableData.filter((i) => {
        const bri = dayjs(i.startTimeStamp).unix()
        const eri = dayjs(i.endTimeStamp).unix()
        return bri >= br && eri <= er
      })
      setTableData(data)
    }

  };

  const handleOpenSearchWell = () => {
    if (popoverVisible) {
      setPopoverVisible(false);
    } else {
      setPopoverVisible(true);
    }

  };
  const handleOpenSearchData = () => {
    setSearchDataVisible(true)
  }
  const fetchWellById = async () => {
    fetch(queryGetParams(`${oldBaseUrl}/api/getBaseData`, {
      pageNo: 1,
      wellName: sampleValue,
      pageSize: 500
    }), {
      method: "POST",
    })
      .then(res => res.json())
      .then(res => {
        const data = (res.list || []).map(i => {
          i.label = i.factoryName + '-' + i.stationName + '-' + i.wellName + "-" + i.workZoneName;
          i.value = JSON.stringify(i)
          return i
        })
        setAutoCompleteOptions(data)
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
    if (status === 'done') {
      // console.log(response)
      const data = (response?.data || []).map((i) => {
        i.algorithmType = null;
        return i
      })
      setTableData(data)
      setCopyTableData(data)
    }
    if (status === 'error') {
      message.error('上传失败');
    }
  }

  /** 根据算法类型筛选 */
  const handleSelectByALG = (arr) => {
    if (arr.toString().includes("3")) {
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (item.toString().includes("3")) {
          setTypes(item)
          break
        }
      }
    } else {
      setTypes(arr[0])
    }
  }

  /** 批量选择Select获取焦点获取厂的数据 */
  const handleFocusSelect = () => {
    fetch('src/mock/all.json').then(res => res.json()).then(res => {
      const data = (res.data || []).map(i => {
        i.title = i.orgName
        i.value = i.key = i.orgId
        return i
      })
      return data
    }).then((v) => {
      fetch("src/mock/well.json")
        .then((res) => res.json())
        .then((res) => {
          const { list } = res;
          setAllSelect(arrayToTreeFlat([...list, ...v]))
        });
    })
  }

  /** 批量选择的orgID */
  const handleAllSelectChange = (value) => {
    const list = value.map(item => {
      const obj = JSON.parse(item)
      return {
        endTimeStamp: sbTime[0],
        startTimeStamp: sbTime[1],
        wellId: obj.wellId,
        wellName: obj.wellName,
        factoryName: obj.factoryName,
        workZoneName: obj.workZoneName,
        stationName: obj.stationName,
      }
    })
    setTableData([...tableData, ...list])
  }

  /** 删除TableData中的某一项 */
  const handleDeleteTableItem = (index) => {
    const data = tableData.filter((i, idx) => {
      return idx != index
    })
    setTableData(data)
    setCopyTableData(data)
  }

  /** 设置搜索框值 */
  const handleSetSampleValue = (data) => {
    setSampleValue(data)
  }

  /** 将搜索到的值添加到tableData中 */
  const handlePushData = (data) => {
    const newData = JSON.parse(data);
    if (sbTime.length) {
      newData.startTimeStamp = sbTime[0]
      newData.endTimeStamp = sbTime[1]
    }
    const newTable = [...tableData, newData]
    setTableData(newTable)
    setCopyTableData(newTable)
    setPopoverVisible(false)
  }

  /** 清空参数添加样本input */
  const resetSearchInputValue = () => {
    setSampleValue('')
    // setPopoverVisible(false)
    setAutoCompleteOptions([])
  }

  /** 分析input事件改变 */
  const handleAnalysesValueChange = (e) => {
    setAnalysesValue(e.target.value)
  }
  useEffect(() => {
    setTotal(tableData?.length || 0)
  }, [tableData])

  useEffect(() => {
    resetSearchInputValue()
  }, [popoverVisible])

  useEffect(() => {
    if (analysesValue && disableAnalysesBtn) {
      setDisableAnalysesBtn(false)
    }
  }, [analysesValue])

  const SearchNode = (
    <AutoComplete
      value={sampleValue}
      options={autoCompleteOptions}
      style={{ width: 200 }}
      onSelect={handlePushData}
      onSearch={handleSetSampleValue}
    >
      <Search
        placeholder="输入井号"
        onSearch={fetchWellById}
        style={{ width: 200 }}
        enterButton
      />
    </AutoComplete>

  );
  return (
    <div className="c-sample">
      <FuncDescModal explainModalVisible={explainModalVisible} handleCloseExplainModal={handleCloseExplainModal} />
      <SearchResModal analyzeModalVisible={analyzeModalVisible} handleCloseAnalyzeModal={handleCloseAnalyzeModal}></SearchResModal>
      <div className="c-sample-header">
        <div className="c-sample-header-icon">
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
            <TreeSelect
              style={{ width: 220 }}
              onFocus={handleFocusSelect}
              treeData={allSelect}
              treeCheckable
              onChange={handleAllSelectChange}
            />
          </div>
          <div className="c-sample-header-input-time">
            <span className="c-sample-header-input-text">默认起止时间</span>
            <RangePicker onChange={handleRangeTimeChange} />
          </div>
          <div className="c-sample-header-input-select">
            <span className="c-sample-header-input-text">算法类型</span>
            <Cascader
              options={ALGS}
              onChange={handleSelectByALG}
              multiple
              value={types}
            />
          </div>
        </div>
        <div className="c-sample-header-btn">
          <Upload name="file" action={`${baseUrl}/api/commons/upload`} onChange={handleImportExcel} showUploadList={false}>
            <Button type="primary">导入</Button>
          </Upload>
          <Button type="primary" onClick={handleDownloadExcelSample} className={"c-sample-header-btn-download"}>下载模板</Button>
          <Input.Group compact>
            <Input placeholder="输入分析名字" style={{ width: '150px' }} value={analysesValue} onChange={handleAnalysesValueChange} />
            <Button type="primary" onClick={handleOpenAnalyzeModal} disabled={disableAnalysesBtn}>
              开始分析
            </Button>
          </Input.Group>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{
          defaultPageSize: 9,
          total: total,
          showSizeChanger: false
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
