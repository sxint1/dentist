// Заповніть фактичними даними клініки перед відкриттям запису.
const clinic = {
  address: "",
  hours: "",
  phone: "", // Міжнародний формат, наприклад +380…
  messageUrl: "", // Повне посилання на чат у месенджері
};

const menu = document.querySelector(".menu");
const nav = document.querySelector("#nav");
const mobile = matchMedia("(max-width: 51.999rem)");

function setMenu(open) {
  menu.hidden = !mobile.matches;
  menu.setAttribute("aria-expanded", String(open));
  nav.hidden = mobile.matches && !open;
}

setMenu(false);
mobile.addEventListener("change", () => setMenu(false));
menu.addEventListener("click", () => setMenu(nav.hidden));
nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menu.focus();
  }
});

const contactInfo = document.querySelector("#contact-info");
const status = document.querySelector("#contact-status");
const details = [clinic.address, clinic.hours, clinic.phone].filter(Boolean);
if (details.length) contactInfo.textContent = details.join(" · ");
if (clinic.messageUrl && !details.length) contactInfo.hidden = true;

const channels = {
  message: {
    target: clinic.messageUrl,
    unavailable: "Посилання на чат з’явиться після відкриття запису.",
  },
  phone: {
    target: clinic.phone ? `tel:${clinic.phone.replace(/[^+\d]/g, "")}` : "",
    unavailable: "Номер телефону з’явиться після відкриття запису.",
  },
};

for (const link of document.querySelectorAll("[data-channel]")) {
  const channel = channels[link.dataset.channel];
  if (channel.target) {
    link.href = channel.target;
  } else {
    link.addEventListener("click", () => {
      status.textContent = channel.unavailable;
    });
  }
}
