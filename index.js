const app = require('./server/app');
const { syncAndSeed } = require('./server/db');

const init = async()=> {
  try {
    // await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

init();