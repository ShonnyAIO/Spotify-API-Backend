const mongoose = require("mongoose");

const NODE_ENV = process.env.NODE_ENV;

const dbConnect = () => {
    const URI_DBI = (NODE_ENV === 'test') ? process.env.URI_DBI_TEST : process.env.URI_DBI;
    mongoose.connect(URI_DBI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err, res) => {
        if (!err) {
            console.log('#### Conexion Correcta ####');
        } else {
            console.log('#### Error de Conexion ####');
        }
    })
}

module.exports = dbConnect;

// "mongodb+srv://shonnyaio:5772359s85@cluster0.icxlc.mongodb.net/?retryWrites=true&w=majority";