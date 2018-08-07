import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal, Checkbox, Button } from 'antd';

const CheckboxGroup = Checkbox.Group;

class ColumnsModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      defaultCheckedList: [...props.columns].filter(item => item.checked).map(item => item.dataIndex),
    };
  }

  handleChange = checkedList => {
    this.setState({ defaultCheckedList: [...checkedList] });
  };

  handleAllChecked = event => {
    if (event.target.checked) {
      const { columns } = this.props;
      this.setState({ defaultCheckedList: [...columns].map(item => item.dataIndex) });
    } else {
      this.setState({ defaultCheckedList: [] });
    }
  };

  handleOK = () => {
    const { onOK, columns } = this.props;
    const { defaultCheckedList } = this.state;
    let updatedColumns = [...columns].map(column => {
      let checked = defaultCheckedList.indexOf(column.dataIndex) > -1;
      return { ...column, ...{ checked } };
    });
    onOK(updatedColumns);
  };

  render() {
    const { columns, onCancel, onOK, ...modalProps } = this.props;
    const { defaultCheckedList } = this.state;
    return (
      <Modal
        footer={
          <Fragment>
            <Checkbox
              style={{ float: 'left' }}
              checked={defaultCheckedList.length === columns.length}
              onChange={this.handleAllChecked}
            >
              全选
            </Checkbox>
            <Button onClick={onCancel}>取消</Button>
            <Button type="primary" onClick={this.handleOK}>
              确定
            </Button>
          </Fragment>
        }
        onCancel={onCancel}
        {...modalProps}
      >
        <CheckboxGroup onChange={this.handleChange} value={defaultCheckedList}>
          <Row gutter={16}>
            {columns.map(({ dataIndex, title, checked }) => {
              return (
                <Col key={dataIndex} span={4}>
                  <Checkbox value={dataIndex}>{title}</Checkbox>
                </Col>
              );
            })}
          </Row>
        </CheckboxGroup>
      </Modal>
    );
  }
}

ColumnsModal.propTypes = {
  columns: PropTypes.array.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOK: PropTypes.func.isRequired,
};

export default ColumnsModal;
