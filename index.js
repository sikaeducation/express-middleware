const express = require("express")
const app = express()
const { User, Product } = require("./data")

app.get("/products/:productId", addCORSHeader, lookupUser, validateRequest, (request, response, next) => {
  const product = Product.find(request.params.productId)
  if (!product){
    const error = new Error("Couldn't find product")
    next(error)
  }

  response.json({
    user: request.user,
    product,
  })
})

app.use((error, request, response, next) => {
  response.status(400).json({
    error: `There was error with this request: ${error.message}`,
  })
})

function addCORSHeader(request, response, next){
  response.set("Access-Control-Allow-Origin", "*")
  next()
}

function lookupUser(request, response, next){
  const authToken = request.get("Authorization")
  request.user = User.find(authToken)
  next()
}

function validateRequest(request, response, next){
  if (request.params.productId){
    next()
  } else {
    const error = new Error("product_id is required")
    next(error)
  }
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
