<template>
  <div class="hello">
    <h1>Users</h1>
    <div>
      <h3 v-if="error">{{ error }}</h3>
      <p v-else v-for="user in users" :key="user.id">
        <strong>{{ user.name }}</strong>
        <br />
        <em>{{ user.email }}</em>
        <br />
        Active: {{ user.active }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Users',
  data() {
    return {
      error: null,
      users: [],
      products: [],
    };
  },
  mounted() {
    axios
      .get('api/users')
      .then(res => {
        this.users = res.data.users;
      })
      .catch(error => (this.error = error.response.data));

    axios.get('api/products').then(res => {
      this.products = res.data.products;
    });
  },
};
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
