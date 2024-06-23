import { conexion } from "../../db/connection.js";

// 1/2 5. Recuperar todos los clientes de 'USA' que tienen un límite de crédito superior a 50000:
export const getAllUSACustomersWithCreditLimit = async(country = 'USA', creditLimit = 50000)=>{
    let [result] = await conexion.query(`SELECT * FROM customers WHERE country = ? AND creditLimit > ?`,[country, creditLimit]);
    return result;
}


// 2/2 UniqTable 1. Obtener el promedio del límite de crédito de todos los clientes
export const getAverageCreditLimitOfAllCustomers = async()=>{
    let [result] = await conexion.query(`SELECT AVG(creditLimit) AS averageCreditLimit FROM customers;`);
    return result;
}

// 2/2 MultiTablas 2. Obtener el promedio del límite de crédito de los clientes por país
export const getAverageCreditLimitOfCustomersByCountry = async()=>{
    let [result] = await conexion.query(`SELECT country, AVG(customers.creditLimit) AS averageCreditLimit FROM customers GROUP BY country;`);
    return result;
}

// 2/2 MultiTablas 16. Obtener el promedio del límite de crédito de los clientes atendidos por cada vendedor
export const getAverageCreditLimitOfCustomerForEachSeller = async()=>{
    let [result] = await conexion.query(`SELECT  employees.employeeNumber,  employees.firstName, AVG(customers.creditLimit) AS averageCreditLimit FROM  employees JOIN  customers ON employees.employeeNumber = customers.salesRepEmployeeNumber GROUP BY  employees.employeeNumber,  employees.firstName;`);
    return result;
}