const express = require('express');
const app = express();
const port = 9992;
const mongoose = require('mongoose');
var routes=require("./route/routes");
mongoose.set("strictQuery",false);
const cors=require('cors')

app.use(cors({
  origin:"http://localhost:4200"
}))


mongoose.connect("mongodb://localhost:27017/TQL", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    app.listen(port, () => {
      console.log(`DB connected started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Couldn't connect to MongoDB:", err);
  });

  app.use(express.json());
  app.use(routes)
//   if (typeof routes === 'function' || typeof routes === 'object') {
//     app.use(routes);
//   } else {
//     console.error('Error: routes is not a valid middleware function or router instance.');
//   }
  
//   // Start the server...
//   app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
//   });