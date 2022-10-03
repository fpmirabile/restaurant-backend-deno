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
exports.getUserById = exports.deleteUser = exports.register = exports.loginSSO = exports.login = void 0;
const typeorm_1 = require("typeorm");
const Models_1 = require("../../model/Models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const InvalidCredentialsError_1 = require("../../error/user/InvalidCredentialsError");
const JwtService_1 = require("../jwt/JwtService");
const user_builder_1 = require("../../model/builder/user.builder");
const DifferentPasswordsError_1 = require("../../error/user/DifferentPasswordsError");
const UserExistsError_1 = require("../../error/user/UserExistsError");
const UserDTO_1 = require("../../dto/user/UserDTO");
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    let userRepository = (0, typeorm_1.getRepository)(Models_1.User);
    const user = yield userRepository.findOne({ email: email });
    if (!user) {
        throw new InvalidCredentialsError_1.InvalidCredentialsError();
    }
    if (!(yield bcryptjs_1.default.compare(password, user.password))) {
        throw new InvalidCredentialsError_1.InvalidCredentialsError();
    }
    let signObject = {
        userId: user.userId,
        name: user.name,
        status: user.status,
        identifier: user.identifier,
        photo: user.photo,
        role: user.role
    };
    return yield JwtService_1.jwtService.createJWT(signObject);
});
exports.login = login;
const loginSSO = (email, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    let userRepository = (0, typeorm_1.getRepository)(Models_1.User);
    //todo VALIDACION CONTRA GOOGLE
    const user = yield getOrCreateLoggedClient(email, identifier);
    let signObject = {
        userId: user.userId,
        name: user.name,
        status: user.status,
        identifier: user.identifier,
        photo: user.photo,
        role: user.role
    };
    return yield JwtService_1.jwtService.createJWT(signObject);
});
exports.loginSSO = loginSSO;
const register = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let userRepository = (0, typeorm_1.getRepository)(Models_1.User);
    if (user.password != user.confirmPassword) {
        throw new DifferentPasswordsError_1.DifferentPasswordsError();
    }
    let userBD = yield userRepository.findOne({ email: user.email, role: "PARTNER" });
    if (userBD) {
        if (userBD.status === "OPERATIVO") {
            throw new UserExistsError_1.UserExistsError();
        }
        else {
            yield userRepository.update({ userId: userBD.userId }, { status: "OPERATIVO" });
        }
    }
    else {
        const newUser = new user_builder_1.UserBuilder()
            .withNewUser(user)
            .withRole("PARTNER")
            .withStatus("OPERATIVO")
            .withPassword(bcryptjs_1.default.hashSync(user.password, 8))
            .build();
        yield userRepository.save(newUser);
    }
});
exports.register = register;
const getOrCreateLoggedClient = (email, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    let userRepository = (0, typeorm_1.getRepository)(Models_1.User);
    let loggedClient = yield userRepository.findOne({ email: email, role: "CLIENT", status: "OPERATIVO" });
    if (!loggedClient) {
        loggedClient = new user_builder_1.UserBuilder()
            .withEmail(email)
            .withIdentifier(identifier)
            .withRole("CLIENT")
            .build();
        yield userRepository.save(loggedClient);
    }
    else {
        if (loggedClient.status != "OPERATIVO") {
            yield userRepository.update({ userId: loggedClient.userId }, { status: "OPERATIVO" });
        }
    }
    return loggedClient;
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let userRepository = (0, typeorm_1.getRepository)(Models_1.User);
    yield userRepository.update({ userId: userId }, { status: "ELIMINADO" });
});
exports.deleteUser = deleteUser;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let userRepository = (0, typeorm_1.getRepository)(Models_1.User);
    const user = yield userRepository.findOne({ userId: userId });
    if (!user) {
        throw new InvalidCredentialsError_1.InvalidCredentialsError();
    }
    return new UserDTO_1.UserDTO(user.userId, user.name, user.email, user.status, user.role);
});
exports.getUserById = getUserById;
//# sourceMappingURL=user.service.js.map