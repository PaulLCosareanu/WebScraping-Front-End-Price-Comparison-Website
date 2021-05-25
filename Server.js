const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// ***************************************************************************************************************************************************
//The express module is a function. When it is executed it returns an app object
const app = express();
app.use(bodyParser.json());
// app.use(cookieParser());

//Create a connection pool with the user details
const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "finalscraper",
    debug: false

});

// **********************************************************************************************************************************************8
//Set up express to serve static files from the directory called 'public'
app.use(express.static("public"));
app.get("/all",loadAll);
app.post("/pagination",pagination)
app.post("/products",searchProducts)
app.get("/compare",compareProductsSelected)
// *******************************************************************************************************************************************************
// load all products

function loadAll(request,response){
    console.log("1")
    const page=request.query.page;
    const limit=request.query.limit;
    const startIndex=(page-1)*limit;
    const endIndex=limit;
    let sql="";
    if(page!=null && limit!=null){
        console.log("2")
    sql = "SELECT * FROM milk_comparison RIGHT JOIN milk ON milk.id=milk_comparison.milk_id LIMIT "+startIndex+","+endIndex;
    }else if(page==null&limit==null){
        console.log("3")
        sql = "SELECT * FROM milk_comparison RIGHT JOIN milk ON milk.id=milk_comparison.milk_id";
    }
    let obj;
  
    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
            // reject(err);
            console.log("4")
        }
        else {
            
            console.log("5")
            obj = JSON.stringify(result);
            // response.write(object);
            // resolve(result)
           obj= JSON.parse(obj);
            console.log(obj)
            obj.forEach(element => {
                console.log(element["price"])
                console.log(element["volume"])
                console.log(element["brand"])
            });
            response.send(obj);
           
           
        }
    });


}
// generate pagination for certain search words
function pagination(request,response){
    const page=request.query.page;
    const limit=request.query.limit;
    const startIndex=(page-1)*limit;
    const endIndex=limit;
    let splitStr=[];
    let searchQuery = request.body.searchString;
    splitStr = searchQuery.split(" ");
    console.log(splitStr)
    console.log(request.body.searchString)
    let sqlQuery="SELECT COUNT(milk_comparison.id) FROM milk_comparison RIGHT JOIN milk ON milk.id=milk_comparison.milk_id WHERE ";
    if(page!=null && limit!=null){
    for(let i=0;i<splitStr.length;i++){
        if(i!=splitStr.length-1){
            console.log("adding to the sql query")
            sqlQuery+="searchString LIKE '%"+splitStr[i]+"%' AND "
        }else{
            sqlQuery+="searchString LIKE '%"+splitStr[i]+"%' "
            console.log("last bit added to the search query")
        }
    }
    // sqlQuery+="LIMIT "+startIndex+","+endIndex;

}else if(page==null&limit==null){
    for(let i=0;i<splitStr.length;i++){
        if(i!=splitStr.length-1){
            sqlQuery+="searchString LIKE '%"+splitStr[i]+"%' AND "
        }else{
            sqlQuery+="searchString LIKE '%"+splitStr[i]+"%' "
        }
    }
}
    connectionPool.query(sqlQuery,(err,result)=>{
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
            response.send("error");
        }
        else {
            let obj=JSON.stringify(result);
            let array=JSON.parse(obj)
            let countValue=0;
            array.forEach(element => {
                countValue=element["COUNT(milk_comparison.id)"];
            });    
            
            console.log(countValue)
            if(countValue==0){
                //if object empty search in cheese, get cheese pagination else error
                console.log("pas 2")
                let sqlQuery="SELECT COUNT(cheeses_comparison.id) FROM cheeses_comparison RIGHT JOIN cheeses ON cheeses.id=cheeses_comparison.cheese_id WHERE ";
    if(page!=null && limit!=null){
    for(let i=0;i<splitStr.length;i++){
        if(i!=splitStr.length-1){
            console.log("adding to the sql query")
            sqlQuery+="searchString LIKE '%"+splitStr[i]+"%' AND "
        }else{
            sqlQuery+="searchString LIKE '%"+splitStr[i]+"%' "
            console.log("last bit added to the search query")
        }
    }
    // sqlQuery+="LIMIT "+startIndex+","+endIndex;

}else if(page==null&limit==null){
    for(let i=0;i<splitStr.length;i++){
        if(i!=splitStr.length-1){
            sqlQuery+="searchString LIKE '%"+splitStr[i]+"%' AND "
        }else{
            sqlQuery+="searchString LIKE '%"+splitStr[i]+"%' "
        }
    }
}
    connectionPool.query(sqlQuery,(err,result)=>{
        console.log("pas 3")
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
            response.send("error");
            console.log("pas 4")
        }
        else {
            obj=JSON.stringify(result);
            response.send(obj);
            console.log("pas 5")
            console.log(result)
            console.log(obj)
            
        }
    });



            }else{
            response.send(obj);
            }
        }
    });

}


