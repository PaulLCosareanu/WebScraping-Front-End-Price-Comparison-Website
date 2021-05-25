// test rest api, not important for website, just tests

function displayAll(page ,items){
    let p = new Promise((resolve, reject) => {
    console.log("1")
    let xhttp=new XMLHttpRequest();
    console.log("papapa")
      // extract user data from html file form
    
          // when reply is received from the server the following happens
          xhttp.onreadystatechange=function(){
            console.log("2")
          if(this.readyState==4 && this.status==200){
            //  document.getElementById("photosHot").innerHTML=this.responseText;
            console.log("3")
            let obj = JSON.parse(xhttp.responseText);
            let htmlStr="";
            let count=0;
            console.log(obj);
            obj.forEach(element => {
                console.log("4")
                // count=element["COUNT(milk.id)"];
                htmlStr+=('<div class="product">'+
                            '<div class="productImage">'+
                            '<img src="'+element["imageUrl"]+'">'+
                        '</div>'+
                        '<div class="productDescription">'+
                            '<h2>'+element["type"]+'</h2>'+
                            '<h4>'+element["brand"]+" "+element["type"]+" "+element["volume"]+" "+element["price"]+'£</h4>'+
                        '<div class="toWebsite">'+
                            '<button type="button"><a href='+element["url"]+'>Go to Website</a></button>'+
                        '</div>'+
                        '</div>'+
                        '</div>')
                    });
                   htmlStr+=('<div class="pagination" id="pagination">'+ 
                   '</div>');  
                    
                // element["volume"]+element["type"])
                console.log("5")
            document.getElementById("products").innerHTML=htmlStr;
            document.getElementById("announcement").style.display="none";
            
        }else{
            document.getElementById("products").innerHTML="Server error";   
            // reject("error");
            // reject("error")
            resolve("ok");
        }
    };
        xhttp.open("GET","/all?page="+page+"&limit="+items,true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();    
            resolve("ok");
    
        });
        p.then(() => {
           setTimeout(displayPageNumbers,500);
           return "all products returned"
        });
       

}
// gets back the number of pages according to the search query
function displayPageNumbers(page,items){
    let xhttp=new XMLHttpRequest();
    let numberOfPages=0;
    let searchInput = document.getElementById("search").value;
    let input={
        searchString:searchInput

    }
    // extract user data from html file form
    console.log("passss 1")
        // when reply is received from the server the following happens
         xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            if(this.responseText!="error"){
          //  document.getElementById("photosHot").innerHTML=this.responseText;
          let obj = JSON.parse(this.responseText);
          console.log("passss 2")
          let htmlStr="";
          let count=0;
          console.log(obj)
          obj.forEach(element => {
              count=element["COUNT(milk_comparison.id)"];
              console.log(count)
              console.log(element["COUNT(milk_comparison.id)"])
              console.log("passsss 3")
              console.log(2334);
              console.log(obj)
              if(count==undefined||count==null||count==0){
                  count=element["COUNT(cheeses_comparison.id)"];
                  console.log(count)
                  console.log(element["COUNT(cheeses_comparison.id)"])
              }
        });
        if(count%2==0){
            numberOfPages=count/8;
        }else{
            numberOfPages=parseInt(count/8+1);
        }
        
        for(let i=1;i<numberOfPages+1;i++){
            htmlStr+="<button onclick='searchInput("+i+",8)'>"+i+"</button>"
            
        }
        
        document.getElementById("pagination").innerHTML=htmlStr;
        // document.getElementById("announcement").style.display="none";
    }else{document.getElementById("products").innerHTML="<span style='color: red'>"+this.responseText+"</span>";}
    }else{// end response state 200
        document.getElementById("pagination").innerHTML="Server error";
    }
     };
    xhttp.open("POST","/pagination",true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(input));

}

// gets back data according to the search query (user input)

