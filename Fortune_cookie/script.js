function openCookie()
{

    let fortunes = [

        "Today will be your lucky day! 🍀",

        "Believe in yourself. ⭐",

        "Success is coming soon. 🚀",

        "A happy surprise is waiting for you. 🎁",

        "Keep smiling. Great things are ahead! 😊",

        "Your hard work will pay off. 💯"

    ];

    let random = Math.floor(Math.random() * fortunes.length);

    document.getElementById("cookie").innerHTML = "💥";

    document.getElementById("message").innerHTML = fortunes[random];

}