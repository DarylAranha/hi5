let startConvo = document.getElementById('startConvo');

function startConversation(email) {
    console.log("Selected user:" + email);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/chat", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            // xhr.open("GET", "/chatRoom");
            window.location.assign(this.responseText);
        }
    };
    xhr.send(JSON.stringify({
        email: email
    }));
}