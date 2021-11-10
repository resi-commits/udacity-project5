// babel-polyfill because of ReferenceError: https://knowledge.udacity.com/questions/174638
import "babel-polyfill";
import { performAction } from "../client/js/tripplanner";

describe('Testing the performAction() function', () => {
  describe('performAction() function should exist', () => {
    test('It should return true', async () => {
      expect(performAction).toBeDefined();
    })
  })
  describe('performAction() function should be a function', () => {
    test('It should be a function', async () => {
      expect(typeof performAction).toBe('function');
    })
  })
})