document.documentElement.style.height = "100%";
document.body.style.height = "100%";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";

const chatbox = document.createElement("div");
document.body.appendChild(chatbox);
chatbox.style.display = "flex";
chatbox.style.flexDirection = "column";
chatbox.style.border = "2px solid black";
chatbox.style.width = "500px";
chatbox.style.height = "500px";
chatbox.style.padding = "10px";
chatbox.style.borderRadius = "10px";

const welcome = document.createElement("div");
chatbox.appendChild(welcome);
welcome.style.display = "flex";
welcome.style.justifyContent = "center";

const welcomeMessage = document.createElement("p1");
welcome.appendChild(welcomeMessage);
welcomeMessage.innerHTML = "Welcome to chat";

const input = document.createElement("div");
chatbox.appendChild(input);
input.style.width = "100%";

const inputMessage = document.createElement("input");
input.appendChild(inputMessage);
inputMessage.style.width = "82%";

const sendButton = document.createElement("button");
input.appendChild(sendButton);
sendButton.style.marginLeft = "2%";
sendButton.innerHTML = "Send";

function sendMessage() {
    if (inputMessage.value !== "") {
        const message = document.createElement("p");
        message.innerHTML = inputMessage.value;
        spacer.appendChild(message);
        spacer.scrollTop = spacer.scrollHeight;
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1; // getMonth() returns a zero-based value (0-11)
        let year = currentDate.getFullYear();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        let seconds = currentDate.getSeconds();

        // Add leading zeros to day, month, hours, minutes, and seconds if necessary
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        let formattedDateTime = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;

        console.log(formattedDateTime);

        // Send an HTTP POST request to the web app URL
        const webAppUrl = 'https://script.google.com/macros/s/AKfycbxOo4uca61YyazlOMx56h_uzC0Y0JW9-_FUPoah7ZNwNtx2QHyhPjDP6u34xSqLjaVL/exec'; // Replace with your web app URL
        const data = new FormData();
        data.append('action', 'adduser');
        data.append('date', formattedDateTime);
        data.append('message', inputMessage.value);

        fetch(webAppUrl, {
            method: 'POST',
            body: data
        })
            .then(response => response.text())
            .then(text => console.log(text));
    }
    inputMessage.value = "";
}

sendButton.addEventListener("click", sendMessage);

inputMessage.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

const spacer = document.createElement("div");
spacer.style.flexGrow = "1";
chatbox.insertBefore(spacer, input);
spacer.style.overflowY = "auto";

