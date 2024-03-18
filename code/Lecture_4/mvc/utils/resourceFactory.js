
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
                message: "user created",
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



module.exports={createFactory};

// const createUser = 

