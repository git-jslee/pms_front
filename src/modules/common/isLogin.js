const isLogin = () => !!sessionStorage.getItem('user');

export default isLogin;
