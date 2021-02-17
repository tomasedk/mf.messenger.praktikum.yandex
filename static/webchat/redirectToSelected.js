Array.from(document.getElementsByClassName("chat"))?.forEach(chatNode => {
    chatNode?.addEventListener('click', function () {
        window.location.href = "selected.html";
    });
})