// generate products based on search input
function searchProducts(request,response){
    const page=request.query.page;
    const limit=request.query.limit;
    const startIndex=(page-1)*limit;
    const endIndex=limit;
    let splitStr=[];
    let searchQuery = request.body.searchString;
    splitStr = searchQuery.split(" ");
    console.log(splitStr)
    console.log(request.body.searchString)
    let sqlQuery="SELECT * FROM milk_comparison RIGHT JOIN milk ON milk.id=milk_comparison.milk_id WHERE ";
    if(page!=null && limit!=null){
    for(let i=0;i<splitStr.length;i++){
        if(i!=splitStr.length-1){
            // console.log("adding to the sql query")
            sqlQuery+="searchString LIKE '%"+splitStr[i]+"%' AND "
        }else{
            sqlQuery+="searchString LIKE '%"+splitStr[i]+"%' "
            // console.log("last bit added to the search query")
        }
    }
    sqlQuery+="LIMIT "+startIndex+","+endIndex;

}else if(page==null&limit==null){
    for(let i=0;i<splitStr.length;i++){
        if(i!=splitStr.length-1){
            sqlQuery+="searchString LIKE '%"+splitStr[i]+"%' AND "
        }else{
            sqlQuery+="searchString LIKE '%"+splitStr[i]+"%' "
        }
    }
}
    connectionPool.query(sqlQuery,(err,result)=>{
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
            response.send("error");
        }
        else {
            let obj=JSON.stringify(result);
            console.log("this is the object sent from server"+obj);
            console.log("object length"+obj.length)
            if(obj.length==2){
                // if object empty search in cheese
            
                sqlQuery="SELECT * FROM cheeses_comparison RIGHT JOIN cheeses ON cheeses.id=cheeses_comparison.cheese_id WHERE ";
                if(page!=null && limit!=null){
                for(let i=0;i<splitStr.length;i++){
                    if(i!=splitStr.length-1){
                        // console.log("adding to the sql query")
                        sqlQuery+="searchString LIKE '%"+splitStr[i]+"%' AND "
                    }else{
                        sqlQuery+="searchString LIKE '%"+splitStr[i]+"%' "
                        // console.log("last bit added to the search query")
                    }
                }
                sqlQuery+="LIMIT "+startIndex+","+endIndex;
            
            }else if(page==null&limit==null){
                for(let i=0;i<splitStr.length;i++){
                    if(i!=splitStr.length-1){
                        sqlQuery+="searchString LIKE '%"+splitStr[i]+"%' AND "
                    }else{
                        sqlQuery+="searchString LIKE '%"+splitStr[i]+"%' "
                    }
                }
            }
            connectionPool.query(sqlQuery,(err,result)=>{
                if (err) {//Check for errors
                    console.error("Error executing query: " + JSON.stringify(err));
                    response.send("error");
                }
                else {
                    obj=JSON.stringify(result); 
                    response.send(obj);
                    console.log("This is cheese:"+obj)
                }
            });
            }else{
            response.send(obj);
            }
        }
    });

}

// compares the products that the user clicks on 
function compareProductsSelected(request,response){
    const id=request.query.item;
    const quantity=request.query.volume;
    const page=request.query.page;
    const limit=request.query.limit;
    const startIndex=(page-1)*limit;
    const endIndex=limit;
    console.log(quantity)
    let sql="";
    if(page!=null && limit!=null){
        console.log("2")
    sql = "SELECT * FROM milk_comparison RIGHT JOIN milk ON milk.id=milk_comparison.milk_id WHERE milk.id="+id+" AND milk_comparison.volume LIKE '%"+quantity+"%' LIMIT "+startIndex+","+endIndex;
    }else if(page==null&limit==null){
        console.log("3")
        sql = "SELECT * FROM milk_comparison RIGHT JOIN milk ON milk.id=milk_comparison.milk_id  AND milk_comparison.volume LIKE '%"+quantity+"%'";
    }
    let obj;
  
    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
            // reject(err);
            console.log("4")
        }
        else {
            
            console.log("5")
            obj = JSON.stringify(result);
           obj= JSON.parse(obj);
           if(obj.length==0){
            let sql="";
    if(page!=null && limit!=null){
        console.log("2")
    sql = "SELECT * FROM cheeses_comparison RIGHT JOIN cheeses ON cheeses.id=cheeses_comparison.cheese_id WHERE cheeses.id="+id+" AND cheeses_comparison.weight LIKE '%"+quantity+"%' LIMIT "+startIndex+","+endIndex;
    }else if(page==null&limit==null){
        console.log("3")
        sql = "SELECT * FROM cheeses_comparison RIGHT JOIN cheeses ON cheeses.id=cheeses_comparison.cheese_id  AND cheeses_comparison.weight LIKE '%"+quantity+"%'";
    }
    let obj;
  
    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
            // reject(err);
            console.log("4")
        }
        else {
            
            console.log("5")
            obj = JSON.stringify(result);
           obj= JSON.parse(obj);
           console.log(obj)
            obj.forEach(element => {
                console.log(element["price"])
                console.log(element["volume"])
                console.log(element["brand"])
            });
            response.send(obj);
        }
    });
           }else{
           console.log(obj)
            obj.forEach(element => {
                console.log(element["price"])
                console.log(element["volume"])
                console.log(element["brand"])
            });
            response.send(obj);
        }
           
        }
    });

}
//Start the app listening on port 8080
module.exports=app.listen(8080, () => {
    console.log("server started at 8080 press control button + c to stop");
})
