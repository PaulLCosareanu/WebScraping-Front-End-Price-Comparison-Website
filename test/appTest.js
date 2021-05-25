let chai=require("chai");
let chaiHttp=require("chai-http")
let server=require("../Server");

// assertion style
chai.should();
chai.use(chaiHttp);

it('should get all elements with the search term milk', (done) =>{
    chai.request(server)
       .post('/products')
       .send({searchString: "milk"})
       .end((err,response)=>{
           response.should.have.status(200)
           
         let  obj=JSON.parse(response.text)
          
           obj.length.should.be.eq(98) //98 products after hours of letting the scraper running( sometimes changes if new products are added)
          
           done();
       })
});


it('should get all elements with the search term cheese', (done) =>{
    chai.request(server)
       .post('/products')
       .send({searchString: "cheese"})
       .end((err,response)=>{
           response.should.have.status(200)
           
         let  obj=JSON.parse(response.text)
          
           obj.length.should.be.eq(120) //120 products after hours of letting the scraper running having the search term cheese( sometimes changes if new products are added)
          
           done();
       })
});

    // test get products with search term milk and number of elements 10
    

    it('should get 10 elements with the search term milk', (done) =>{
         chai.request(server)
            .post('/products?page=1&limit=10')
            .send({searchString: "milk"})
            .end((err,response)=>{
                response.should.have.status(200)
                // response=JSON.stringify(response)
              let  obj=JSON.parse(response.text)
                // console.log("this is response"+response)
                // console.log(response.length)
                // console.log(JSON.parse(response.text))
                obj.length.should.be.eq(10)
               
                done();
            })
    });

    //  test get products with search term cheese and no of products 20
    

     it('should get 20 elements with the search term cheese', (done) =>{
        chai.request(server)
           .post('/products?page=1&limit=20')
           .send({searchString: "cheese"})
           .end((err,response)=>{
               response.should.have.status(200)
               let  obj=JSON.parse(response.text)
               obj.length.should.be.eq(20)
               done();
           })
   });

   it('should get response 200 for returning the total number  of elements with the search term milk required for pagination', (done) =>{
    chai.request(server)
       .post('/pagination')
       .send({searchString: "milk"})
       .end((err,response)=>{
           response.should.have.status(200)
           
         let  obj=JSON.parse(response.text)

          
           done();
       })
});