const db = require('../lib/dbConnect');

// attribution: MovieHause Lab - Rafa, Bobby (GA)
function getAllGardens(req, res, next) {

  db.any('SELECT * FROM gardens;')
  .then((gardens) => {
    res.gardens = gardens;
    next();
  })
  .catch(error => next(error));
}


function getOneGarden(req, res, next) {
  // console.log('models/getGarden');
  // console.log('*******************', req.body);
  const gID = Number.parseInt(req.params.gardenID);
      db.any(`SELECT
        gardens.name AS name,
        quadrants.id AS quadrant,
        quadrants.user_id AS user,
        quadrants.produce_id AS produce
      FROM quadrants
      INNER JOIN gardens
        ON (quadrants.garden_id = gardens.id)
        WHERE gardens.id = $1
      `, gID)
    .then((gdata) => {
      res.garden = gdata;
      // console.log('in model ', gdata);
      next();
    })
    .catch(error => next(error));
  }

// Add new garden: (puppiesapi)
function addGarden(req, res, next) {
  db.none(`INSERT INTO gardens (name, zipcode, user_id)
    VALUES ($/name/, $/zipcode/, $/user_id/)
    ;`, req.body)
  .then(() => {
    next();
  })
}

// gets the id of the last garden, adds the id of the garden being built into each quadrant to save it into
// the quadrants table with the specific garden id it is part od
function getLastGardenId(req, res, next) {
  db.one('SELECT max(id) FROM gardens;')
  .then((data) => {
    let maxid = Number.parseInt(data.max);
    res.gardenid = maxid;
    let user = 1;
    let produce = 1;
    // console.log('id garden is', maxid);
      db.none(`
        INSERT INTO quadrants (garden_id)
        VALUES ($1), ($1), ($1), ($1), ($1), ($1), ($1), ($1), ($1);
        `, maxid)
      .then(() => {
      next();
      })
    })
  .catch(error => next(error));
}

// function getLastGardenId(req, res, next) {
//   db.one('SELECT max(id) FROM gardens;')
//   .then((data) => {
//     let maxid = Number.parseInt(data.max);
//     res.gardenid = maxid;
//     let user = 1;
//     let produce = 1;
//     // console.log('id garden is', maxid);
//     for(let i = 0; i < 5; i++) {
//       db.none(`
//         INSERT INTO quadrants (garden_id)
//         VALUES ($1);
//         `, maxid)
//       .then(() => {
//       next();
//       })
//     }
//   })
//   .catch(error => next(error));
// }

function postToQuadrant(req, res, next) {
  db.none(
    `UPDATE quadrants
    SET
      produce_id = $/prod_quad/,
      user_id = $/user_quad/
    WHERE id = $/quad_id/
    ;`, req.body)
  .then(() => {
    next();
  })
  .catch(error => next(error));
}

// function showMovie(req, res, next) {
//   db.any(`SELECT * FROM currentmovies WHERE currentmovies.id = $1;`, [req.params.id])
//   .then((movie) => {
//     res.movie = movie;
//     console.log('****************models/showMovie');
//     next();
//   })
//   .catch(error => console.log(error));
// }

// function deleteMovie(req, res, next) {
//   db.none(`DELETE FROM currentmovies WHERE id = $1;`, [req.params.id])
//     .then(next())
//     .catch(err => next(err));
// }

module.exports = {
  getAllGardens,
  getOneGarden,
  addGarden,
  getLastGardenId,
  postToQuadrant,
  // displayGardenAndQuadrants,
  // addMovie,
  // showMovie,
  // deleteMovie
};
