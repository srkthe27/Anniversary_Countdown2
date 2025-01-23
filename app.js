// document.getElementById("anniversary-form").addEventListener("submit", function (e) {
//     e.preventDefault();

//     // Clear previous results
//     document.getElementById("error-message").innerHTML = "";
//     document.getElementById("result").style.display = "none";

//     // Get user input values
//     const userAnniversary = document.getElementById("user-anniversary").value;
//     const userProposedAnniversary = document.getElementById("user-proposed-anniversary").value;

//     // Send data to backend API
//     axios.post("http://127.0.0.1:8000/calculate/", {
//         user_anniversary: userAnniversary,
//         user_proposed_anniversary: userProposedAnniversary
//     })
//     .then(function (response) {
//         const data = response.data;

//         // Parse server and target times
//         const serverTime = new Date(data.server_time);
//         const nextAnniversaryDate = new Date(data.next_anniversary_date);
//         const nextProposedAnniversaryDate = new Date(data.next_proposed_anniversary_date);

//         // Start countdown updates
//         function updateCountdown() {
//             const now = new Date(); // Current time on the client

//             // Calculate time differences
//             const countdownAnniversary = nextAnniversaryDate - now;
//             const countdownProposed = nextProposedAnniversaryDate - now;

//             // Function to format countdown time
//             function formatCountdown(ms) {
//                 const seconds = Math.floor((ms / 1000) % 60);
//                 const minutes = Math.floor((ms / 1000 / 60) % 60);
//                 const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
//                 const days = Math.floor(ms / (1000 * 60 * 60 * 24));
//                 return { days, hours, minutes, seconds };
//             }

//             // Update countdown displays
//             if (countdownAnniversary > 0) {
//                 const formattedAnniversary = formatCountdown(countdownAnniversary);
//                 document.getElementById("countdown-anniversary").innerHTML = 
//                     `Countdown to Anniversary: ${formattedAnniversary.days} days, ` +
//                     `${formattedAnniversary.hours} hours, ` +
//                     `${formattedAnniversary.minutes} minutes, ` +
//                     `${formattedAnniversary.seconds} seconds`;
//             } else {
//                 document.getElementById("countdown-anniversary").innerHTML = "The anniversary has arrived!";
//             }

//             if (countdownProposed > 0) {
//                 const formattedProposed = formatCountdown(countdownProposed);
//                 document.getElementById("countdown-proposed-anniversary").innerHTML = 
//                     `Countdown to Proposed Anniversary: ${formattedProposed.days} days, ` +
//                     `${formattedProposed.hours} hours, ` +
//                     `${formattedProposed.minutes} minutes, ` +
//                     `${formattedProposed.seconds} seconds`;
//             } else {
//                 document.getElementById("countdown-proposed-anniversary").innerHTML = "The proposed anniversary has arrived!";
//             }
//         }

//         // Initialize countdown and set interval for updates
//         updateCountdown();
//         setInterval(updateCountdown, 1000);

//         // Show result section
//         document.getElementById("result").style.display = "block";
//     })
//     .catch(function (error) {
//         console.error("Error:", error);
//         document.getElementById("error-message").innerHTML = "An error occurred. Please check your inputs and try again.";
//     });
// });
document.getElementById("anniversary-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear previous results
    document.getElementById("error-message").innerHTML = "";
    document.getElementById("result").style.display = "none";

    // Get user input values
    const userAnniversary = document.getElementById("user-anniversary").value;
    const userProposedAnniversary = document.getElementById("user-proposed-anniversary").value;

    try {
        // Validate input dates
        const anniversaryDate = new Date(userAnniversary);
        const proposedDate = new Date(userProposedAnniversary);

        if (isNaN(anniversaryDate) || isNaN(proposedDate)) {
            throw new Error("Invalid date format. Please use MM-DD-YYYY.");
        }

        // Calculate the next anniversaries
        const now = new Date();

        function getNextAnniversary(date) {
            const nextAnniversary = new Date(date);
            nextAnniversary.setFullYear(now.getFullYear());
            if (nextAnniversary < now) {
                nextAnniversary.setFullYear(now.getFullYear() + 1);
            }
            return nextAnniversary;
        }

        const nextAnniversaryDate = getNextAnniversary(anniversaryDate);
        const nextProposedAnniversaryDate = getNextAnniversary(proposedDate);

        // Start countdown updates
        function updateCountdown() {
            const currentTime = new Date();

            function formatCountdown(ms) {
                const seconds = Math.floor((ms / 1000) % 60);
                const minutes = Math.floor((ms / 1000 / 60) % 60);
                const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
                const days = Math.floor(ms / (1000 * 60 * 60 * 24));
                return { days, hours, minutes, seconds };
            }

            const countdownAnniversary = nextAnniversaryDate - currentTime;
            const countdownProposed = nextProposedAnniversaryDate - currentTime;

            if (countdownAnniversary > 0) {
                const formatted = formatCountdown(countdownAnniversary);
                document.getElementById("countdown-anniversary").innerHTML =
                    `Countdown to Anniversary: ${formatted.days} days, ` +
                    `${formatted.hours} hours, ` +
                    `${formatted.minutes} minutes, ` +
                    `${formatted.seconds} seconds`;
            } else {
                document.getElementById("countdown-anniversary").innerHTML = "The anniversary has arrived!";
            }

            if (countdownProposed > 0) {
                const formatted = formatCountdown(countdownProposed);
                document.getElementById("countdown-proposed-anniversary").innerHTML =
                    `Countdown to Proposed Anniversary: ${formatted.days} days, ` +
                    `${formatted.hours} hours, ` +
                    `${formatted.minutes} minutes, ` +
                    `${formatted.seconds} seconds`;
            } else {
                document.getElementById("countdown-proposed-anniversary").innerHTML = "The proposed anniversary has arrived!";
            }
        }

        // Initialize countdown and set interval
        updateCountdown();
        setInterval(updateCountdown, 1000);

        // Show result section
        document.getElementById("result").style.display = "block";
    } catch (error) {
        document.getElementById("error-message").innerHTML = error.message;
    }
});
