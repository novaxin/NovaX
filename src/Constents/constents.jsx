export const Base_url = 'http://127.0.0.1:8000/api';
export const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); // Format the date and time according to the user's locale
}
export function RelaodPage(){
    window.location.reload();
  }