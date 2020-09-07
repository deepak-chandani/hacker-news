import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  }
}

const Loading = (props) => {
  const [content, setContent] = React.useState(props.text);

  React.useEffect(() => {
    const {speed, text} = props;

    const interval = setInterval(() => {
        setContent(c => c === (text + "...") ? text : c+".")
    }, speed);

    return () => clearInterval(interval);
  }, []);

  return (
    <p style={styles.content}>
      {content}
    </p>
  )
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}

export default Loading;
