var todoModel=require("./productivityModel");


module.exports.addTaskDBService = async (taskDetails) => {
    //
    try{var todoModelData = new todoModel();
       
        todoModelData.username = taskDetails.username;
        todoModelData.category=taskDetails.category;
        todoModelData.data=taskDetails.data;
        const savedData = await todoModelData.save();
        return savedData; 
    } catch (err) {
        throw err; 
    }
}

module.exports.getTasksByUsername = async (username) => {
    try {
        const tasks = await todoModel.find({ username }, { data: 1, _id: 0 }); // Exclude _id, include only task
        return tasks;
    } catch (err) {
        throw err;
    }
};
