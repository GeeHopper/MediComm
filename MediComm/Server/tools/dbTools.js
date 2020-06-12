
module.exports = {
    callbackFunction: function (result, message = ""){
        if(message !== "")
            console.log(message+": " + result);
    },

    //example: readData(collUser, {name:"Mustermann"});
    readData: function (collection, query = {}, callback = callbackFunction)
    {
        collection.find(query).toArray(function(error, result){
            if(error)
                throw error;
            else
                callback(result, "found "+result.length+" results");
        });
    },

    //example: createData(collUser, [{vorname:"Steven"}, name:"Geiger"}, {vorname:"Max"}, name:"Mustermann"}]);
    createData: function (collection, data, callback = this.callbackFunction){
        if(!Array.isArray(data))
        {
            collection.insertOne(data, function(error, result){
                if(error)
                    throw error;
                else
                    callback(result, "data inserted");
            });
        }
        else
        {
            collection.insertMany(data, function(error, result){
                if(error)
                    throw error;
                else
                    callback(result, data.length+" data inserted");
            });
        }
    },

    //example: updateData(collUser, {name:"Mustermann"}, {$set: {vorname:"Tim"}});
    updateData: function (collection, query = {}, values = {},
        callback = callbackFunction){
            collection.updateMany(query, values, function(error, result){
                if(error)
                    throw error;
                else
                    callbackFunction("", result.result.nModified+" dataset(s) updated");
            });
    },
    

    //example: deleteData(collUser, {vorname:"Time"});
    deleteData: function (collection, query = {}, callback = callbackFunction)
    {
        collection.deleteMany(query, function(error, result){
            if(error)
                throw error;
            else
                callback("", result.result.n+" dataset(s) deleted");
        });
    }
    
};