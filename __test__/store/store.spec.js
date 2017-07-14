import store from '../../src/flux/store/store';
import Dispatcher from '../../src/flux/dispatcher/dispatcher';
import mockSources from '../../src/__mock__/sources.json';


jest.mock('../../src/flux/dispatcher/dispatcher');
const mockDispatcher = Dispatcher.register.mock.calls[0][0];
const sourcesAction = {
  actionType: 'SOURCES',
  sources: mockSources.sources,
};
const authAction = {
  actionType: 'AUTH',
  authValue: true,
};

describe('News Store', () => {
  describe('instance', () => {
    it('should register a callback with the dispatcher', () => {
      expect(mockDispatcher.length).toBe(1);
    });
  });
  describe('#getSources', () => {
    it('should be initialized a null value', () => {
      expect(store.getSources()).toEqual(null);
    });
  });
  describe('#getArticles', () => {
    it('should be initialized a null value', () => {
      expect(store.getSources()).toEqual(null);
    });
  });
  describe('#getSources', () => {
    it('should return an array of sources', () => {
      mockDispatcher(sourcesAction);
      const result = (store.getSources());
      expect(result).toEqual(mockSources.sources);
    });
    it('sources id should be "abc-news-au"', () => {
      const result = (store.getSources());
      expect(result[0].id).toBe('abc-news-au');
    });
    it('sources id should be "ABC News (AU)"', () => {
      const result = (store.getSources());
      expect(result[0].name).toBe('ABC News (AU)');
    });
  });
  describe('#getAuth', () => {
    it('should return an initial value of false', () => {
      expect(store.getAuth()).toBe(false);
    });
  });

  describe('#getAuth', () => {
    it('should return true when auth action is created', () => {
      mockDispatcher(authAction);
      expect(store.getAuth()).toBe(true);
    });
  });
});
