//brain of our backend
const express = require("express");
const mongoose = require('mongoose');
const Product = require('./model/product.model.js')
const productRoute = require('./routes/product.route.js');
const app = express();


//MIDDLEWARE
//Can use the json format to send the clint
app.use(express.json()); 
//Can use the Form urlencoded format to send clint req
app.use(express.urlencoded({ extended: false}));


//routes
app.use("/api/products", productRoute);

//Sever running in port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

//display the below message in default page'/'f
app.get('/',(req,res) => {
    res.send("Hello from here this is Node API");
});

//get all the products from the database
app.get('/api/products', async(req,res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error){
        res.status(500).json({message:error.message});
    }
})

//displaing the product using there uniq Id
app.get('/api/products/:id', async(req,res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.post('/api/products', async(req,res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//update a product 
app.put('/api/products/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = Product.findByIdAndUpdate(id, req.body);

        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        const updatedProduct = await Product.findById(id);
        req.status(200).json(updatedProduct);


    } catch (error) {
        res.status(500).json({message: error.message});
    }

});

// delete a product
app.delete('/api/products/:id', async(req,res) => {
    try {
        const { id } = req.params;

        const deleteProduct = await Product.findByIdAndDelete(id);

        if(!deleteProduct){
           return res.status(404).json({message: "Product not found"});
        }

        const deletedProduct = await Product.findById(id);

        res.status(200).json({message: "Product Deleted Succussfully"});

    } catch (error) {

        res.status(500).json({message: error.message});
    }
});



//connect to the data basse
mongoose.connect("mongodb+srv://yogapranavan:1RznQuNi6RHAdzPS@backend.epbyk.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BAckend")
.then(() => {
    //if Connected
    console.log("Connected to database!!");
})
//if not connected
.catch(() => {
    console.log("connection failed!!!!");
})