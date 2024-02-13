const requestControl = require('./controllers/requests_control'); // Adjust the path accordingly

function setupRoutes(app) {
  app.get('/:table', async (req, res) => {
    try {
      const data = await requestControl.getAllFromTable(req.params.table);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/:table', async (req, res) => {
    try {
      await requestControl.postToTable(req.params.table, req, res);
      res.status(200).send('Successfully inserted to table');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
}

module.exports = setupRoutes;
