const errorHandling = (err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        status: 500,
        message: "something is wrong",
        error: err.message,
    })
}

export default errorHandling;