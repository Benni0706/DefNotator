import random from "random";

function username2initials(username: string) {
    // "Random User" => "RU"
    return Array.from(username.matchAll(/\b\w/g)).join("").toUpperCase();
}

export function generateAvatar(username: string) {
    // random number generator seeded with the username for same results
    // not seeded with initials to have different avatar for same initials but different username
    const rand = random.clone(username);
    const initials = username2initials(username);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;

    canvas.width = 200;
    canvas.height = 200;

    // Draw background
    context.fillStyle = `#${rand.int(0, 0xFFFFFF).toString(16).padStart(6, '0')}`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    context.font = "bold 100px Assistant";
    context.fillStyle = `#${rand.int(0, 0xFFFFFF).toString(16).padStart(6, '0')}`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(initials, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL("image/png");
}
