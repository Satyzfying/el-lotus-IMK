export const rupiah = (value) => `Rp ${Number(value || 0).toLocaleString("id-ID")}`;

export const formatCountdown = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = seconds % 60;

  return [hours, minutes, rest].map((unit) => String(unit).padStart(2, "0")).join(":");
};

export const extraFor = (list, label) => list.find((item) => item.label === label)?.extra || 0;

export const shortOutlet = (outlet) => outlet.replace("el Lotus ", "");

export const formatOrderDate = (date) => ({
  date: date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
  time: date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
});
