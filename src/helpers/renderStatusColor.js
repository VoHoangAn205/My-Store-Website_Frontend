const renderStatusColor = (status) => {
  switch (status) {
    case "Available":
      return "bg-emerald-50 text-emerald-700";
      break;
    case "Sold out":
      return "bg-rose-50 text-rose-700";
    default:
      return "bg-gray-200 text-gray-700";
      break;
  }
};

export default renderStatusColor;
