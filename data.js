module.exports.User = {
  find(authToken){
    return {
      username: "Miles Davis",
      token: authToken,
    }
  }
}

module.exports.Product = {
  find(productId){
    const products = {
      "1": "Apple",
      "2": "Banana",
      "3": "Carrot",
    }
    return products[productId]
  }
}

