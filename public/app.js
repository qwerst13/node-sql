new Vue({
  el: "#app",
  data() {
    return {
      isDark: true,
      show: true,
      todoTitle: "",
      todos: [],
    };
  },
  created() {
    fetch("/api/todo", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((todos) => {
        this.todos = todos;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    addTodo() {
      const title = this.todoTitle.trim();
      if (!title) {
        return;
      }
      fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      })
        .then((res) => res.json())
        .then(({ todo }) => {
          this.todos.push(todo);
          this.todoTitle = "";
        })
        .catch((err) => console.log(err));
    },
    removeTodo(id) {
      this.todos = this.todos.filter((t) => t.id !== id);
    },
    completeTodo(id) {
      fetch("/api/todo/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: true }),
      })
        .then((res) => res.json())
        .then(({ todo }) => {
          const index = this.todos.findIndex((item) => item.id === todo.id);
          this.todos[index].updatedAt = todo.updatedAt;
        })
        .catch((err) => console.log(err));
    },
  },
  filters: {
    capitalize(value) {
      return value.toString().charAt(0).toUpperCase() + value.slice(1);
    },
    date(value, withTime) {
      const options = {
        year: "numeric",
        month: "long",
        day: "2-digit",
      };

      if (withTime) {
        options.hour = "2-digit";
        options.minute = "2-digit";
        options.second = "2-digit";
      }

      return new Intl.DateTimeFormat("ru-RU", options).format(new Date(value));
    },
  },
});
