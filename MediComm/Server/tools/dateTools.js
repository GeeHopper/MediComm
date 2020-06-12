date = function() {
    var date = new Date();
    return date.getFullYear()+"-"
    +(date.getMonth()+1)+"-"
    +date.getDate();
}

exports.germanDate = function(){
    var date = new Date();
    return date.getDate()+"."
        +(date.getMonth+1)+"."
        +date.getFullYear();
}