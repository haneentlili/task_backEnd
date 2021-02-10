// import required essentials
const express = require('express');
// create new router
const router = express.Router();
const url = require('url');
// create a JSON data array
let data = [
    { id: 1, title: 'Create a project',  order: 1, completed: true },
    { id: 2, title: 'Take a cofféé',     order: 2, completed: true },
    { id: 3, title: 'Write new article', order: 3, completed: true },
    { id: 4, title: 'Walk toward home', order: 4, completed: false },
    { id: 5, title: 'Have some dinner', order: 5, completed: false },
];
// this end-point of an API returns JSON data array
router.get('/', function (req, res) {
    res.status(200).json(data);
});

// this end-point returns an object from a data array find by id
// we get `id` from URL end-points
router.get('/:id', function (req, res) {
    // find an object from `data` array match by `id`
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    // if object found return an object else return 404 not-found
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});
// this end-point returns an object from a data array find by title
// we get `title` from URL end-points
router.get('/title/:title', function (req, res) {
    // find an object from `data` array match by `title`
    let found = data.find(function (item) {
        return item.title === req.params.title.toString();
    });
    // if object found return an object else return 404 not-found
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});
// this end-point returns an array from a data array find by completed
// we get `completed` from URL end-points
router.get('/completed/:completed', function (req, res) {
    let found = data.filter(function (item) {
        return item.completed.toString() === req.params.completed.toString();
    });
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});
// this end-point returns an object from a data array find by order
// we get `order` from URL end-points
router.get('/order/:order', function (req, res) {
    // find an object from `data` array match by `order`
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.order);
    });
    // if object found return an object else return 404 not-found
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});
// CREATE
// this api end-point add new object to item list
// that is add new object to `data` array
router.post('/', function (req, res) {
    // get itemIds from data array
    let itemIds = data.map(item => item.id);
    // get orderNums from data array
    let orderNums = data.map(item => item.order);

    // create new id (basically +1 of last item object)
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
    // create new order number (basically +1 of last item object)
    let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;

    // create an object of new Item
    let newItem = {
        id: newId, // generated in above step
        title: req.body.title, // value of `title` get from POST req
        order: newOrderNum, // generated in above step
        completed: false, // default value is set to false
    };

    // push new item object to data array of items
    data.push(newItem);

    // return with status 201
    // 201 means Created. The request has been fulfilled and
    // has resulted in one or more new resources being created.
    res.status(201).json(newItem);
});
// UPDATE
// this api end-point update an existing item object
// for that we get `id` and `title` from api end-point of item to update
router.put('/:id', function (req, res) {
    // get item object match by `id`
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    // check if item found
    if (found) {
        let updated = {
            id: found.id,
            title: req.body.title, // set value of `title` get from req
            order: req.body.order, // set value of `order` get from req
            completed: req.body.completed // set value of `completed` get from req
        };

        // find index of found object from array of data
        let targetIndex = data.indexOf(found);

        // replace object from data list with `updated` object
        data.splice(targetIndex, 1, updated);

        // return with status 204
        // success status response code 204 indicates
        // that the request has succeeded
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});
module.exports = router;