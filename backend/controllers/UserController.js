const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};
const registerUser = async (req, res) => {
  try {
    const { user_name, email, password } = req.body;

    let userObtained = await userModel.findOne({ email });

    if (userObtained)
      return res
        .status(400)
        .json("El Nombre de usuario o el correo ya esta registrado...");

    if (!user_name || !email || !password)
      return res.status(400).json("Todos los campos son requeridos...");

    if (!validator.isEmail(email))
      return res.status(400).json("Correo debe ser un correo valido...");

    if (!validator.isStrongPassword(password))
      return res
        .status(400)
        .json(
          "La contraseña debe tener al menos una minuscula, una mayuscula, un número y un caracter especial..."
        );

    userObtained = new userModel({ user_name, email, password });

    const salt = await bcrypt.genSalt(10);
    userObtained.password = await bcrypt.hash(userObtained.password, salt);

    await userObtained.save();

    const token = createToken(userObtained._id);

    res.status(200).json({ _id: userObtained._id, user_name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let userObtained = await userModel.findOne({ email });

    if (!userObtained)
      return res.status(400).json("Correo o Contraseña incorrectos...");

    const isValidPassword = await bcrypt.compare(
      password,
      userObtained.password
    );

    if (!isValidPassword)
      return res.status(400).json("Correo o Contraseña incorrectos...");
    
    const token = createToken(userObtained._id);

    res.status(200).json({ _id: userObtained._id, user_name: userObtained.user_name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUser = async (req,res) =>{
  const userId = req.params.userId;
  try{
    const user = await userModel.findById({userId})

    res.status(200).json(user);
  }catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
module.exports = { registerUser, loginUser, findUser };
