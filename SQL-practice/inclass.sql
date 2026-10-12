--? List invoices issued from Germany
SELECT * FROM Invoice WHERE BillingCountry = 'Germany';

--? List countries ending with the letter "y"
SELECT * FROM Invoice WHERE BillingCountry LIKE '%y';

--? List the first 10 invoices
SELECT * FROM Invoice LIMIT 10;

--? Sort in ascending order by country and descending order by city
SELECT * FROM Invoice ORDER BY BillingCountry ASC, BillingCity DESC;

--? List the first track by AC/DC
SELECT * FROM Track WHERE Composer = 'AC/DC' LIMIT 1;

--? List the last 3 tracks by AC/DC
SELECT * FROM Track WHERE Composer = 'AC/DC' ORDER BY TrackId DESC LIMIT 3;

--# Functions: MIN, MAX, AVG, SUM, ROUND, LENGTH (Single-value functions) (written between SELECT and FROM)


--? List all invoices
SELECT * FROM Invoice;

--? Calculate total invoice amount
SELECT SUM(total) AS totalInvoiceAmmount from Invoice;

--? Get the lowest, highest, and average invoice amounts
SELECT
	MIN(total) AS 'mini Invoice',
	MAX(total) AS 'max Invoice',
	ROUND(AVG(total),2) AS 'avg Invoice'
FROM Invoice;

--? List invoice address lengths
SELECT length(billingAddress) as 'Length of Address', InvoiceId, CustomerId FROM Invoice;

--? List the track played in the shortest time by AC/DC
SELECT * FROM Track WHERE Composer = 'AC/DC' ORDER BY Milliseconds ASC LIMIT 1;

--? List the track played in the longest time by AC/DC
SELECT * FROM Track WHERE Composer = 'AC/DC' ORDER BY Milliseconds DESC LIMIT 1;


--# GROUP BY: Group data 
SELECT * FROM Invoice;

SELECT * FROM Invoice GROUP BY BillingCountry;

--? Get the average invoice amount for each country
SELECT BillingCountry, avg(total) FROM Invoice GROUP BY BillingCountry;

--? Determine how many invoices were issued for each country (count)

SELECT BillingCountry,
	count(InvoiceId)
FROM Invoice
GROUP BY BillingCountry;


--? Get the total number/amount by country
SELECT 
	BillingCountry,
	count(InvoiceId) 'issued invoice number',
	sum(Total) 'total invoice amount'
FROM Invoice
GROUP BY BillingCountry;


--? Get the min/max invoice amount by country

SELECT BillingCountry, min(Total) minumum, max(Total) maximum
FROM Invoice
GROUP BY BillingCountry;

--# HAVING: Use conditions with GROUP BY

--? List countries with a total invoice amount greater than 100
SELECT 
	BillingCountry,
	sum(Total) 'total invoice amount'
FROM Invoice
GROUP BY BillingCountry
HAVING sum(Total) > 100;


--? List countries with more than 7 invoices

SELECT BillingCountry, count(invoiceId) 'invoice count'
FROM Invoice
GROUP BY BillingCountry
HAVING count(invoiceId) > 7;

--? List countries with an average invoice amount greater than 5
SELECT BillingCountry, round(avg(total),2) 'avarege invoice amount' 
FROM Invoice 
GROUP BY BillingCountry
HAVING avg(total) > 5;


--# SUBQUERY: Use nested queries

--? List invoices above the average invoice amount

--sstep1 Calculate the average invoice amount
SELECT avg(total) FROM Invoice;

-- step2 list invoices above 5.6 now
SELECT * FROM Invoice WHERE total > 5.6;

-- But with subquery
SELECT * 
FROM Invoice 
WHERE total > (SELECT avg(total) FROM Invoice);


--? List tracks from the 'Big Ones' album

--1 First find the album information, then get the AlbumId and list the tracks
--2 Get the ID of the 'Big Ones' album

SELECT AlbumId FROM Album WHERE Title='Big Ones';

-- 3 List tracks with almbumid 5

SELECT * FROM Track WHERE AlbumId = 5;

-- v2 find the albumId using a subquery and list the tracks
SELECT * 
FROM Track 
WHERE AlbumId = (SELECT AlbumId FROM Album WHERE Title='Big Ones');


--? List invoices issued for Mark Philips

SELECT * 
FROM Invoice
where CustomerId = (
	SELECT CustomerId
	FROM Customer
	WHERE  LastName= 'Philips' AND FirstName='Mark'
	);








