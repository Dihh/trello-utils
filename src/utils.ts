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

export const weekDay: any = {
  0: "Domingo",
  1: "Segunda",
  2: "Terça",
  3: "Quarta",
  4: "Quinta",
  5: "Sexta",
  6: "Sábado"
}

export const labelColors: any = {
  "Segunda": "rgba(255, 99, 132, 0.2)",
  "Terça": "rgba(153, 102, 255, 0.2)",
  "Quarta": "rgba(54, 162, 235, 0.2)",
  "Quinta": "rgba(255, 206, 86, 0.2)",
  "Sexta": "rgba(0, 255, 221, 0.2)",
  "Sábado": "rgba(229, 0, 255, 0.2)",
  "Domingo": "rgba(50, 255, 0, 0.2)",
  "Done": "rgba(75, 192, 192, 1)",
  "Adiar": "rgba(255, 140, 0, 0.7)",
  "Fail": "rgba(255, 0, 0, 0.5)"
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
        method: "POST", body: body, headers,
      }
    );
  }
}

export const publicPath = "/trello-utils";