
describe('appState', function() {
  it('should handle busy / ready', function() {
    expect(appState().store.getState().state.busy).toBe(0);
    expect(appState().store.getState().state.max).toBe(0);
    expect(appState().store.getState().state.messages).toBe('');

    appState().actions.state.busy('test');
    expect(appState().store.getState().state.busy).toBe(1);
    expect(appState().store.getState().state.max).toBe(1);

    appState().actions.state.busy('test');
    expect(appState().store.getState().state.busy).toBe(2);
    expect(appState().store.getState().state.max).toBe(2);

    appState().actions.state.busy('test');
    expect(appState().store.getState().state.busy).toBe(3);
    expect(appState().store.getState().state.max).toBe(3);

    appState().actions.state.ready();
    expect(appState().store.getState().state.busy).toBe(2);
    expect(appState().store.getState().state.max).toBe(3);

    appState().actions.state.ready();
    expect(appState().store.getState().state.busy).toBe(1);
    expect(appState().store.getState().state.max).toBe(3);

    appState().actions.state.busy('test');
    expect(appState().store.getState().state.busy).toBe(2);
    expect(appState().store.getState().state.max).toBe(4);

    appState().actions.state.ready();
    expect(appState().store.getState().state.busy).toBe(1);
    expect(appState().store.getState().state.max).toBe(4);

    appState().actions.state.ready();
    expect(appState().store.getState().state.busy).toBe(0);
    expect(appState().store.getState().state.max).toBe(0);
    expect(appState().store.getState().state.messages).toBe('');
  });

  it('should handle clear', function() {
    expect(appState().store.getState().state.busy).toBe(0);
    expect(appState().store.getState().state.max).toBe(0);
    expect(appState().store.getState().state.messages).toBe('');

    appState().actions.state.busy('test');
    expect(appState().store.getState().state.busy).toBe(1);
    expect(appState().store.getState().state.max).toBe(1);

    appState().actions.state.clear();
    expect(appState().store.getState().state.busy).toBe(0);
    expect(appState().store.getState().state.max).toBe(0);
    expect(appState().store.getState().state.messages).toBe('');
  });
});

