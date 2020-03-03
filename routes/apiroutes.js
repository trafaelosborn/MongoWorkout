var db = require("../models")

function apiroutes(app) {
    // app.get("/api/workouts", function(req,res) {
    //     db.Workout.find({}).then(function(data){
    //         res.json(data)
    //     })
    // })
    app.get("/api/workouts", (req, res) => {
        db.Workout.find()
          .then(dbWorkouts => {
            res.json(dbWorkouts);
          })
          .catch(err => {
            res.json(err);
          });
      });

     app.get("/api/workouts/range", ({ query }, res) => {
        db.Workout.find({ day: { $gte: query.start, $lte: query.end } })
          .then(dbWorkouts => {
            res.json(dbWorkouts);
          })
          .catch(err => {
            res.json(err);
          });
      });

      app.post("/api/workouts", (req, res) => {
        db.Workout.create({})
          .then(dbWorkout => {
            res.json(dbWorkout);
          })
          .catch(err => {
            res.json(err);
          });
      });

      app.put("/api/workouts/:id", ({ body, params }, res) => {
        db.Workout.findByIdAndUpdate(
          params.id,
          { $push: { exercises: body } },
          { new: true, runValidators: true }
        )
          .then(dbWorkout => {
            res.json(dbWorkout);
          })
          .catch(err => {
            res.json(err);
          });
      });

      app.delete("/api/workouts", ({ body }, res) => {
        db.Workout.findByIdAndDelete(body.id)
          .then(() => {
            res.json(true);
          })
          .catch(err => {
            res.json(err);
          });
      });
      

}
module.exports = apiroutes

