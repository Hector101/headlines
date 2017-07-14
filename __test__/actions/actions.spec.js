import sinon from 'sinon';
import Dispatcher from '../../src/flux/dispatcher/dispatcher';
import Actions from '../../src/flux/actions/Actions';
import Api from '../../src/api/api';
import store from '../../src/flux/store/store';
import mockSources from '../../src/__mock__/sources.json';
import mockArticles from '../../src/__mock__/articles.json';
// import Auth from '../../src/auth/auth';

jest.mock('../../src/api/api', () => ({
  getSources: () => Promise.resolve({ sources: mockSources.sources }),
  getArticles: () => Promise.resolve({ articles: mockArticles.articles }),
}));

describe('News Actions', () => {
  let DispatcherMock;
  const ApiGetSources = sinon.spy(Api, 'getSources');
  const ApiGetArticles = sinon.spy(Api, 'getArticles');
  const selectedSourceMock = sinon.spy(Actions, 'selectedSource');

  beforeEach(() => {
    DispatcherMock = sinon.spy(Dispatcher, 'dispatch');
  });
  afterEach(() => {
    DispatcherMock.restore();
  });
  describe('#getSources', () => {
    it('should create an get sources action', () => {
      Actions.getSources();
      expect(ApiGetSources.called).toBeTruthy();
    });
  });
  describe('#getArticles', () => {
    it('should create a get articles action when called with two parameters', () => {
      Actions.getArticles('cnn', 'top');
      expect(ApiGetArticles.called).toBeTruthy();
    });
    it('should create an action when called with one parameter', () => {
      Actions.getArticles('cnn');
      expect(ApiGetArticles.called).toBeTruthy();
    });
  });
  describe('#selectedSource', () => {
    Actions.selectedSource('cnn');
    it('should create a select sources actions', () => {
      expect(selectedSourceMock.called).toBe(true);
    });
  });
  describe('#getAuth', () => {
    it('store should update and return "true" which is the dispatched payload ', () => {
      Actions.getAuth(true);
      expect(store.getAuth()).toBe(true);
    });
  });
});
