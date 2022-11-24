import { Modal, Table, columns } from "antd"

const SearchResModal = (props) => {
    const { analyzeModalVisible, handleCloseAnalyzeModal } = props
    return <Modal
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
}

export default SearchResModal