const router = require("express").Router()

const Place = require('../models/Place.model')

// CREAR

router.get("/crear", (req, res, next) => res.render("places/new-place"))

router.post("/crear", (req, res, next) => {


    const { name, type, lat, lng } = req.body

    const location = {
        type: 'Point',
        coordinates: [lat, lng]
    }


    Place
        .create({ name, type, lat, lng })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

// MOSTRAR LISTADO

router.get("/places", (req, res) => {

    Place
        .find()
        .then(places => res.render('places/view-places', { places }))
        .catch(err => console.log(err))
})

// ELIMINAR

router.get('/places/delete/:id', (req, res) => {

    const { id } = req.params

    Place
        .findByIdAndRemove(id)
        .then(() => res.redirect("/places"))
        .catch(err => console.log(err))
})


// EDITAR PERFIL 

router.get('/places/editar/:place_id', (req, res) => {

    const { place_id } = req.params

    Place
        .findById(place_id)
        .then(thePlace => res.render(`places/edit-place`, thePlace))
        .catch(err => console.log(err))
})

router.post('/places/editar/:user_id', (req, res) => {

    const { place_id } = req.params
    const { name, type, lat, lng } = req.body

    User
        .findByIdAndUpdate(place_id, { name, type, lat, lng }, { new: true })
        .then(() => res.redirect("/places"))
        .catch(err => console.log(err))
})

module.exports = router;
