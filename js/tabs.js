document.querySelectorAll(".tab-container").forEach((container) => {
    const tabs = container.querySelectorAll(".tab");
    const contents = container.querySelectorAll(".tab-content");

    function setActive(index) {
        tabs.forEach((tab, i) => {
            tab.classList.toggle("active", i === index);
            contents[i].classList.toggle("active", i === index);
        });
    }

    // Gán click cho mỗi tab
    tabs.forEach((tab, i) => {
        tab.addEventListener("click", () => setActive(i));
    });

    // Tìm tab đang active mặc định
    const defaultIndex = Array.from(tabs).findIndex((tab) =>
        tab.classList.contains("active")
    );
    if (defaultIndex !== -1) {
        setActive(defaultIndex);
    } else {
        setActive(0);
    }

    // Gán phím tắt
    document.addEventListener("keydown", (e) => {
        const key = Number(e.key);
        if (key >= 1 && key <= tabs.length) {
            setActive(key - 1);
        }
    });
});
