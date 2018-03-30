var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect(process.env.database, {
    useMongoClient: true
}, (err) => {
    if (err) return console.log("Erro ao conectar no database!");
    console.log("Conectado ao BANCO DE DADOS!");
})

var Guild = new Schema({
    _id: {
        type: String
    },
    welcome: {
        type: Boolean,
        default: false
    },
    welcomechannel: {
        type: String,
        default: "Nenhum"
    },
    welcomemsg: {
        type: String,
        default: "Nenhuma"
    },
    byebye: {
        type: Boolean,
        default: false
    },
    byebyechannel: {
        type: String,
        default: "Nenhum"
    },
    byebyemsg: {
        type: String,
        default: "Nenhuma"
    }
})

var Guilds = mongoose.model("Guilds", Guild);
exports.Guilds = Guilds