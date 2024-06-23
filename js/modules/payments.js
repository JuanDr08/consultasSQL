import { conexion } from "../../db/connection.js";

// 1/2 UniqTable 4. Obtener los detalles de todos los pagos realizados por el cliente con el número de cliente 103
export const getAllPaymentsdetailByCustomer = async(id = 103)=>{
    let [result] = await conexion.execute(` SELECT * FROM payments WHERE customerNumber = ?`, [id]);
    return result;
}

// 1/2 MultiTables 4. Listar el monto total de los pagos recibidos de cada cliente
export const getTotalPaymentForEachCustomer = async()=>{
    let [result] = await conexion.execute(` SELECT customers.customerName, SUM(payments.amount) AS totalPayments FROM customers JOIN payments  ON customers.customerNumber = payments.customerNumber GROUP BY customers.customerName;`);
    return result;
}

// 2/2 UniqTable 5. Calcular el total de pagos recibidos
export const getTotalPayments = async()=>{
    let [result] = await conexion.execute(`SELECT SUM(amount) AS totalPayments FROM payments;`);
    return result;
}

// 2/2 MultiTables 1. Calcular el total de pagos recibidos por cada cliente
export const getTotalPaymentsForEachCustumer = async()=>{
    let [result] = await conexion.execute(`SELECT customers.customerName, SUM(payments.amount) AS totalPayments FROM customers JOIN payments ON payments.customerNumber = customers.customerNumber GROUP BY customers.customerNumber;`);
    return result;
}

// 2/2 MultiTables 7. Calcular el total de pagos recibidos por cada país
export const getTotalPaymentsForEachCountry = async()=>{
    let [result] = await conexion.execute(`SELECT customers.country, COUNT(*) AS totalPayments FROM payments JOIN customers  ON customers.customerNumber = payments.customerNumber GROUP BY customers.country;`);
    return result;
}

// 2/2 MultiTables 15. Calcular el total de pagos recibidos por cada vendedor
export const getTotalPaymentsForEachSeller = async()=>{
    let [result] = await conexion.execute(`SELECT employees.employeeNumber, employees.firstName, COUNT(*) AS totalPayments FROM payments JOIN customers ON customers.customerNumber = payments.customerNumber JOIN employees ON employees.employeeNumber = customers.salesRepEmployeeNumber GROUP BY employees.employeeNumber, employees.firstName;`);
    return result;
}

// 2/2 MultiTables 19. Obtener el total de pagos realizados en cada año
export const getTotalPaymentsForEachYear = async()=>{
    let [result] = await conexion.execute(`SELECT YEAR(paymentDate) AS paymentYear,  SUM(amount) AS totalPayments FROM  payments GROUP BY  YEAR(paymentDate);`);
    return result;
}