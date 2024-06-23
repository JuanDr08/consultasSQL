import { conexion } from "../../db/connection.js";

// 1/2 UniqTable 2. Encontrar todos los empleados que trabajan en la oficina de San Francisco
export const getAllEmployeesWithOfficeInSanFrancisco = async()=>{
    let [result] = await conexion.query(` SELECT * FROM employees WHERE officeCode = 1;`);
    return result;
}

// 1/2 MultiTablas 2. Obtener los nombres y direcciones de correo electrónico de los empleados que reportan al empleado con el número de empleado 1143
export const getAllEmployeesByreportTo = async(id = 1143)=>{
    let [result] = await conexion.query(` SELECT firstName, email FROM employees WHERE reportsTo = ?`, [id]);
    return result;
}

// 2/2 UniqTable 6. Obtener la cantidad total de empleados
export const getTotalQuantityEmployees = async()=>{
    let [result] = await conexion.query(`SELECT COUNT(*) AS totalEmployees FROM employees;`);
    return result;
}

// 2/2 UniqTable 10. Contar la cantidad de empleados por título de trabajo
export const getQuantityEmployeesByJobTitle = async()=>{
    let [result] = await conexion.query(`SELECT jobTitle, COUNT(*) AS quantityEmployees FROM employees GROUP BY JobTitle;`);
    return result;
}


// 2/2 MultiTable 8. Encontrar el promedio de ventas (cantidad ordenada por precio cada uno) por cada empleado
export const getAverageSalesForEachEmployee = async()=>{
    let [result] = await conexion.query(`SELECT employees.firstName,   AVG(orderdetails.quantityordered * orderdetails.priceEach) AS averageSales FROM orderdetails JOIN orders ON orders.orderNumber = orderdetails.orderNumber JOIN customers ON customers.customerNumber = orders.customerNumber JOIN employees ON employees.employeeNumber = customers.salesRepEmployeeNumber GROUP BY employees.firstName;`);
    return result;
}

// 2/2 MultiTable 9. Calcular el total de órdenes gestionadas por cada empleado
export const getTotalManagedOrdersForEachEmployee = async()=>{
    let [result] = await conexion.query(`SELECT employees.firstName,   COUNT(*) AS totalOrders FROM orderdetails JOIN orders ON orders.orderNumber = orderdetails.orderNumber JOIN customers ON customers.customerNumber = orders.customerNumber JOIN employees ON employees.employeeNumber = customers.salesRepEmployeeNumber GROUP BY employees.firstName;`);
    return result;
}