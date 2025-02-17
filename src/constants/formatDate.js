export const formatDate = (dateString) => {
  if (!dateString) return "Chưa có ngày sinh";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};
