const router = require('express').Router();
const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");

router.get('/', function (req, res, next) {
    res.status(200).json({
        code: 'SUCCESS',
        message: 'request GET is success'
    });
    next();
});

router.get('/tasks', async function(req, res, next){
	try
	{
		const { endpoint, key, databaseId, containerId } = config;
		const client = new CosmosClient({ endpoint, key });
		const database = client.database(databaseId);
		const container = database.container(containerId);

		// <QueryItems>
		console.log(`Querying container: Items`);

		// query to return all items
		const querySpec = { query: "SELECT * from c" };

		// read all items in the Items container
		const { resources: items } = await container.items
		.query(querySpec)
		.fetchAll();

		items.forEach(item => {
			console.log(`${item.id} - ${item.description}`);
		});
		
		//let items = [1,2,3];
		return res.status(200).json({ success: true, data: items });
	}
	catch(err){
		next(err);
	}
});

module.exports = router;