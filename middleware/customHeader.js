const customHeader = (req, res, next) => {
    try {
        const api_key = req.headers.api_key;
        if (api_key === 'shonny-01') {
            next();
        } else {
            res.status(403);
            res.send({
                error: "API KEY NO ES CORRECTA"
            });
        }
    } catch (error) {
        res.status(403);
        res.send({
            error: "ALGO MALO OCURRIO EN EL CUSTOM HEADER"
        });
    }
};

module.exports = customHeader;