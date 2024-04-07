
const createFactory = function (ElementModel) {
    console.log("called factory function");
    return async (req, res) => {
        try {
            // id 
            const resourceDetails = req.body;
            const resource = await
                ElementModel.create(resourceDetails);
            console.log(req.body);
            res.status(201).json({
                message: "resource created",
                resource: resource
            })
        } catch (err) {
            res.status(500).json({
                status: "Internal server error",
                message: err.message
            })
        }

    }
}

const getAllFactory = function (ElementModel) {

    return async (req, res) => {
        try {

            const user = await ElementModel.find();
            // if user is present -> send the resp
            if (user.length != 0) {
                res.status(200).json({
                    message: user,
                })
                // if it's not there then send user not found 
            } else {
                res.status(404).json({
                    message: "did not get any user"
                })
            }
        } catch (err) {
            res.status(500).json({
                status: "Internal server error",
                message: err.message
            })
        }

    }
}

const updateFactory = function (ElementModel) {
    return async (req, res) => {
        try {
            /***
            * 1. you will need -> id 
            * 2. you have pass the keys that they want to update
            * **/
            const id = req.params.id;
            const toUpdateObject = req.body;

            const user = await ElementModel.findByIdAndUpdate(id, toUpdateObject, { new: true });

            console.log("Received patch request");
            res.json({
                status: "success",
                message: user
            })
        } catch (err) {
            res.status(500).json({
                status: "Internal server error",
                message: err.message
            })
        }

    }
}
const deleteFactory = function (ElementModel) {
    return async (req, res) => {
        try {
            let { id } = req.params;
            const user = await ElementModel.findByIdAndDelete(id);
            if (user === null) {
                res.status(404).json({
                    status: "sucess",
                    message: "user does not exist",

                })
            } else {
                res.status(200).json({
                    status: "sucess",
                    message: "user is deleted",
                    user: user
                })
            }


        } catch (err) {
            res.status(500).json({
                status: "Internal server error",
                message: err.message
            })
        }
    }
}

const getFactory = function (ElementModel) {
    return async (req, res) => {
        try {
            // template -> get the data from req.params
            const id = req.params.id;
            const element = await ElementModel.findById(id);
            // remove the password from the response if it is for user
            if (element.password) {
                element.password = undefined;
            }
            // if user is present -> send the resp
            if (element) {
                res.status(200).json({
                    message: element
                })
                // if it's not there then send user not found 
            } else {
                res.status(404).json({
                    message: "did not get the user"
                })
            }
        } catch (err) {
            res.status(500).json({
                status: "Internal server error",
                message: err.message
            })
        }

    }
}
module.exports = {
    createFactory,
    getAllFactory,
    updateFactory,
    deleteFactory,
    getFactory
};

// const createUser = 

