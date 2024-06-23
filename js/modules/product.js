import { conexion } from "../../db/connection.js";

// 1/2 UniqTable 1. Recuperar todas las líneas de productos con sus descripciones
export const getAllProductsDescription = async()=>{
    let [result] = await conexion.query(`SELECT productLine, productDescription FROM products`);
    return result;
}

// 1/2 MultiTables 1. Listar todos los productos junto con las descripciones de sus líneas de productos
export const getAllProductsWithDescription = async()=>{
    let [result] = await conexion.query(`SELECT products.productName, productlines.textDescription FROM products INNER JOIN productlines ON products.productLine = productlines.productLine;`);
    return result;
}

// 2/2 UniqTable 2.Calcular el total de productos en stock
export const getTotalProductsInStock = async()=>{
    let [result] = await conexion.query(`SELECT SUM(quantityInStock) AS totalProductsInStock FROM products;`);
    return result;
}

// 2/2 UniqTable 3. Encontrar el precio medio de compra de todos los productos
export const getAverageBuyPriceOfAllProducts = async()=>{
    let [result] = await conexion.query(`SELECT AVG(buyPrice) AS averageBuyPrice FROM products;`);
    return result;
}

// 2/2 UniqTable 7. Calcular la cantidad media de productos pedidos en las órdenes
export const getAverageQuantityProductsOrederedByOrders = async()=>{
    let [result] = await conexion.query(`SELECT AVG(orderdetails.quantityOrdered) AS averageQuantityOrdered FROM orderdetails;`);
    return result;
}

// 2/2 UniqTable 8. Encontrar el precio total de todos los productos
export const getTotalPriceOfAllProducts = async()=>{
    let [result] = await conexion.query(`SELECT SUM(products.buyPrice) AS totalPriceProducts FROM products;`);
    return result;
}

// 2/2 UniqTable 9. Calcular el promedio del precio sugerido (MSRP) de los productos
export const getAverageSuggestedPriceOfProducts= async()=>{
    let [result] = await conexion.query(`SELECT AVG(products.MSRP) AS averagePriceMSRP FROM products;`);
    return result;
}


// 2/2 MultiTables 4. Encontrar la cantidad total de productos pedidos por cada cliente
export const getTotalOrderedProductsForEachCustomer= async()=>{
    let [result] = await conexion.query(`SELECT customers.customerName, COUNT(*) AS totalProducts FROM orderdetails JOIN orders ON orders.orderNumber  = orderdetails.orderNumber JOIN customers ON customers.customerNumber = orders.customerNumber GROUP BY customers.customerName;`);
    return result;
}

// 2/2 MultiTables 10. Obtener la cantidad total de productos vendidos por cada línea de productos
export const getTotalQuantityProductsSalesForEachProductLine= async()=>{
    let [result] = await conexion.query(`SELECT products.productLine,  SUM(orderdetails.quantityOrdered) AS quantityProductsSold FROM products JOIN orderdetails ON orderdetails.productCode = products.productCode GROUP BY products.productLine;`);
    return result;
}

// 2/2 MultiTables 11. Encontrar el promedio de la cantidad de productos ordenados por cada cliente
export const getAverageQuantityProductsForEachCustomer= async()=>{
    let [result] = await conexion.query(`SELECT customers.customerName, AVG(orderdetails.quantityOrdered) AS averageQuantityProducts FROM orderdetails JOIN orders ON orders.orderNumber = orderdetails.orderNumber JOIN customers ON customers.customerNumber = orders.customerNumber GROUP BY customers.customerName;`);
    return result;
}

// 2/2 MultiTables 14. Encontrar la cantidad total de productos vendidos por cada vendedor
export const getTotalQuantityProductsSalesForEahSeller= async()=>{
    let [result] = await conexion.query(`SELECT  employees.employeeNumber, employees.firstName, SUM(orderdetails.quantityOrdered) AS totalQuantitySold FROM  employees JOIN  customers ON employees.employeeNumber = customers.salesRepEmployeeNumber JOIN  orders ON customers.customerNumber = orders.customerNumber JOIN  orderdetails ON orders.orderNumber = orderdetails.orderNumber GROUP BY  employees.employeeNumber, employees.firstName;`);
    return result;
}