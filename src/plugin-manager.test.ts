import PluginManager from './plugin-manager';

describe('Plugin Manager', () => {
  let plugMan: PluginManager;

  beforeEach(() => {
    plugMan = new PluginManager();
  });

  it('can be instantiated', () => {
    expect(plugMan instanceof PluginManager).toBe(true);
  });
});
