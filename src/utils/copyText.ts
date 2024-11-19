export function copyText(text: string, changeNotification: (value: boolean) => void) {
  navigator.clipboard.writeText(text)
    .then(function() {
      changeNotification(true);
    })
    .catch(function(err) {
      alert('Не вдалося скопіювати: ' + err);
    });
}