import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Loader.less';

const Loader = ({ spinning, fullScreen, text = '加载中...' }) => {
  return (
    <div
      className={classNames(styles.loader, {
        [styles.hidden]: !spinning,
        [styles.fullScreen]: fullScreen,
      })}
    >
      <div className={styles.warpper}>
        <div className={styles.inner} />
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
};

Loader.propTypes = {
  spinning: PropTypes.bool,
  fullScreen: PropTypes.bool,
  text: PropTypes.string,
};

export default Loader;
