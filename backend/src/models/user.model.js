import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {
    AvailableSocialLogins,
    AvailableUserRoles,
    USER_TEMPORARY_TOKEN_EXPIRY,
    UserLoginType,
    UserRolesEnum,
} from "../constants.js";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: [true, 'fullname is required'],
            trim: true,
            index: true
        },
        avatar: {
            type: {
                url: String,
                localPath: String,
            },
            default: {
                url: `https://via.placeholder.com/200x200.png`,
                localPath: "",
            },
        },
        role: {
            type: String,
            enum: AvailableUserRoles,
            default: UserRolesEnum.STUDENT,
            required: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        loginType: {
            type: String,
            enum: AvailableSocialLogins,
            default: UserLoginType.EMAIL_PASSWORD,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
        },
        forgotPasswordToken: {
            type: String,
        },
        forgotPasswordExpiry: {
            type: Date,
        },
        emailVerificationToken: {
            type: String,
        },
        emailVerificationExpiry: {
            type: Date,
        },
    },
    {
        timestamps: true
    }
)

// Hash the password before saving the user model
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 10)
    return next()
})

// Compare the password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate JWT token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

// Generate refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

userSchema.methods.generateTemporaryToken = function () {
    const unHashedToken = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex");

    // This is the expiry time for the token (20 minutes)
    const tokenExpiry = Date.now() + USER_TEMPORARY_TOKEN_EXPIRY;

    return { unHashedToken, hashedToken, tokenExpiry };
};

export const User = model('User', userSchema)