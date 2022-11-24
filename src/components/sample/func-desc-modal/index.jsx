import { Modal, Button } from "antd"

const FuncDescModal = (props) => {
    const { explainModalVisible, handleCloseExplainModal } = props
    return <Modal
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
}

export default FuncDescModal