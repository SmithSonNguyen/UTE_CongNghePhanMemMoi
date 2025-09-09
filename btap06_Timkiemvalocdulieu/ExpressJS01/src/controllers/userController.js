import {
  createUserService,
  loginService,
  getUserService,
} from "../services/userService.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const data = await createUserService(name, email, password);
  return res.status(200).json(data);
};

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const data = await loginService(email, password);
  return res.status(200).json(data);
};

export const getUser = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const data = await getUserService(page, limit);

    if (data === null) {
      return res.status(500).json({
        EC: -1,
        EM: "Lỗi server khi lấy danh sách user",
      });
    }

    return res.status(200).json({
      EC: 0,
      EM: "Lấy danh sách user thành công",
      DT: data,
    });
  } catch (error) {
    console.log("Error in getUser controller:", error);
    return res.status(500).json({
      EC: -1,
      EM: "Lỗi server khi lấy danh sách user",
    });
  }
};

export const getAccount = async (req, res) => {
  return res.status(200).json(req.user);
};
