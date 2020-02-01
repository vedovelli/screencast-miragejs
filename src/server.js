import { Server, Model, Factory, Response } from 'miragejs';
import faker from 'faker';
import products from './mocks/products.json';

export function makeServer(environment = 'development') {
  return new Server({
    environment,

    models: {
      user: Model,
      product: Model,
    },

    factories: {
      user: Factory.extend({
        name() {
          return faker.fake('{{name.findName}}');
        },
        email() {
          return faker.fake('{{internet.email}}');
        },
        active() {
          return faker.fake('{{random.boolean}}');
        },
      }),
    },

    fixtures: {
      products,
    },

    seeds(server) {
      server.loadFixtures();
      server.createList('user', 5);
    },

    routes() {
      this.namespace = 'api';
      this.get('users', () => {
        return new Response(500, {}, 'O servidor morreu volte outro dia!');
      });
      this.resource('products');
    },
  });
}
