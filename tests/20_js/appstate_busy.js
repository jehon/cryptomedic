
describe('appState', function() {
  it('should handle busy / ready', function() {
    expect(appState().store.getState().state.busy).toBe(0);
    expect(appState().store.getState().state.max).toBe(0);
    expect(appState().store.getState().state.messages).toBe('');

    appState().dispatch(appState().catalog.STATE_BUSY, 'test');
    expect(appState().store.getState().state.busy).toBe(1);
    expect(appState().store.getState().state.max).toBe(1);

    appState().dispatch(appState().catalog.STATE_BUSY, 'test');
    expect(appState().store.getState().state.busy).toBe(2);
    expect(appState().store.getState().state.max).toBe(2);

    appState().dispatch(appState().catalog.STATE_BUSY, 'test');
    expect(appState().store.getState().state.busy).toBe(3);
    expect(appState().store.getState().state.max).toBe(3);

    appState().dispatch(appState().catalog.STATE_READY);
    expect(appState().store.getState().state.busy).toBe(2);
    expect(appState().store.getState().state.max).toBe(3);

    appState().dispatch(appState().catalog.STATE_READY);
    expect(appState().store.getState().state.busy).toBe(1);
    expect(appState().store.getState().state.max).toBe(3);

    appState().dispatch(appState().catalog.STATE_BUSY, 'test');
    expect(appState().store.getState().state.busy).toBe(2);
    expect(appState().store.getState().state.max).toBe(4);

    appState().dispatch(appState().catalog.STATE_READY);
    expect(appState().store.getState().state.busy).toBe(1);
    expect(appState().store.getState().state.max).toBe(4);

    appState().dispatch(appState().catalog.STATE_READY);
    expect(appState().store.getState().state.busy).toBe(0);
    expect(appState().store.getState().state.max).toBe(0);
    expect(appState().store.getState().state.messages).toBe('');
  });

  it('should handle clear', function() {
    expect(appState().store.getState().state.busy).toBe(0);
    expect(appState().store.getState().state.max).toBe(0);
    expect(appState().store.getState().state.messages).toBe('');

    appState().dispatch(appState().catalog.STATE_BUSY, 'test');
    expect(appState().store.getState().state.busy).toBe(1);
    expect(appState().store.getState().state.max).toBe(1);

    appState().dispatch(appState().catalog.STATE_CLEAR);
    expect(appState().store.getState().state.busy).toBe(0);
    expect(appState().store.getState().state.max).toBe(0);
    expect(appState().store.getState().state.messages).toBe('');
  });
});

