"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactInfo = exports.upsertContactInfo = exports.getContactInfo = void 0;
// src/services/contactInfo.service.ts
const ContactInfo_1 = __importDefault(require("../models/ContactInfo"));
// Get the existing contact info (singleton logic: always assume one document)
const getContactInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    let contactInfo = yield ContactInfo_1.default.findOne();
    if (!contactInfo) {
        contactInfo = new ContactInfo_1.default({
            socialMedia: [],
            phoneNumbers: [],
            emails: [],
            addresses: [],
        });
        yield contactInfo.save();
    }
    return contactInfo;
});
exports.getContactInfo = getContactInfo;
// Create or update contact info
const upsertContactInfo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let contactInfo = yield ContactInfo_1.default.findOne();
    if (contactInfo) {
        contactInfo.set(data);
    }
    else {
        contactInfo = new ContactInfo_1.default(data);
    }
    yield contactInfo.save();
    return contactInfo;
});
exports.upsertContactInfo = upsertContactInfo;
// Optional: Delete contact info (if needed)
const deleteContactInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    yield ContactInfo_1.default.deleteMany();
});
exports.deleteContactInfo = deleteContactInfo;
