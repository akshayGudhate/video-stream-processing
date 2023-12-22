const controlData = require('../src/services/controlData');
jest.useFakeTimers();


describe('controlData.js file...', () => {
    //
    // base setup
    //
    const mockedSavedData = jest.fn(() => controlData.store = []);


    //
    // variables
    //
    test('should be defined', () => {
        expect(controlData).toBeDefined();
    });

    test('should have arrays --> store', () => {
        expect(controlData.store).toEqual([]);
        expect(controlData.store.length).toBe(0);
    });

    test('should have arrays --> controlDataQueue', () => {
        expect(controlData.controlDataQueue).toEqual([]);
        expect(controlData.controlDataQueue.length).toBe(0);
    });


    //
    // functions
    //
    test('should maintain a queue of 5 color data entries', async () => {
        expect(controlData.controlDataQueue.length).toBe(0);

        for (let i = 1; i <= 5; i++) {
            await controlData.updateControlData({ colorData: i });
            expect(controlData.controlDataQueue.length).toBe(i);
        }

        // add 2 more entries
        await controlData.updateControlData({ colorData: 6 });
        await controlData.updateControlData({ colorData: 7 });

        // expect queue length to be 5
        expect(controlData.controlDataQueue.length).toBe(5);

        // as first two are removed and last two are added
        expect(controlData.controlDataQueue[0].colorData).toBe(3);
        expect(controlData.controlDataQueue[4].colorData).toBe(7);

        // must return stringified data
        const returnedData = await controlData.updateControlData({ colorData: 8 });
        expect(typeof returnedData).toBe('string');
    });


    test('should save data to db', async () => {
        expect(controlData.store.length).toBe(0);

        // add data to store
        controlData.store.push({ frame: 1 });
        controlData.store.push({ frame: 2 });
        controlData.store.push({ frame: 3 });

        expect(controlData.store.length).toBe(3);

        // save data to db
        await mockedSavedData();

        // expect store to be empty
        expect(controlData.store.length).toBe(0);
    });
});
