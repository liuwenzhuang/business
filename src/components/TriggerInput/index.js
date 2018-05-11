import React, { Component } from 'react';
import { Input, Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';

import styles from './index.less';

class TriggerInput extends Component {
  state = {
    value: '',
    editable: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== undefined) {
      this.setState({ editable: nextProps.editable });
    }
  }

  handleChange = e => {
    const value = e.target.value;
    this.setState({ value });
  };

  edit = () => {
    this.setState({ editable: true });
  };

  handleCancel = () => {
    const { defaultValue } = this.props;
    this.setState({
      editable: false,
      value: defaultValue,
    });
  };

  handleConfirm = () => {
    const { onConfirm } = this.props;
    const { value } = this.state;
    if (onConfirm) onConfirm(value);
  };

  render() {
    const { editable } = this.state;
    const { buttonText, defaultValue } = this.props;
    return (
      <div className={styles['editable-cell']}>
        {editable ? (
          <div className={styles['editable-cell-input-wrapper']}>
            <Row gutter={{ md: 8, lg: 24 }}>
              <Col md={8} sm={24}>
                <Input defaultValue={defaultValue} onChange={this.handleChange} />
              </Col>
              <Col md={8} sm={24}>
                <Button type="primary" onClick={this.handleCancel}>
                  取消
                </Button>
                <Button type="primary" onClick={this.handleConfirm}>
                  确定
                </Button>
              </Col>
            </Row>
          </div>
        ) : (
          <div className={styles['editable-cell-text-wrapper']}>
            <span style={{ marginRight: '16px' }}>{defaultValue || ''}</span>
            <Button type="primary" onClick={this.edit}>
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

TriggerInput.propTypes = {
  editable: PropTypes.bool.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default TriggerInput;
