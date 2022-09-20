export function uuid() {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

export async function createCards(
  selectedsLists: any,
  cardName: string,
  selectedsLabels: any,
  apiKey: string,
  token: string
) {
  for (const index in selectedsLists) {
    const list = selectedsLists[index];
    let newcardName = cardName.replace("{name}", list.name);
    newcardName = newcardName.replace("{NAME}", list.name.toUpperCase());
    const body = new URLSearchParams({
      name: newcardName,
      idLabels: selectedsLabels.map((label: any) => label.id),
    } as any);
    const headers = {};
    await fetch(
      `https://api.trello.com/1/cards?idList=${list.id}&key=${apiKey}&token=${token}`,
      {
        method: "POST",
        body: body,
        headers,
      }
    );
  }
}
