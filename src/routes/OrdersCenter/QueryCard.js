import React, { Fragment } from 'react';
import { Card, Form, Row, Col, Input, DatePicker, Select, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import { PLANE } from './Constants';
import styles from './QueryCard.less'; // eslint-disable-line

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

const colResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 6,
  xl: 6,
};

/* const middleColResponsiveProps = {
  sm: 24,
  md: 12,
  lg: 8,
  xl: { span: 6, offset: 2 },
};

const rightColResponsiveProps = {
  sm: 24,
  md: 24,
  lg: 10,
  xl: { span: 8, offset: 2 },
}; */

const QueryCard = ({
  type = PLANE,
  searchTypes,
  form,
  onSearch,
  onFormReset,
  isSearchCardExpand = true,
  onExpand,
  onShrink,
  ...cardProps
}) => {
  const { getFieldDecorator, resetFields, validateFieldsAndScroll } = form;

  const handleFormReset = () => {
    resetFields();
    onFormReset();
  };

  const handleSubmit = event => {
    event.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSearch(values);
      }
    });
  };

  return (
    <Card className={styles.queryCard}>
      <Form layout="vertical" onSubmit={handleSubmit} hideRequiredMark>
        {isSearchCardExpand ? (
          <Fragment>
            <Row gutter={16} type='flex' align='bottom'>
              {searchTypes.map((searchType) => {
                const { key, type, label, defaultValue, options } = searchType;
                switch (type) {
                  case 'RangePicker':
                    return (
                      <Col {...colResponsiveProps} key={key}>
                        <FormItem label={label}>
                          {getFieldDecorator(key, {
                            initialValue: defaultValue,
                          })(
                            <RangePicker placeholder={['开始日期', '结束日期']} />
                          )}
                        </FormItem>
                      </Col>
                    );
                  case 'Input':
                  return (
                      <Col {...colResponsiveProps} key={key}>
                        <FormItem label={label}>
                          {getFieldDecorator(key)(
                            <Input placeholder={`请输入${label}`} />
                          )}
                        </FormItem>
                      </Col>
                    );
                  case 'Select':
                  return (
                      <Col {...colResponsiveProps} key={key}>
                        <FormItem label={label}>
                          {getFieldDecorator(key, {
                            initialValue: '0'
                          })(
                            <Select>
                              <Option value="0">全部</Option>
                              {
                                options.map(({value, label}) => <Option key={value} value={value}>{label}</Option>)
                              }
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                    );
                  default:
                    return null;
                }
              })}
              <Col {...colResponsiveProps}>
                <FormItem>
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={handleFormReset}>
                    清空筛选条件
                  </Button>
                  <a style={{ marginLeft: 8 }} onClick={onShrink}>
                    收起查询条件 <Icon type="up" />
                  </a>
                </FormItem>
              </Col>
            </Row>
          </Fragment>
        ) : (
          <Row>
            <Col {...colResponsiveProps}>
              <a onClick={onExpand}>
                展开查询条件 <Icon type="down" />
              </a>
            </Col>
          </Row>
        )}
      </Form>
    </Card>
  );
};

QueryCard.propTypes = {
  type: PropTypes.string.isRequired,
  searchTypes: PropTypes.array.isRequired,
  isSearchCardExpand: PropTypes.bool,
  onFormReset: PropTypes.func,
  onSearch: PropTypes.func,
  onExpand: PropTypes.func,
  onShrink: PropTypes.func,
};

export default Form.create()(QueryCard);
