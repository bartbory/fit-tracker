export default function palLevel(pal: number) {
  switch (pal) {
    case 1:
      return "Sedentary (you do not show any physical activity)";
    case 2:
      return "Very little activity (office job, no training, some walking)";
    case 3:
      return "Low activity (no training, work may require light physical effort)";
    case 4:
      return "Moderate activity (work does not require much physical effort, but we conduct regular training)";
    case 5:
      return "High activity (daily training, physical work or active lifestyle)";
    case 6:
      return "Very high activity (training twice a day, very hard physical work)";
    default:
      return "Sedentary (you do not show any physical activity)";
      break;
  }
}
