'use strict'

'use strict';

module.exports = async (req, res, next) => {
    //* FILTRING & SEARCHING & SORTING & PAGINATION

    // Filter: searches for absolute equality, Search: searches for partial equality.

    //* Filter: 
    // URL/?filter[fieldName]=value&filter[fieldName2]=value2
    const filter = req.query?.filter || {}

    //* Search: 
    // URL/?search[fieldName]=value&search[fieldName2]=value2
    const search = req.query?.search || {}

    // {field: { $regex: 'value', $options: 'i' }} // this is how mongodb expect search
    // {content: {$regex: 'test 1', $options: 'i'}}

    // console.log(search.content)
    // console.log(search['content'])
    for (let key in search) search[key] = { $regex: search[key], $options: 'i' }

    //* Search: 
    // URL/?sort[fieldName]=value&sort[fieldName2]=value2
    const sort = req.query?.sort || {}

    //? PAGINATION:
    // URL/?page=3&limit=20&skip=20

    //* Page: 
    let page = parseInt(req.query?.page)
    page = page > 0 ? page : 1;

    //* limit: 
    let limit = parseInt(req.query?.limit)
    limit = limit > 0 ? limit : 20;

    //* skip: 
    let skip = parseInt(req.query?.skip)
    skip = skip > 0 ? skip : (page - 1) * limit

    res.getModelList = async (Model, populate = null) => {
        return await Model.find({ ...search, ...filter }, { __v: 0 })
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .populate(populate);

    }

    next();
}