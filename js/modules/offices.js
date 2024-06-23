import { conexion } from "../../db/connection.js";

// 2/2 UniqTable 4. Contar la cantidad de oficinas en cada país
export const getAllQuantityOfficesForEachCountry= async()=>{
    let [result] = await conexion.query(`SELECT country, COUNT(*) AS quantityOffices FROM offices GROUP BY country;`);
    return result;
}

// 2/2 MultiTable 17. Encontrar el total de ventas realizadas por cada oficina
export const getTotalSalesForEachOffice= async()=>{
    let [result] = await conexion.query(`SELECT offices.city, offices.country, SUM(orderdetails.quantityOrdered * orderdetails.priceEach) AS totalSales FROM  offices JOIN  employees ON offices.officeCode = employees.officeCode JOIN  customers ON employees.employeeNumber = customers.salesRepEmployeeNumber JOIN  orders ON customers.customerNumber = orders.customerNumber JOIN  orderdetails ON orders.orderNumber = orderdetails.orderNumber GROUP BY offices.city, offices.country;`);
    return result;
}