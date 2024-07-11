
const schedule = require('node-schedule');
const db = require('../models/index');
const { Op } = require('sequelize');

const updateOccupancyStatus = async () => {
    const now = new Date();
    try {
        await db.Room.update(
            { vacancy: false },
            {
                where: {
                    occupancyDate: {
                        [Op.lte]: now
                    },
                    vacancy: true
                }
            }
        );
        console.log('Occupancy status updated');
    } catch (error) {
        console.error('Error updating occupancy status:', error);
    }
};

const updateVacancyStatus = async () => {
    const now = new Date();
    try {
        await db.Room.update(
            { vacancy: true },
            {
                where: {
                    vacancyDate: {
                        [Op.lte]: now
                    },
                    vacancy: false
                }
            }
        );
        console.log('Vacancy status updated');
    } catch (error) {
        console.error('Error updating vacancy status:', error);
    }
};


schedule.scheduleJob('0 0 * * *', async () => {
    console.log('Running updateOccupancyStatus job');
    await updateOccupancyStatus();

    console.log('Running updateVacancyStatus job');
    await updateVacancyStatus();
});
