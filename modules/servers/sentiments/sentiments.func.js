'use strict'

const {Vocabularies} = use('Models.Loader')
const {ObjectId} = use('Deps.Loader')
// const ObjectID = require('bson/lib/bson/objectid')
const docs = use('modules/globals/static/documentation/sentiments.docs')

function pagginate (dataCount, limit, page) {
    const pageCount = Math.floor(dataCount / limit)
    const skip = (page * limit) || 0
    page = page === 0 ? 1 : page
    return {
        total: dataCount,
        page_count: pageCount,
        current_count: 0,
        limit,
        page,
        skip
    }
}

module.exports = {
    main: async (request, response) => {
        response.send('user\'s server running...')
    },
    docs: async (request, response) => {
        response.render('docs/index', docs.publish())
    },
    apidocs: async (request, response) => {
        response.json(docs.publish())
    },
    vocabList: async (request, response, next) => {
        try {
            const {limit, page, sort} = request.validInput
            const q = await Vocabularies.query()
            const total = await q.find().count()
            let paggination = pagginate(total, limit, page)
            let v = q.find({})
            v = v.limit(limit || 10)
            v = v.skip(paggination.skip)
            if (sort === 'desc') v = v.sort({$natural: -1})
            v = await v.toArray()
            paggination.current_count = v.length
            response.apiCollection(v, paggination)
        } catch (e) {
            next(e)
        }
    },
    vocabOne: async (request, response, next) => {
        try {
            const _id = new ObjectId(request.params.id)
            const q = await Vocabularies.query().findOne({_id})
            response.apiCollection(q, {})
        } catch (e) {
            next(e)
        }
    },
    vocabNew: async (request, response, next) => {
        try {
            const {type, indo_key: idKey, en_key: enKey, sentiment, description} = request.validInput
            let data = {}
            data['type'] = type
            data['id_key'] = idKey || ''
            data['en_key'] = enKey || ''
            data['sentiment'] = sentiment || ''
            data['description'] = description || ''
            const q = await Vocabularies
                .query()
                .insert(data)
            response.apiCollection(q, {data})
        } catch (e) {
            next(e)
        }
    },
    vocabUpdate: async (request, response, next) => {
        try {
            const defaultDesc = request.config.default_vocab_desc
            const action = request.all.action
            if (action !== 'delete' && action !== 'update') throw new Error('action not valid!')
            const items = request.all.items
            if (items && items.length === 0) throw new Error('items not valid')
            let bulkOps = await Vocabularies.query().initializeUnorderedBulkOp({ w: 1 })
            for (let x of items) {
                let data = x.data
                const type = data.type.split('|')[0].trim()
                data['type'] = type
                data['indo_keyword'] = data.indo_keyword || ''
                data['en_keyword'] = data.en_keyword || ''
                data['description'] = data.description || defaultDesc[type]
                bulkOps.updateOne({ '_id': new ObjectId(x.id) }, { '$set': x.data }, { '$upsert': true })
            }
            bulkOps = await bulkOps.execute()
            response.apiCollection(bulkOps, {})
        } catch (e) {
            next(e)
        }
    },
    vocabDelete: async (request, response, next) => {
        try {
            response.apiCollection({})
        } catch (e) {
            next(e)
        }
    }
}
