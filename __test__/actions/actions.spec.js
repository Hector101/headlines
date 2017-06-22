import sinon from 'sinon';
import Dispatcher from '../../src/flux/dispatcher/dispatcher';
import Actions from '../../src/flux/actions/Actions';
import Api from '../../src/api/api';
import store from '../../src/flux/store/store';
import mockSources from '../../src/__mock__/sources.json';
import mockArticles from '../../src/__mock__/articles.json';
import Auth from '../../src/auth/auth';

jest.mock('../../src/api/api', () => ({
  getSources: () => Promise.resolve({ sources: mockSources.sources }),
  getArticles: () => Promise.resolve({ articles: mockArticles.articles }),
}));

describe('When Actions', () => {
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

  describe('Action,', () => {
    describe('get sources and articles method', () => {
      it('getSources is called, ApiGetSources to be called', () => {
        Actions.getSources();
        expect(ApiGetSources.called).toBeTruthy();
      });
      it('getArticles is called with two parameter, ApiGetArticles to be called', () => {
        Actions.getArticles('cnn', 'top');
        expect(ApiGetArticles.called).toBeTruthy();
      });
      it('getArticles is called with one parameter, ApiGetArticles to be called', () => {
        Actions.getArticles('cnn');
        expect(ApiGetArticles.called).toBeTruthy();
      });
      it('selectedSource is called, Dispatcher is called', () => {
        Actions.selectedSource('cnn');
        expect(selectedSourceMock.called).toBe(true);
        expect(DispatcherMock.called).toBe(true);
      });
    });
    describe('for authentication', () => {
      it('getAuth to be called with a string parameter', () => {
        Actions.getAuth(true);
        expect(selectedSourceMock.called).toBe(true);
      });
      it('store should update and return "true" which is the dispatched payload ', () => {
        Actions.getAuth(true);
        expect(store.getAuth()).toBe(true);
      });
    });
  });
});
