/* MongoSH */
// https://www.mongodb.com/developer/products/mongodb/cheat-sheet/
// https://www.mongodb.com/docs/manual/reference/sql-comparison/
// https://www.w3schools.com/mongodb/index.php

/* General */
// help
help
// clearScreen:
cls // console.clear()

// exit from mongosh:
exit // exit() // .exit
quit // quit()


/* Databases */
show('dbs') // show dbs // show databases
// Create/Swicth to Database:
use('newdb') // use newdb
// Drop/Reset:
db.dropDatabase()


/* Collections (Tables) */
// mongodb.com/docs/manual/reference/method/js-collection/
show('collections') // show collections // show tables
db.getCollectionNames() // List by array.
db.getCollectionInfos() // List by array with details.
db.createCollection('collName') // Create
db.collName.renameCollection('collName2') // Update
db.collName2.drop() // Drop


/* Documents (Records/Rows) */

// INSERT:
// db.coll.insertOne( { new_values } )
// db.coll.insertMany( [ { new_values } ] )
db.coll.insertOne({ firstName: 'Test', lastName: 'Test', age: 10 })
// in array[]	
db.coll.insertMany([
	{ firstName: 'Test1', lastName: 'Test1', age: 11 },
	{ firstName: 'Test2', lastName: 'Test2', age: 12 },
	{ firstName: 'Test3', lastName: 'Test3', age: 13 },
	{ firstName: 'Test4', lastName: 'Test4', age: 14 },
	{ firstName: 'Test5', lastName: 'Test5', age: 15 },
	{ firstName: 'Test6', lastName: 'Test6', age: 16 },
	{ firstName: 'Test7', lastName: 'Test7', age: 17 },
	{ firstName: 'Test8', lastName: 'Test8', age: 18 },
	{ firstName: 'Test9', lastName: 'Test9', age: 19 },
	{ firstName: 'Test', lastName: 'Test', age: 10 },
	{ firstName: 'Test1', lastName: 'Test1', age: 11 },
	{ firstName: 'Test2', lastName: 'Test2', age: 12 },
	{ firstName: 'Test3', lastName: 'Test3', age: 13 },
	{ firstName: 'Test4', lastName: 'Test4', age: 14 },
	{ firstName: 'Test5', lastName: 'Test5', age: 15 },
	{ firstName: 'Test6', lastName: 'Test6', age: 16 },
	{ firstName: 'Test7', lastName: 'Test7', age: 17 },
	{ firstName: 'Test8', lastName: 'Test8', age: 18 },
	{ firstName: 'Test9', lastName: 'Test9', age: 19 },
	{ firstName: 'Test', lastName: 'Test', age: 10 },
	{ firstName: 'Test1', lastName: 'Test1', age: 11 },
	{ firstName: 'Test2', lastName: 'Test2', age: 12 },
	{ firstName: 'Test3', lastName: 'Test3', age: 13 },
	{ firstName: 'Test4', lastName: 'Test4', age: 14 },
	{ firstName: 'Test5', lastName: 'Test5', age: 15 },
	{ firstName: 'Test6', lastName: 'Test6', age: 16 },
	{ firstName: 'Test7', lastName: 'Test7', age: 17 },
	{ firstName: 'Test8', lastName: 'Test8', age: 18 },
	{ firstName: 'Test9', lastName: 'Test9', age: 19 },
])
// db.coll.insert() method is depracated.

/* SELECT */
// db.coll.findOne( { filters }, { fields } )
// db.coll.find( { filters }, { fields } )
db.users.find()
db.users.find({ firstName: 'Test' })
db.users.find({/* all */ }, { firstName: true, lastName: true }) // Select Fields
db.users.find({/* all */ }, { _id: 0, firstName: 1, lastName: 1 }) // Select Fields
db.users.findOne()
db.users.findOne({ firstName: 'Test' })
db.users.distinct('firstName') // get only firstName in array.

// Comparison:
db.users.find({ 'age': { $exists: true } }) // if exists
db.users.find({ 'age': { $eq: 15 } }) // == : equal
db.users.find({ 'age': { $ne: 15 } }) // <> : not equal
db.users.find({ 'age': { $gt: 15 } }) // > : greather than
db.users.find({ 'age': { $gte: 15 } }) // >= : greather than equal
db.users.find({ 'age': { $lt: 15 } }) // <= : less than equal
db.users.find({ 'age': { $lte: 15 } }) // <= : less than equal
db.users.find({ 'age': { $in: [10, 11, 12] } }) // in list
db.users.find({ 'age': { $nin: [10, 11, 12] } }) // not in list

// Regex:
// mongodb.com/docs/manual/reference/operator/query/regex/
db.coll.find({ firstName: { $regex: 'Test' } }) // Contains 'Test'
db.users.find({
  firstName: { $regex: 'Test', $options: 'i' }
})
db.users.find({ firstName: /Test/ }) // Contains 'Test'
db.users.find({ firstName: /test/i }) // Case-InSensitive
db.users.find({ firstName: /^Test/ }) // StartsWith 'Test'
db.users.find({ firstName: /Test$/ }) // EndsWith 'Test'

// Logical:
db.users.find({ 'age': { $not: { $eq: 15 } } }) // NOT {EQUAL}
db.users.find({ 'firstName': 'Test6', 'age': 16 }) // default: AND
db.users.find({ $and: [{ 'firstName': 'Test6' }, { 'age': 16 }] }) // AND
db.users.find({ $or: [{ 'firstName': 'Test6' }, { 'age': 15 }] }) // OR
db.users.find({ $nor: [{ 'firstName': 'Test6' }, { 'age': 15 }] }) // NOT OR

// Limit:
db.users.find().limit(5) // LIMIT 5
db.users.find().skip(5).limit(5) // LIMIT 5, 5

// Sort (1:ASC, -1:DESC):
db.users.find().sort({ age: -1 }).limit(5)
db.users.find().sort({ age: 1 }).limit(5)

// Sort (asc: A-Z, desc: Z-A):
db.users.find().sort({ age: 'asc' }).limit(5)
db.users.find().sort({ age: 'desc' }).limit(5)

// Count:
db.users.countDocuments() // ShortHand find().count()
db.users.countDocuments({ firstName: 'Test' })
db.users.estimatedDocumentCount() // for bigData
// db.users.find().count() // deprecated.
// db.users.count() method is depracated.


// UPDATE:
// db.users.updateOne( { filters }, { $set: { new_values } } )
// db.users.updateMany( { filters }, { $set: { new_values } } )
db.users.updateOne({ age: 19 }, { $set: { age: 199 } }) // Add/Update field
db.users.updateOne({ age: 19 }, { $set: { new_fields: 'new_value' } }) // Add/Update field
db.users.updateOne({ age: 19 }, { $set: { new_fields: 'new_value2' } }) // Add/Update field
db.users.updateMany({ age: 19 }, { $set: { new_fields: 'new_value3' } }) // Add/Update field
db.users.updateMany({/* all */ }, { $unset: { new_fields: 0 } }) // Drop field
db.users.updateMany({/* all */ }, { $currentDate: { updated_at: true } }) // set currentDate to field
db.users.updateMany({/* all */ }, { $inc: { age: 2 } }) // increment (age+2) field
db.users.updateMany({/* all */ }, { $rename: { updated_at: 'updated' } }) // rename field
// db.users.update() method is depracated.


// DELETE:
// db.users.deleteOne( { filters } )
// db.users.deleteMany( { filters } )
db.users.deleteOne({ age: 19 })
db.users.deleteMany({ age: 19 })
db.users.deleteMany({/* all */ }) // Delete all documents.
// db.users.remove() method is depracated.