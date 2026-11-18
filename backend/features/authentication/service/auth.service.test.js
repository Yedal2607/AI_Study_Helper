
import { describe, it, expect, vi, beforeEach } from "vitest";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

import { registerUser, loginUser } from "./auth.service.js";

vi.mock("bcrypt", () => ({
    default: {
        hash: vi.fn(),
        compare: vi.fn()
    }
}));

vi.mock("jsonwebtoken", () => ({
    default: {
        sign: vi.fn()
    }
}));

vi.mock("../models/user.model.js", () => ({
    default: {
        findOne: vi.fn(),
        create: vi.fn()
    }
}));

describe("registerUser", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should register a user successfully", async () => {


        User.findOne.mockResolvedValue(null);

        bcrypt.hash.mockResolvedValue("password-cifrada");

        User.create.mockResolvedValue({
            _id: "user-123",
            fullName: "Carlos",
            email: "carlos@gmail.com",
            password: "password-cifrada"
        });


        const result = await registerUser(
            "Carlos",
            "carlos@gmail.com",
            "MiPassword123"
        );


        expect(User.findOne).toHaveBeenCalledWith({
            email: "carlos@gmail.com"
        });

        expect(bcrypt.hash).toHaveBeenCalledWith(
            "MiPassword123",
            10
        );

        expect(User.create).toHaveBeenCalledWith({
            fullName: "Carlos",
            email: "carlos@gmail.com",
            password: "password-cifrada"
        });

        expect(result).toEqual({
            id: "user-123",
            fullName: "Carlos",
            email: "carlos@gmail.com"
        });

        expect(result).not.toHaveProperty("password");
    });

    it("should reject registration when email already exists", async () => {


        User.findOne.mockResolvedValue({
            _id: "existing-user",
            email: "carlos@gmail.com"
        });


        await expect(
            registerUser(
                "Carlos",
                "carlos@gmail.com",
                "MiPassword123"
            )
        ).rejects.toThrow("Email already registered");


        expect(bcrypt.hash).not.toHaveBeenCalled();

        expect(User.create).not.toHaveBeenCalled();
    });

    it("should not create a user if password hashing fails", async () => {


        User.findOne.mockResolvedValue(null);

        bcrypt.hash.mockRejectedValue(
            new Error("Hashing failed")
        );


        await expect(
            registerUser(
                "Carlos",
                "carlos@gmail.com",
                "MiPassword123"
            )
        ).rejects.toThrow("Hashing failed");

        expect(User.create).not.toHaveBeenCalled();
    });

});

describe("loginUser", () => {

    beforeEach(() => {
        vi.clearAllMocks();
        process.env.JWT_SECRET = "test-secret";
    });

    it("should log in a user when the password matches the stored hash", async () => {
        const storedUser = {
            _id: "user-123",
            fullName: "Carlos",
            email: "carlos@gmail.com",
            password: "stored-password-hash"
        };

        User.findOne.mockResolvedValue(storedUser);
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue("signed-token");

        const result = await loginUser("carlos@gmail.com", "MiPassword123");

        expect(User.findOne).toHaveBeenCalledWith({ email: "carlos@gmail.com" });
        expect(bcrypt.compare).toHaveBeenCalledWith(
            "MiPassword123",
            "stored-password-hash"
        );
        expect(jwt.sign).toHaveBeenCalledWith(
            { userId: "user-123" },
            "test-secret",
            { expiresIn: "7d" }
        );
        expect(result).toEqual({
            token: "signed-token",
            user: {
                id: "user-123",
                fullName: "Carlos",
                email: "carlos@gmail.com"
            }
        });
        expect(result.user).not.toHaveProperty("password");
    });

    it("should reject login when no user exists for the email", async () => {
        User.findOne.mockResolvedValue(null);

        await expect(
            loginUser("unknown@gmail.com", "MiPassword123")
        ).rejects.toThrow("Invalid email or password");

        expect(bcrypt.compare).not.toHaveBeenCalled();
        expect(jwt.sign).not.toHaveBeenCalled();
    });

    it("should reject login when the password does not match the stored hash", async () => {
        User.findOne.mockResolvedValue({
            _id: "user-123",
            password: "stored-password-hash"
        });
        bcrypt.compare.mockResolvedValue(false);

        await expect(
            loginUser("carlos@gmail.com", "incorrect-password")
        ).rejects.toThrow("Invalid email or password");

        expect(bcrypt.compare).toHaveBeenCalledWith(
            "incorrect-password",
            "stored-password-hash"
        );
        expect(jwt.sign).not.toHaveBeenCalled();
    });
});