function searchInput(page,number){
    let xhttp=new XMLHttpRequest();

// extract user data from html file form
let searchInput = document.getElementById("search").value;
 

// create object to be sent to server
let input={
    searchString:searchInput
  
}

// when reply is received from the server the following happens
 xhttp.onreadystatechange=function(){
if(this.readyState==4 && this.status==200){
    if(this.responseText!="error"){
      


        let obj = JSON.parse(this.responseText);
            let htmlStr="";
            let count=0;
            console.log(obj);
            obj.forEach(element => {
                console.log("4")
               if(element["volume"]!=undefined){
                htmlStr+=('<div class="product">'+
                            '<div class="productImage">'+
                            '<img src="'+element["imageUrl"]+'">'+
                        '</div>'+
                        '<div class="productDescription">'+
                            '<h2>'+element["type"]+'</h2>'+
                            '<h4>'+element["brand"]+" "+element["type"]+" "+element["volume"]+" "+element["price"]+'£</h4>'+
                        '<div class="toWebsite">'+
                            '<button type="button" onclick="compareProducts('+element["id"]+',\''+element["volume"]+'\',1,8)">Compare</button>'+
                        '</div>'+
                        '</div>'+
                        '</div>')
               }else{
                htmlStr+=('<div class="product">'+
                '<div class="productImage">'+
                '<img src="'+element["imageUrl"]+'">'+
            '</div>'+
            '<div class="productDescription">'+
                '<h2>'+element["type"]+'</h2>'+
                '<h4>'+element["brand"]+" "+element["type"]+" "+element["weight"]+" "+element["price"]+'£</h4>'+
            '<div class="toWebsite">'+
                '<button type="button" onclick="compareProducts('+element["id"]+',\''+element["weight"]+'\',1,8)">Compare</button>'+
            '</div>'+
            '</div>'+
            '</div>')
               }
                    });
                   htmlStr+=('<div class="pagination" id="pagination">'+ 
                   '</div>');  
                    
               
                console.log("5")
            document.getElementById("products").innerHTML=htmlStr;
            document.getElementById("announcement").style.display="none";
            
    }else{document.getElementById("products").innerHTML="<span style='color: red'>"+this.responseText+"</span>";}
}else{
    document.getElementById("products").innerHTML="<span style='color: red'>"+this.responseText+"</span>";
}
 };
xhttp.open("POST","/products?page="+page+"&limit="+number,true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send(JSON.stringify(input));

setTimeout(function(){ displayPageNumbers(1,9); }, 500);
}


// generates the html accompanied with the data sent from server. this is the final page where products are compared
function compareProducts(idCompareProduct, volumeProduct,pageNumber,limit){



    let p = new Promise((resolve, reject) => {
        console.log("1")
        let xhttp=new XMLHttpRequest();
        console.log("papapa")
          // extract user data from html file form
        
              // when reply is received from the server the following happens
              xhttp.onreadystatechange=function(){
                console.log("2")
              if(this.readyState==4 && this.status==200){
                //  document.getElementById("photosHot").innerHTML=this.responseText;
                console.log("3")
                let obj = JSON.parse(xhttp.responseText);
                let htmlStr="";
                let count=0;
                console.log(obj);
                htmlStr="<button onclick='searchInput(1,8)'>Go back!</button>"
                obj.forEach(element => {
                    console.log("4")
                    // count=element["COUNT(milk.id)"];
                    if(element["volume"]!=undefined && element["volume"]!="" && element["volume"]!=null){
                        console.log(element["volume"]+ "volum aici baa")
                        htmlStr+=('<div class="product">'+
                                '<div class="productImage">'+
                                '<img src="'+element["imageUrl"]+'">'+
                            '</div>'+
                            '<div class="productDescription">'+
                                '<h2>'+element["type"]+'</h2>'+
                                '<h4>Seller: '+element["retailer"]+", Product: "+element["brand"]+" "+element["type"]+" "+element["volume"]+", Price: "+element["price"]+'£</h4>'+
                            '<div class="toWebsite">'+
                                '<button type="button"><a href='+element["url"]+'>Go to Website</a></button>'+
                            '</div>'+
                            '</div>'+
                            '</div>')
                    }else{
                        htmlStr+=('<div class="product">'+
                                '<div class="productImage">'+
                                '<img src="'+element["imageUrl"]+'">'+
                            '</div>'+
                            '<div class="productDescription">'+
                                '<h2>'+element["type"]+'</h2>'+
                                '<h4>Seller: '+element["retailer"]+", Product: "+element["brand"]+" "+element["type"]+" "+element["weight"]+", Price: "+element["price"]+'£</h4>'+
                            '<div class="toWebsite">'+
                                '<button type="button"><a href='+element["url"]+'>Go to Website</a></button>'+
                            '</div>'+
                            '</div>'+
                            '</div>')
                    }
                        });
                       htmlStr+=('<div class="pagination" id="pagination">'+ 
                       '</div>');  
                        
                    // element["volume"]+element["type"])
                    console.log("5")
                document.getElementById("products").innerHTML=htmlStr;
                document.getElementById("announcement").style.display="none";
                
            }else{
                document.getElementById("products").innerHTML="Server error";   
                // reject("error");
                // reject("error")
                resolve("ok");
            }
        };
            xhttp.open("GET","/compare?item="+idCompareProduct+"&volume="+volumeProduct+"&page="+pageNumber+"&limit="+limit,true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.send();    
                resolve("ok");
        
            });
            p.then(() => {
            //    setTimeout(displayPageNumbers,500);
            console.log("hurray compare works")
            });
           


}