const CronJob = require("cron").CronJob;					// nodejs cron scheduler
// services
const { saveToDB } = require('../services/controlData');	// control data


// cron job specifications
//  ┌────────────── second (optional)
//  │ ┌──────────── minute
//  │ │ ┌────────── hour
//  │ │ │ ┌──────── day of month
//  │ │ │ │ ┌────── month
//  │ │ │ │ │ ┌──── day of week
//  │ │ │ │ │ │
//  │ │ │ │ │ │
// (* * * * * *)


////////////////////
//    cron job    //
////////////////////

// save data to mongodb from store
// every minute
const updateStore = new CronJob(
	`0 */1 * * * *`,
	async () => {
		try {
			// save to db
			await saveToDB();
			
			console.info('Cron job ticked...');
		} catch (err) {
			console.error('Error in cron job!', err);
		}
	},
	null,
	false,
	"Asia/Kolkata"
);



module.exports = { updateStore };