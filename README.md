

## Parte 1/2

### Consultas de una sola tabla

1. **Recuperar todas las líneas de productos con sus descripciones:**

   ```sql
   SELECT productLine, productDescription FROM products;
   ```

2. **Encontrar todos los empleados que trabajan en la oficina de 'San Francisco':**

   ```sql
   select firstName, lastName from employees where officeCode=1;
   ```

3. **Listar todas las órdenes que tienen un estado de 'Enviado':**

   ```sql
   select * from orders where status="Shipped";
   ```

4. **Obtener los detalles de todos los pagos realizados por el cliente con el número de cliente 103:**

   ```sql
   SELECT * FROM payments WHERE customerNumber = 103;
   ```

5. **Recuperar todos los clientes de 'USA' que tienen un límite de crédito superior a 50000:**

   ```sql
   select customerName, country, creditLimit from customers where country='USA' and creditLimit >= 50000;
   ```

### Consultas de múltiples tablas

1. **Listar todos los productos junto con las descripciones de sus líneas de productos:**

   ```sql
   select productName, textDescription from products inner join productlines using(productLine);
   ```

2. **Obtener los nombres y direcciones de correo electrónico de los empleados que reportan al empleado con el número de empleado 1143:**

   ```sql
   select firstName, email from employees where reportsTo=1143;
   ```

3. **Encontrar todas las órdenes realizadas por clientes de 'Francia':**

   ```sql
   select * from orders inner join customers using(customerNumber) where country="France";
   ```

4. **Listar el monto total de los pagos recibidos de cada cliente:**

   ```sql
   SELECT customers.customerName, SUM(payments.amount)
   FROM customers 
   JOIN payments USING(customerNumber) 
   GROUP BY customers.customerName;
   ```

5. **Recuperar los detalles de las órdenes, incluyendo los nombres de los productos, para todas las órdenes realizadas por el cliente con el número de cliente 101:**

   ```sql
   SELECT orders.*, orderdetails.*, products.*
   FROM orders
   JOIN orderdetails USING(orderNumber)
   JOIN products USING(productCode)
   WHERE orders.customerNumber = 101;
   ```
   
   



-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



## Parte 2/2

### Consultas de una sola tabla

1. **Obtener el promedio del límite de crédito de todos los clientes:**

   ```sql
   SELECT AVG(creditLimit) FROM customers;
   ```

2. **Calcular el total de productos en stock:**

   ```sql
   SELECT SUM(quantityInStock) FROM products;
   ```

3. **Encontrar el precio medio de compra de todos los productos:**

   ```sql
   SELECT AVG(buyPrice) FROM products;
   ```

4. **Contar la cantidad de oficinas en cada país:**

   ```sql
   SELECT country, COUNT(*) FROM offices GROUP BY country;
   ```

5. **Calcular el total de pagos recibidos:**

   ```sql
   SELECT SUM(amount) FROM payments;
   ```

6. **Obtener la cantidad total de empleados:**

   ```sql
   SELECT COUNT(*) FROM employees;
   ```

7. **Calcular la cantidad media de productos pedidos en las órdenes:**

   ```sql
   SELECT AVG(quantityOrdered) FROM orderdetails;
   ```

8. **Encontrar el precio total de todos los productos:**

   ```sql
   SELECT SUM(buyPrice) FROM products;
   ```

9. **Calcular el promedio del precio sugerido (MSRP) de los productos:**

   ```sql
   SELECT AVG(MSRP) FROM products;
   ```

10. **Contar la cantidad de empleados por título de trabajo:**

    ```sql
    SELECT jobTitle, COUNT(*) FROM employees GROUP BY JobTitle;
    ```

    

### Consultas de múltiples tablas

1. **Calcular el total de pagos recibidos por cada cliente:**

   ```sql
   SELECT c.customerName, SUM(p.amount)
   FROM customers c
   INNER JOIN payments p USING(customerNumber)
   GROUP BY c.customerNumber;
   ```

2. **Obtener el promedio del límite de crédito de los clientes por país:**

   ```sql
   SELECT country, AVG(creditLimit)
   FROM customers GROUP BY country;
   ```

3. **Calcular el total de órdenes realizadas por cada cliente:**

   ```sql
   SELECT c.customerName, COUNT(*)
   FROM orders o
   INNER JOIN customers c USING(customerNumber) GROUP BY c.customerNumber;
   ```

4. **Encontrar la cantidad total de productos pedidos por cada cliente:**

   ```sql
   SELECT c.customerName, COUNT(*) 
   FROM orderdetails 
   INNER JOIN orders o USING(orderNumber)
   INNERJOIN customers c USING(customerNumber)
   GROUP BY c.customerName;
   ```

5. **Calcular el total de ventas (cantidad ordenada por precio cada uno) por cada cliente:**

   ```sql
   SELECT c.customerName, SUM(od.quantityordered * od.priceEach)
   FROM orderdetails od
   INNER JOIN orders o USING(orderNumber)
   INNER JOIN customers c USING(customerNumber)
   GROUP BY c.customerName;
   ```

