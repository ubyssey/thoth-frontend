<div class="c-main">
    <h1>Hey</h1>

    <form method="POST" novalidate="">
        <label>Username
            <input type="text" id="username" name="username">
        </label>
        <label>Password
           <input type="password" id="password" name="password">
        </label>
        <input type="submit">
    </form>
</div>

<style lang="scss">
    .c-main {
        display: flex;
        flex-direction: column;
        > * {
            margin: auto;
        }
    }
    form {
        label {
            margin: 1em 0;
            display: block;
        }

    }
</style>