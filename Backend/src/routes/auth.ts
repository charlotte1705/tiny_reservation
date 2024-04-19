import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import Admin from "../models/admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";
import { OAuth2Client } from "google-auth-library";

const router = express.Router();

router.post(
  "/admin",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        { adminId: admin.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      res.status(200).json({ adminId: admin._id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.post("/login/google", async (req: Request, res: Response) => {
  const { tokenId } = req.body;
  console.log("🚀 ~ router.post ~ req.body:", req);
  const idToken = tokenId;
  const googleClient = new OAuth2Client(
    "418140660178-4llvtgne2b4tqimo2op4of2bjf2ddq37.apps.googleusercontent.com"
  );
  try {
    // const ticket = await googleClient.verifyIdToken({
    //   idToken: tokenId,
    //   audience: '418140660178-4llvtgne2b4tqimo2op4of2bjf2ddq37.apps.googleusercontent.com',
    // });
    const options = {
      idToken: idToken,
      audience:
        "418140660178-4llvtgne2b4tqimo2op4of2bjf2ddq37.apps.googleusercontent.com",
    };
    const ticket = await googleClient.verifyIdToken(options);

    console.log(ticket);

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res.status(400).json({ message: "Invalid Google token payload" });
    }

    const { email } = payload;
    let user = await User.findOne({ email });

    if (!user) {
      // You may handle user creation here if it doesn't exist
      return res.status(400).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    res.status(200).json({ userId: user._id });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Google login failed" });
  }
});

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get(
  "/validate-token",
  verifyToken,
  async (req: Request, res: Response) => {
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).send({ role: user.role });
  }
);

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});



// // Route to verify the user's email
// router.get('/verify', async (req, res) => {
//   try {
//     const user = await User.findOne({ verificationToken: req.query.token });

//     if (!user) {
//       return res.status(400).send('Invalid verification token');
//     }

//     user.verified = true;
//     await User.updateOne({ _id: user._id }, { $unset: { verificationToken: 1 }, $set: { verified: true } });

//     await user.save();

//     res.send('Email verified successfully');
//   } catch (error) {
//     res.status(500).send('Server error');
//   }
// });
export default router;
