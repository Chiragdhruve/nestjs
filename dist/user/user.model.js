"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true, format: 'email' },
    password: { type: String, required: true },
    isActive: { type: Number, required: true },
    date: { type: String }
}, {
    versionKey: false,
    strict: false
});
//# sourceMappingURL=user.model.js.map