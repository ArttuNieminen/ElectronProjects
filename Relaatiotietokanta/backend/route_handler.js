const requestControl = require('./controllers/requests_control'); 

function setupRoutes(app) {

  //GET
  app.get('/:table', async (req, res) => {
    try {
      const data = await requestControl.getAllFromTable(req.params.table);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  //post needed to send body
  app.post('/any', async (req, res) => {
    try {
      const data = await requestControl.getAnyFromTable(req, res);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/search', async (req, res) => {
    try {
      const data = await requestControl.getSearchResults(req, res);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  // POST
  app.post('/:table', async (req, res) => {
    try {
      await requestControl.postToTable(req.params.table, req, res);
      res.status(200).send('Successfully inserted to table');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // UPDATE
  app.put('/', async (req, res) => {
    try {
      await requestControl.updateAnyRow(req, res);
      res.status(200).send('Succesfully updatet');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // DELETE
  app.delete('/', async (req, res) => {
    try {
      await requestControl.deleteAnyRow(req, res);
      res.status(200).send('Succesfully delett');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
}

module.exports = setupRoutes;
