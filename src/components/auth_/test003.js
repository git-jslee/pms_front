import { message, Button } from 'antd';

const info = () => {
  message.info('This is a normal message');
};

ReactDOM.render(
  <Button type="primary" onClick={info}>
    Display normal message
  </Button>,
  mountNode,
);