6. **Obtener el promedio de la cantidad de productos en stock por línea de productos:**

   ```sql
   SELECT productLine, AVG(quantityInStock) 
   FROM products
   GROUP BY productLine;
   ```

7. **Calcular el total de pagos recibidos por cada país:**

   ```sql
   SELECT c.country, COUNT(*)
   FROM payments p
   INNER JOIN customers c USING(customerNumber)
   GROUP BY c.country;
   ```

8. **Encontrar el promedio de ventas (cantidad ordenada por precio cada uno) por cada empleado:**

   ```sql
   SELECT e.firstName, AVG(od.quantityordered * od.priceEach) AS salesAverage
   FROM orderdetails  od
   INNER JOIN orders o USING(orderNumber)
   INNER JOIN customers c USING(customerNumber)
   INNER JOIN employees e ON e.employeeNumber = c.salesRepEmployeeNumber 
   GROUP BY e.firstName;
   ```

9. **Calcular el total de órdenes gestionadas por cada empleado:**

   ```sql
   SELECT e.firstName, COUNT(*)
   FROM orderdetails od
   INNER JOIN orders o USING(orderNumber)
   INNER JOIN customers c USING(customerNumber)
   INNER JOIN employees e ON e.employeeNumber = c.salesRepEmployeeNumber
   GROUP BY e.firstName;
   ```

10. **Obtener la cantidad total de productos vendidos por cada línea de productos:**

    ```sql
    SELECT p.productLine, SUM(od.quantityOrdered)
    FROM products p
    INNER JOIN orderdetails od USING(productCode)
    GROUP BY p.productLine;
    ```

11. **Encontrar el promedio de la cantidad de productos ordenados por cada cliente:**

    ```sql
    SELECT c.customerName, AVG(od.quantityOrdered)
    FROM orderdetails od
    INNER JOIN orders o USING(orderNumber)
    INNER JOIN customers c USING(customerNumber)
    GROUP BY c.customerName;
    ```

12. **Calcular el total de ventas realizadas en cada país:**

    ```sql
    SELECT c.country, SUM(od.quantityOrdered)
    FROM customers c
    INNER JOIN orders o USING(customerNumber)
    INNER JOIN orderdetails od USING(orderNumber)
    GROUP BY c.country;
    ```

13. **Obtener el promedio del precio de compra de los productos por línea de productos:**

    ```sql
    SELECT p.productLine, AVG(p.buyPrice) 
    FROM products p
    GROUP BY p.productLine;
    ```

14. **Encontrar la cantidad total de productos vendidos por cada vendedor:**

    ```sql
    SELECT e.employeeNumber, e.firstName, SUM(od.quantityOrdered)
    FROM employees e
    INNER JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber 
    INNER JOIN orders o USING(customerNumber)
    INNER JOIN orderdetails od USING(orderNumber)
    GROUP BY e.employeeNumber, e.firstName;
    ```

15. **Calcular el total de pagos recibidos por cada vendedor:**

    ```sql
    SELECT e.employeeNumber, e.firstName, COUNT(*)
    FROM payments p
    INNER JOIN customers c USING(customerNumber)
    INNER JOIN employees e ON e.employeeNumber = c.salesRepEmployeeNumber 
    GROUP BY e.employeeNumber, e.firstName;
    ```

16. **Obtener el promedio del límite de crédito de los clientes atendidos por cada vendedor:**

    ```sql
    SELECT e.employeeNumber,  e.firstName, AVG(c.creditLimit) 
    FROM employees e
    INNER JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber 
    GROUP BY e.employeeNumber, e.firstName;
    ```

17. **Encontrar el total de ventas realizadas por cada oficina:**

    ```sql
    SELECT off.city, off.country, SUM(od.quantityOrdered * od.priceEach)
    FROM offices off
    INNER JOIN employees e USING(officeCode)
    INNER JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber 
    INNER JOIN orders o USING(customerNumber)
    INNER JOIN orderdetails od USING(orderNumber)
    GROUP BY off.city, off.country;
    ```

18. **Calcular la cantidad media de productos pedidos por cada cliente:**

    ```sql
    SELECT c.customerName, AVG(totalProducts) AS mediaQuatityClientOrder
    FROM customers c
    INNER JOIN (SELECT o.customerNumber, SUM(od.quantityOrdered)
          AS totalProducts
          FROM orders o
          INNER JOIN orderdetails od USING(orderNumber)
          GROUP BY o.customerNumber) 
    AS clientOrders
    USING(customerNumber)
    GROUP BY c.customerName;
    ```

19. **Obtener el total de pagos realizados en cada año:**

    ```sql
    SELECT YEAR(paymentDate), SUM(amount)
    FROM payments 
    GROUP BY YEAR(paymentDate);
    ```

20. **Encontrar el promedio del precio de venta (priceEach) de los productos por línea de productos:**

    ```sql
    SELECT p.productLine, AVG(od.priceEach)
    FROM products p
    INNER JOIN orderdetails od USING(productCode)
    GROUP BY p.productLine;
    ```