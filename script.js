// Terminal Simulator Commands
const commands = {
    hello: "Hello! Welcome to Linux Hub. Type 'help' for available commands.",
    help: "Available commands: hello, date, whoami, joke, clear, ls, echo [message]",
    date: new Date().toString(),
    whoami: "dev hervey james - Linux Hub Developer",
    joke: "Why did the developer go broke? Because he lost his domain in a poker game!",
    ls: "index.html    style.css    script.js    README.md",
    clear: "CLEAR",
    echo: function(args) {
        return args.join(" ") || "echo: missing arguments";
    }
};

// Handle Terminal Commands
function handleCommand(event) {
    if (event.key === "Enter") {
        const input = document.getElementById("command-input");
        const command = input.value.trim().toLowerCase();
        
        if (command) {
            // Display command
            addTerminalOutput("$ " + command);
            
            // Process command
            let output;
            const parts = command.split(" ");
            const cmd = parts[0];
            const args = parts.slice(1);
            
            if (cmd === "echo") {
                output = commands.echo(args);
            } else if (commands[cmd] === "CLEAR") {
                document.getElementById("terminal-output").innerHTML = "";
            } else if (commands[cmd]) {
                output = commands[cmd];
            } else {
                output = `Command not found: ${cmd}. Type 'help' for available commands.`;
            }
            
            if (output) {
                addTerminalOutput(output);
            }
            
            input.value = "";
            input.focus();
        }
    }
}

function addTerminalOutput(text) {
    const output = document.getElementById("terminal-output");
    const p = document.createElement("p");
    p.textContent = text;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
}

// Smooth Scroll Function
function scrollTo(sectionId) {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: "smooth" });
}

// Contact Function
function contactUs() {
    alert("Thank you for your interest! Email: dev.hervey.james@linux.com");
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll(".distro-card, .command-card, .about-content").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
});

// Focus input on page load
window.addEventListener('load', function() {
    const input = document.getElementById("command-input");
    if (input) {
        input.focus();
    }
});

// Add some fun Easter eggs
document.addEventListener('keydown', function(e) {
    // Ctrl+L clears terminal
    if (e.ctrlKey && e.code === 'KeyL') {
        e.preventDefault();
        document.getElementById("terminal-output").innerHTML = "";
    }
});
