export const formatDate = (date) => {
  return new Intl.DateTimeFormat("th-TH", {
    day  : "2-digit",
    month: "2-digit",
    year : "numeric",
  }).format(new Date(date))
}