import { render, waitForElement } from '@testing-library/vue';
import Users from '@/components/Users';
import { makeServer } from '@/server';
import { Response } from 'miragejs';

let server;

beforeEach(() => (server = makeServer('test')));

afterEach(() => server.shutdown());

describe('Users.vue', () => {
  it('renders 10 paragraphs when server returns 10 users', async () => {
    server.createList('user', 10);
    const { getAllByTestId } = render(Users);
    const users = await waitForElement(() => getAllByTestId('user'));
    expect(users.length).toBe(10);
  });

  it('renders error message when server is down', () => {
    server.get('users', () => new Response(500, {}, 'Server is down'));
    const { getByText } = render(Users);
    const error = waitForElement(() => getByText('Server is down'));
    expect(error).toBeDefined();
  });

  it('renders max of 10 paragraphs even if server returns more than that', async () => {
    server.createList('user', 100);
    const { getAllByTestId } = render(Users);
    const users = await waitForElement(() => getAllByTestId('user'));
    expect(users.length).toBe(10);
  });
});
