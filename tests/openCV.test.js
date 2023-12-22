const openCV = require('../src/services/openCV');


describe('openCV file....', () => {
    //
    // base setup
    //
    test('should return true', () => {
        expect(openCV).toBeDefined();
        expect(openCV.config.getCurrentFPS()).toBe(1);
        expect(openCV.config.getCurrentSource()).toBe('webCamera');
    });
});
