// babel-polyfill because of ReferenceError: https://knowledge.udacity.com/questions/174638
import "babel-polyfill";
import { checkForRequiredData, calculateCountdown, calculateDuration } from "../client/js/helpers";

// Test checkForRequiredData()
describe('Testing the checkForRequiredData() function', () => {
  describe('checkForRequiredData() function should exist', () => {
    test('It should return true', async () => {
      expect(checkForRequiredData).toBeDefined();
    })
  })
  describe('checkForRequiredData() function should be a function', () => {
    test('It should be a function', async () => {
      expect(typeof checkForRequiredData).toBe('function');
    })
  })
  describe('checkForRequiredData() function with valid input', () => {
    test('It should return true', async () => {
      const res = checkForRequiredData('Berlin');
      expect(res).toBe(true);
    })
  })
  describe('checkForRequiredData() function with invalid input', () => {
    test('It should return false', async () => {
      const res = checkForRequiredData('');
      expect(res).toBe(false);
    })
  })
})

// Test calculateCountdown()
describe('Testing the calculateCountdown() function', () => {
  describe('calculateCountdown() function should exist', () => {
    test('It should return true', async () => {
      expect(calculateCountdown).toBeDefined();
    })
  })
  describe('calculateCountdown() function should be a function', () => {
    test('It should be a function', async () => {
      expect(typeof calculateCountdown).toBe('function');
    })
  })
})

// Test calculateDuration()
describe('Testing the calculateDuration() function', () => {
  describe('calculateDuration() function should exist', () => {
    test('It should return true', async () => {
      expect(calculateDuration).toBeDefined();
    })
  })
  describe('calculateDuration() function should be a function', () => {
    test('It should be a function', async () => {
      expect(typeof calculateDuration).toBe('function');
    })
  })
})