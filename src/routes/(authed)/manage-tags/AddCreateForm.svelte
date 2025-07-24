<script>
    function setFocus(e) {
        e.target.parentElement.getElementsByTagName("input")[0].focus();
    }
</script>

<button class="o-add-button" onclick={setFocus}>+</button>