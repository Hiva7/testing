document.documentElement.style.height = "100%";
document.body.style.height = "100%";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.flexDirection = "column";

const user = document.createElement("input");
document.body.appendChild(user);
user.placeholder = "Enter username here";
user.style.margin = "1%";
user.style.textAlign = "center";
user.style.border = "2px solid black";
user.style.borderRadius = "4px";
user.style.width = "250px";
user.maxLength = "20";

const chatbox = document.createElement("div");
document.body.appendChild(chatbox);
chatbox.style.display = "flex";
chatbox.style.flexDirection = "column";
chatbox.style.border = "2px solid black";
chatbox.style.width = "300px";
chatbox.style.height = "500px";
chatbox.style.padding = "1%";
chatbox.style.borderRadius = "10px";
chatbox.style.overflowWrap = "break-word";

const input = document.createElement("div");
chatbox.appendChild(input);
input.style.width = "100%";

const inputMessage = document.createElement("input");
input.appendChild(inputMessage);
inputMessage.style.width = "79%";
inputMessage.style.border = "2px solid black";
inputMessage.style.borderRadius = "5px";

const sendButton = document.createElement("button");
input.appendChild(sendButton);
sendButton.style.marginLeft = "2%";
sendButton.innerHTML = "Send";
sendButton.style.cursor = "pointer";

function sendMessage() {
    if (inputMessage.value !== "") {
        // Show message and username
        let username = user.value;
        if(username === ""){
            username = "Anonymous";
        }
        else if(username === "Dev"){
            username = "Imposter";
        }
        else if(username === "69420"){
            username = "<span style='color: red;'>Dev</span>";
        }
        const message = document.createElement("p");
        if(username !== "Dev"){
        message.innerHTML = `<span style="color: green;">${username}</span> : ${inputMessage.value}`;
        }
        else{
            message.innerHTML = `${username} : ${inputMessage.value}`;
        }
        spacer.appendChild(message);
        spacer.scrollTop = spacer.scrollHeight;

        // Add leading zeros to day, month, hours, minutes, and seconds if necessary
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1; // getMonth() returns a zero-based value (0-11)
        let year = currentDate.getFullYear();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        let seconds = currentDate.getSeconds();
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        let formattedDateTime = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;

        // Send an HTTP POST request to the web app URL
        const webAppUrl = 'https://script.google.com/macros/s/AKfycbzeMoJbeIsEbcja-PP7PJmaqeevo9mv33_5ZdTM_TgpspfS8prk8O6-GDp2b8SPhmNq/exec'; // Replace with your web app URL
        const data = new FormData();
        data.append('action', 'adduser');
        data.append('date', formattedDateTime);
        data.append('message', inputMessage.value);
        data.append('username', username);

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

let lastUpdate

async function loadNames() {
    const response = await fetch(
        `https://script.google.com/macros/s/AKfycbzgKc9o6S7J22XfuhlqNLlbvApcFJgrTYxLtOWc1vn_YP9YwWrVygdLdIuBVwhh7EyL/exec?action=getuser&timestamp=${lastUpdate}`
    );
    const arr = await response.json();

    // Clear previous messages
    spacer.innerHTML = "";

    arr.forEach((element) => {
        const message = document.createElement("p");
        message.innerHTML = `<span style="color: green;">${element.username}</span> : ${element.message}`;
        spacer.appendChild(message);
        spacer.scrollTop = spacer.scrollHeight;
    });

    // Update lastUpdate to current time
    lastUpdate = Date.now();
}

// Call loadNames every 5 seconds
loadNames();
setInterval(loadNames, 5000);

const spacer = document.createElement("div");
spacer.style.flexGrow = "1";
chatbox.insertBefore(spacer, input);
spacer.style.overflowY = "auto";
spacer.style.overflowX = "hidden";