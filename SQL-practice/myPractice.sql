-- 1. List the customer's first and last name with the highest invoice amount
-- (Запрос для отдельного чека с максимальной суммой; при равенстве сумм выведет всех лидеров)
SELECT c.FirstName, c.LastName, i.Total
FROM Customer c
JOIN Invoice i ON c.CustomerId = i.CustomerId
WHERE i.Total = (SELECT MAX(Total) FROM Invoice);

-- Если требуется суммарная потраченная сумма по клиенту за всё время:
-- SELECT c.FirstName, c.LastName, SUM(i.Total) AS TotalSpent
-- FROM Customer c
-- JOIN Invoice i ON c.CustomerId = i.CustomerId
-- GROUP BY c.CustomerId, c.FirstName, c.LastName
-- ORDER BY TotalSpent DESC
-- LIMIT 1;


-- 2. List the country with the most invoices issued and the total number of invoices
SELECT BillingCountry AS Country, COUNT(InvoiceId) AS TotalInvoices
FROM Invoice
GROUP BY BillingCountry
ORDER BY TotalInvoices DESC
LIMIT 1;


-- 3. List the name and price of the most expensive track
SELECT Name, UnitPrice
FROM Track
WHERE UnitPrice = (SELECT MAX(UnitPrice) FROM Track);


-- 4. Find the number of invoices with a total greater than 10
SELECT COUNT(*) AS InvoicesCount
FROM Invoice
WHERE Total > 10;


-- 5. List the number of customers and city name in each city (excluding cities with no customers)
SELECT City, COUNT(CustomerId) AS CustomerCount
FROM Customer
WHERE City IS NOT NULL
GROUP BY City
HAVING COUNT(CustomerId) > 0
ORDER BY CustomerCount DESC, City ASC;


-- 6. List the name and duration (in milliseconds) of the longest track
SELECT Name, Milliseconds
FROM Track
WHERE Milliseconds = (SELECT MAX(Milliseconds) FROM Track);


-- 7. Find the number of tracks in the 'Rock' genre
SELECT COUNT(t.TrackId) AS RockTracksCount
FROM Track t
JOIN Genre g ON t.GenreId = g.GenreId
WHERE g.Name = 'Rock';


-- 8. Find the total amount of invoices whose total is above the average
SELECT SUM(Total) AS TotalAmountAboveAverage
FROM Invoice
WHERE Total > (SELECT AVG(Total) FROM Invoice);


-- 9. List the number of tracks in each album and the album name (top 5 albums with the most tracks)
SELECT a.Title AS AlbumName, COUNT(t.TrackId) AS TrackCount
FROM Album a
JOIN Track t ON a.AlbumId = t.AlbumId
GROUP BY a.AlbumId, a.Title
ORDER BY TrackCount DESC
LIMIT 5;


-- 10. Find the number of customers without an email address
SELECT COUNT(*) AS CustomersWithoutEmail
FROM Customer
WHERE Email IS NULL OR TRIM(Email) = '';


-- 11. List how many employees there are in each country
SELECT Country, COUNT(EmployeeId) AS EmployeeCount
FROM Employee
GROUP BY Country
ORDER BY EmployeeCount DESC;


-- 12. List the name and duration of the shortest track written by the composer 'AC/DC'
SELECT Name, Milliseconds
FROM Track
WHERE Composer = 'AC/DC'
ORDER BY Milliseconds ASC
LIMIT 1;

-- 13. Find the average amount of invoices with totals between 5 and 10
SELECT AVG(Total) AS AverageInvoiceTotal
FROM Invoice
WHERE Total BETWEEN 5 AND 10;


-- 14. List the number of tracks for each media type and the media type name
SELECT m.Name AS MediaTypeName, COUNT(t.TrackId) AS TrackCount
FROM MediaType m
LEFT JOIN Track t ON m.MediaTypeId = t.MediaTypeId
GROUP BY m.MediaTypeId, m.Name
ORDER BY TrackCount DESC;


-- 15. Find the total invoice amount for customers in 'Canada'
SELECT SUM(i.Total) AS TotalInvoiceAmount
FROM Invoice i
JOIN Customer c ON i.CustomerId = c.CustomerId
WHERE c.Country = 'Canada';