import { Modal, Progress, Button } from "antd"

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
    </Modal>
}

export default SearchResModal