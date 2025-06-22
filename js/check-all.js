const wrappers = document.querySelectorAll(".checkbox-wrapper");

wrappers.forEach((wrapper) => {
    const mainCheckbox = wrapper.querySelector(".checkbox-all");
    const checkboxItems = wrapper.querySelectorAll(
        ".checkbox-list .checkbox-input"
    );
    const counter = wrapper.querySelector(".checkbox-counter");

    function updateMainCheckboxState() {
        const checkedCount = Array.from(checkboxItems).filter(
            (checkbox) => checkbox.checked
        ).length;

        const total = checkboxItems.length;

        mainCheckbox.checked = checkedCount === total;
        mainCheckbox.indeterminate = checkedCount > 0 && checkedCount < total;

        if (counter) {
            counter.textContent = `Checked: ${checkedCount}`;
        }
    }

    // Gắn sự kiện cho checkbox chính
    mainCheckbox.addEventListener("change", () => {
        checkboxItems.forEach(
            (checkbox) => (checkbox.checked = mainCheckbox.checked)
        );
        updateMainCheckboxState();
    });

    // Gắn sự kiện cho từng checkbox con
    checkboxItems.forEach((cb) => {
        cb.addEventListener("change", updateMainCheckboxState);
    });

    // Gọi lần đầu để sync trạng thái
    updateMainCheckboxState();
});
