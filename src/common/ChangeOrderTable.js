import { Col, Row, Table } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { arrayMoveImmutable } from "array-move";
import * as PropTypes from "prop-types";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";

const SortableItem = SortableElement((props) => <tr {...props} />);
const SortableBody = SortableContainer((props) => <tbody {...props} />);

const ChangeOrderTable = ({
  column,
  data,
  setData,
  orderKey,
  customTitle,
  tableSize,
  isBorder
}) => {

  const DragHandle = SortableHandle(() => (
    <MenuOutlined
      style={{
        cursor: "grab",
        color: "#999",
      }}
    />
  ));

  const DraggableContainer = (props) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        data.slice(),
        oldIndex,
        newIndex
      ).filter((el) => !!el);
      newData.forEach((element, index) => element.formOrder = (index + 1));
      setData(newData);
    }
  };

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    const index = data?.findIndex((x) => x.formOrder === restProps["data-row-key"]);
    return <SortableItem index={index} {...restProps} />;
  };

  const [drawColumn, setDrawColumn] = useState();

  const defCol = {
    dataIndex: "sort",
    width: 50,
    className: "drag-visible",
    render: () => <DragHandle />,
  };
  React.useEffect(() => {
    column.unshift(defCol);
    setDrawColumn(column);
  }, [data])
  return (
    <Row>
      <Col span={24}>
        {
          drawColumn &&
          <Table
            rowKey={(row) => row.formOrder}
            dataSource={data}
            size={tableSize}
            bordered={isBorder}
            title={() => {
              return customTitle;
            }}
            columns={drawColumn}
            components={{
              body: {
                wrapper: DraggableContainer,
                row: DraggableBodyRow,
              },
            }}
          />
        }

      </Col>
    </Row >)
}
ChangeOrderTable.defaultProps = {
  column: [],
  tableSize: "small",
  isBorder: true,
}

ChangeOrderTable.propTypes = {
  column: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  orderKey: PropTypes.string.isRequired,
  customTitle: PropTypes.object,
  tableSize: PropTypes.string,
  isBorder: PropTypes.bool,
}
export default ChangeOrderTable;
