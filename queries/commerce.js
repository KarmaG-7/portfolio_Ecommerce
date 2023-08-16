const db = require("../db/dbConfig");

async function getAllProducts() {
  try {
    let result = await db.any("SELECT * FROM commerce");
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getProductById(id) {
  try {
    let result = await db.any("SELECT * FROM commerce WHERE id=$1", [id]);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function deleteProductById(id) {
  try {
    let result = await db.one(
      "DELETE FROM commerce WHERE id=$1 RETURNING *",
      id
    );
    return result;
  } catch (error) {
    return error;
  }
}

async function createProduct(data) {
  const {
    product_name,
    price,
    rating,
    product_image,
    category,
    is_popular,
    product_description,
  } = data;
  try {
    let result = await db.one(
      "INSERT INTO commerce (product_name, price, rating,product_image,category,is_popular,product_description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        product_name,
        price,
        rating,
        product_image,
        category,
        is_popular,
        product_description,
      ]
    );
    return result;
  } catch (error) {
    return error;
  }
}

async function updateProductById(data, id) {
  let values = Object.values(data);

  function makeQueryString(data) {
    let count = 2;
    let result = "";

    for (let key in data) {
      result += `${key} = $${count},`;
      count++;
    }
    result = result.substring(0, result.length - 1);
    return result;
  }
  let queryString = makeQueryString(data);
  let finalQueryString = `UPDATE commerce SET ${queryString} WHERE id = $1 RETURNING *`;
  try {
    const result = db.any(finalQueryString, [id, ...values]);

    return result;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProductById,
};
