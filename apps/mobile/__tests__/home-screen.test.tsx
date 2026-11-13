import { renderRouter, screen } from 'expo-router/testing-library';

describe('Home screen', () => {
  it('renders the app title at the root route', async () => {
    await renderRouter('./src/app');

    expect(screen).toHavePathname('/');
    expect(screen.getByText('Entlang')).toBeOnTheScreen();
  });
});
