<script>
    function setFocus(e) {
        e.target.parentElement.getElementsByTagName("input")[0].focus();
    }
</script>

<button onclick={setFocus}>+</button>

<style lang="scss">
    button {
        display: inline-block;
        border-radius: 100%;
        border: none;

        background-color: var(--grey-0);

        color: var(--grey-2);

        cursor: pointer;
    }
</style>