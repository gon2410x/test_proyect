"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Event_1 = require("./Event");
let Booking = exports.Booking = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _id_decorators;
    let _id_initializers = [];
    let _event_decorators;
    let _event_initializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _precio_decorators;
    let _precio_initializers = [];
    let _fechaHora_decorators;
    let _fechaHora_initializers = [];
    let _lugar_decorators;
    let _lugar_initializers = [];
    let _gps_decorators;
    let _gps_initializers = [];
    var Booking = _classThis = class extends typeorm_1.BaseEntity {
        constructor() {
            super(...arguments);
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.event = __runInitializers(this, _event_initializers, void 0);
            this.user = __runInitializers(this, _user_initializers, void 0);
            this.precio = __runInitializers(this, _precio_initializers, void 0);
            this.fechaHora = __runInitializers(this, _fechaHora_initializers, void 0);
            this.lugar = __runInitializers(this, _lugar_initializers, void 0);
            this.gps = __runInitializers(this, _gps_initializers, void 0);
        }
    };
    __setFunctionName(_classThis, "Booking");
    (() => {
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _event_decorators = [(0, typeorm_1.ManyToOne)(() => Event_1.Event, (event) => event.booking)];
        _user_decorators = [(0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.booking)];
        _precio_decorators = [(0, typeorm_1.Column)()];
        _fechaHora_decorators = [(0, typeorm_1.Column)()];
        _lugar_decorators = [(0, typeorm_1.Column)()];
        _gps_decorators = [(0, typeorm_1.Column)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } } }, _id_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _event_decorators, { kind: "field", name: "event", static: false, private: false, access: { has: obj => "event" in obj, get: obj => obj.event, set: (obj, value) => { obj.event = value; } } }, _event_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } } }, _user_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _precio_decorators, { kind: "field", name: "precio", static: false, private: false, access: { has: obj => "precio" in obj, get: obj => obj.precio, set: (obj, value) => { obj.precio = value; } } }, _precio_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _fechaHora_decorators, { kind: "field", name: "fechaHora", static: false, private: false, access: { has: obj => "fechaHora" in obj, get: obj => obj.fechaHora, set: (obj, value) => { obj.fechaHora = value; } } }, _fechaHora_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _lugar_decorators, { kind: "field", name: "lugar", static: false, private: false, access: { has: obj => "lugar" in obj, get: obj => obj.lugar, set: (obj, value) => { obj.lugar = value; } } }, _lugar_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _gps_decorators, { kind: "field", name: "gps", static: false, private: false, access: { has: obj => "gps" in obj, get: obj => obj.gps, set: (obj, value) => { obj.gps = value; } } }, _gps_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        Booking = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Booking = _classThis;
})();
