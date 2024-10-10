function createUserList() {
  return {
    status: 0,
    data: [
      {
        token: "Admin Token",
        _id: "641280fdc5ff3cb994002003",
        username: "test1",
        name: "测试用户",
        password: "123456",
        phone: "131112345678",
        role_id: "640ec59a9f6e3402f8edd4ec",
        create_time: 1678934269969,
        __v: 0, //版本，，
        role: {
          _id: "640ec59a9f6e3402f8edd4ec",
          name: "管理员",
          menus: [
            "/home",
            "/user",
            "/role",
            "/school",
            "/majors",
            "/student",
            "/class",
          ],
          create_time: 1678689690752,
          __v: 0,
          auth_time: 1678952409061,
          auth_name: "test1",
        },
      },
      {
        token: "System Token",
        _id: "64098cc6984047a6c854b303",
        username: "admin",
        password: "admin",
        create_time: 1678347462193,
        __v: 0,
        role: {
          menus: [],
        },
      },
    ],
  };
}
export default [
  // 获取登陆接口
  {
    url: "/mock/login",
    // 请求方式
    method: "post",
    // 调用response函数把用户信息给我
    response: ({ body }) => {
      const { username, password } = body;
      // 看看用户有没有
      const checkUser = createUserList().data.find(
        (item) => item.username === username && item.password === password
      );
      // 没有用户
      if (!checkUser) {
        return { status: 1, msg: "用户名或密码错误" };
      }
      // 有把他放到token中最终返回一个对象
      const { token } = checkUser;
      return {
        status: 0,
        // 数据来自于token
        data: { token },
      };
    },
  },
  // 获取用户信息接口
  {
    // 地址
    url: "/mock/user/info",
    // 方式
    method: "get",
    response: (request) => {
      const token = request.headers.token;
      const checkUser = createUserList().data.find(
        // 如果找到了就是代表用户有信息
        (item) => item.token === token
      );
      // 没有就返回这个
      if (!checkUser) {
        return { status: 1, data: { message: "获取用户信息失败" } };
      }
      return { status: 0, data: { ...checkUser } };
    },
  },
];
